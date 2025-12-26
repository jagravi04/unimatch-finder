import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FilterParams } from "@/types/university";

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  degree_level: string;
  tuition_fee: number;
  min_gpa: number;
  min_ielts: number;
  image_url: string | null;
  ranking: number | null;
  acceptance_rate: number | null;
  description: string | null;
}

export function useUniversities(filters: FilterParams) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUniversities() {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('universities')
          .select('*')
          .order('ranking', { ascending: true, nullsFirst: false });

        // Filter by country
        if (filters.country && filters.country !== "all") {
          query = query.eq('country', filters.country);
        }

        // Filter by degree level
        if (filters.degree_level && filters.degree_level !== "all") {
          query = query.eq('degree_level', filters.degree_level);
        }

        // Filter by tuition range
        if (filters.min_tuition !== undefined) {
          query = query.gte('tuition_fee', filters.min_tuition);
        }
        if (filters.max_tuition !== undefined) {
          query = query.lte('tuition_fee', filters.max_tuition);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          console.error('Error fetching universities:', fetchError);
          setError('Failed to fetch universities');
          setUniversities([]);
        } else {
          setUniversities(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
        setUniversities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUniversities();
  }, [filters.country, filters.degree_level, filters.min_tuition, filters.max_tuition]);

  // Check eligibility for each university
  const universitiesWithEligibility = useMemo(() => {
    return universities.map((uni) => ({
      ...uni,
      isEligible:
        (filters.user_gpa === undefined || filters.user_gpa >= uni.min_gpa) &&
        (filters.user_ielts === undefined || filters.user_ielts >= uni.min_ielts),
    }));
  }, [universities, filters.user_gpa, filters.user_ielts]);

  return { universities: universitiesWithEligibility, loading, error };
}
