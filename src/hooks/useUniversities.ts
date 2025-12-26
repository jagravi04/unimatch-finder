import { useState, useEffect, useMemo } from "react";
import { University, FilterParams } from "@/types/university";
import { mockUniversities } from "@/data/universities";

export function useUniversities(filters: FilterParams) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a small delay
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockUniversities];

      // Filter by country
      if (filters.country && filters.country !== "all") {
        filtered = filtered.filter((u) => u.country === filters.country);
      }

      // Filter by degree level
      if (filters.degree_level && filters.degree_level !== "all") {
        filtered = filtered.filter((u) => u.degree_level === filters.degree_level);
      }

      // Filter by tuition range
      if (filters.min_tuition !== undefined) {
        filtered = filtered.filter((u) => u.tuition_fee >= filters.min_tuition!);
      }
      if (filters.max_tuition !== undefined) {
        filtered = filtered.filter((u) => u.tuition_fee <= filters.max_tuition!);
      }

      setUniversities(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // Check eligibility for each university
  const universitiesWithEligibility = useMemo(() => {
    return universities.map((uni) => ({
      ...uni,
      isEligible:
        (filters.user_gpa === undefined || filters.user_gpa >= uni.min_gpa) &&
        (filters.user_ielts === undefined || filters.user_ielts >= uni.min_ielts),
    }));
  }, [universities, filters.user_gpa, filters.user_ielts]);

  return { universities: universitiesWithEligibility, loading };
}
