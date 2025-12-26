import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ApplicationData {
  university_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  nationality?: string;
  gpa: number;
  ielts_score: number;
  degree_type?: string;
  field_of_study: string;
  statement_of_purpose?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const applicationData: ApplicationData = await req.json();
    
    console.log('Received application data:', JSON.stringify(applicationData, null, 2));

    // Validate required fields
    if (!applicationData.university_id || !applicationData.first_name || !applicationData.last_name || 
        !applicationData.email || !applicationData.field_of_study || 
        applicationData.gpa === undefined || applicationData.ielts_score === undefined) {
      console.log('Validation failed: Missing required fields');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields',
          details: 'Please fill in all required fields: name, email, GPA, IELTS score, and field of study.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      console.log('Validation failed: Invalid email format');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email format',
          details: 'Please provide a valid email address.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch university requirements
    const { data: university, error: uniError } = await supabase
      .from('universities')
      .select('name, min_gpa, min_ielts')
      .eq('id', applicationData.university_id)
      .maybeSingle();

    if (uniError) {
      console.error('Error fetching university:', uniError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Database error',
          details: 'Failed to fetch university requirements. Please try again.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!university) {
      console.log('Validation failed: University not found');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'University not found',
          details: 'The selected university does not exist in our database.'
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('University requirements:', university);

    // Validate GPA requirement
    if (applicationData.gpa < university.min_gpa) {
      console.log(`Validation failed: GPA ${applicationData.gpa} is below minimum ${university.min_gpa}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'GPA requirement not met',
          details: `Your GPA (${applicationData.gpa}) is below ${university.name}'s minimum requirement of ${university.min_gpa}. Please consider applying to universities with lower GPA requirements.`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate IELTS requirement
    if (applicationData.ielts_score < university.min_ielts) {
      console.log(`Validation failed: IELTS ${applicationData.ielts_score} is below minimum ${university.min_ielts}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'IELTS requirement not met',
          details: `Your IELTS score (${applicationData.ielts_score}) is below ${university.name}'s minimum requirement of ${university.min_ielts}. Please consider improving your IELTS score before applying.`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // All validations passed - insert the application
    const { data: application, error: insertError } = await supabase
      .from('applications')
      .insert({
        university_id: applicationData.university_id,
        first_name: applicationData.first_name,
        last_name: applicationData.last_name,
        email: applicationData.email,
        phone: applicationData.phone || null,
        date_of_birth: applicationData.date_of_birth || null,
        nationality: applicationData.nationality || null,
        gpa: applicationData.gpa,
        ielts_score: applicationData.ielts_score,
        degree_type: applicationData.degree_type || null,
        field_of_study: applicationData.field_of_study,
        statement_of_purpose: applicationData.statement_of_purpose || null,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting application:', insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to submit application',
          details: 'An error occurred while saving your application. Please try again.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Application submitted successfully:', application);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Application to ${university.name} submitted successfully!`,
        application_id: application.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in submit-application:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: 'An unexpected error occurred. Please try again later.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
