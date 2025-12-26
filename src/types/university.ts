export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  degree_level: string;
  tuition_fee: number;
  min_gpa: number;
  min_ielts: number;
  image_url: string;
  ranking?: number;
  acceptance_rate?: number;
  description?: string;
}

export interface Application {
  id?: string;
  university_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  gpa: number;
  ielts_score: number;
  degree_type: string;
  field_of_study: string;
  statement_of_purpose?: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface FilterParams {
  country?: string;
  degree_level?: string;
  min_tuition?: number;
  max_tuition?: number;
  user_gpa?: number;
  user_ielts?: number;
}
