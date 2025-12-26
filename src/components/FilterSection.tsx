import { motion } from "framer-motion";
import { DollarSign, GraduationCap, BookOpen } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, degreeLevels } from "@/data/universities";
import { FilterParams } from "@/types/university";

interface FilterSectionProps {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
}

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  const handleTuitionChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      min_tuition: value[0] * 1000,
      max_tuition: value[1] * 1000,
    });
  };

  const handleGpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onFilterChange({
      ...filters,
      user_gpa: isNaN(value) ? undefined : value,
    });
  };

  const handleIeltsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onFilterChange({
      ...filters,
      user_ielts: isNaN(value) ? undefined : value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl shadow-card p-6 md:p-8 sticky top-4"
    >
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-accent" />
        Filter Universities
      </h3>

      <div className="space-y-8">
        {/* Country Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">Country</Label>
          <Select
            value={filters.country || "all"}
            onValueChange={(value) =>
              onFilterChange({ ...filters, country: value })
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Degree Level Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">
            Degree Level
          </Label>
          <Select
            value={filters.degree_level || "all"}
            onValueChange={(value) =>
              onFilterChange({ ...filters, degree_level: value })
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {degreeLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tuition Range Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Tuition Fee Range
            </Label>
            <span className="text-sm font-semibold text-foreground">
              ${((filters.min_tuition || 5000) / 1000).toFixed(0)}k - $
              {((filters.max_tuition || 60000) / 1000).toFixed(0)}k
            </span>
          </div>
          <Slider
            value={[
              (filters.min_tuition || 5000) / 1000,
              (filters.max_tuition || 60000) / 1000,
            ]}
            onValueChange={handleTuitionChange}
            min={5}
            max={60}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$5,000</span>
            <span>$60,000</span>
          </div>
        </div>

        {/* Eligibility Check Section */}
        <div className="pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-accent" />
            Check Your Eligibility
          </h4>

          <div className="space-y-4">
            {/* GPA Input */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Your GPA (out of 4.0)
              </Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="4"
                placeholder="e.g., 3.5"
                value={filters.user_gpa ?? ""}
                onChange={handleGpaChange}
                className="h-12"
              />
            </div>

            {/* IELTS Input */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Your IELTS Score (out of 9.0)
              </Label>
              <Input
                type="number"
                step="0.5"
                min="0"
                max="9"
                placeholder="e.g., 7.0"
                value={filters.user_ielts ?? ""}
                onChange={handleIeltsChange}
                className="h-12"
              />
            </div>
          </div>

          {(filters.user_gpa !== undefined || filters.user_ielts !== undefined) && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-muted-foreground mt-4 bg-muted/50 p-3 rounded-lg"
            >
              Universities you're not eligible for will be marked with a "Not Eligible" badge.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
