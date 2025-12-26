import { motion } from "framer-motion";
import { MapPin, DollarSign, GraduationCap, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { University } from "@/types/university";

interface UniversityCardProps {
  university: University & { isEligible?: boolean };
  isSelected: boolean;
  onToggleCompare: (id: string) => void;
  onApply: (university: University) => void;
  index: number;
}

export function UniversityCard({
  university,
  isSelected,
  onToggleCompare,
  onApply,
  index,
}: UniversityCardProps) {
  const isEligible = university.isEligible !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group relative bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-elevated ${
        isSelected ? "ring-2 ring-accent" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={university.image_url}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Ranking Badge */}
        {university.ranking && university.ranking <= 50 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-accent text-accent-foreground font-semibold">
              <Trophy className="w-3 h-3 mr-1" />
              #{university.ranking} World
            </Badge>
          </div>
        )}

        {/* Compare Checkbox */}
        <div className="absolute top-3 right-3">
          <label className="flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 cursor-pointer transition-all hover:bg-card">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleCompare(university.id)}
              className="border-2"
            />
            <span className="text-xs font-medium">Compare</span>
          </label>
        </div>

        {/* Country & City */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-primary-foreground text-sm">
          <MapPin className="w-4 h-4" />
          {university.city}, {university.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Eligibility */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold text-foreground leading-tight">
            {university.name}
          </h3>
          {!isEligible && (
            <Badge variant="destructive" className="shrink-0 text-xs">
              <XCircle className="w-3 h-3 mr-1" />
              Not Eligible
            </Badge>
          )}
          {isEligible && university.isEligible !== undefined && (
            <Badge className="shrink-0 text-xs bg-success text-success-foreground">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Eligible
            </Badge>
          )}
        </div>

        {/* Degree Level */}
        <p className="text-sm text-muted-foreground mb-4">
          {university.degree_level} Program
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <DollarSign className="w-4 h-4 mx-auto text-accent mb-1" />
            <div className="text-sm font-bold text-foreground">
              ${(university.tuition_fee / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-muted-foreground">Tuition</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <GraduationCap className="w-4 h-4 mx-auto text-accent mb-1" />
            <div className="text-sm font-bold text-foreground">
              {university.min_gpa}+
            </div>
            <div className="text-xs text-muted-foreground">GPA</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <span className="text-xs font-bold text-accent">IELTS</span>
            <div className="text-sm font-bold text-foreground">
              {university.min_ielts}+
            </div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
        </div>

        {/* Description */}
        {university.description && (
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
            {university.description}
          </p>
        )}

        {/* Apply Button */}
        <Button
          variant={isEligible ? "hero" : "secondary"}
          className="w-full"
          onClick={() => onApply(university)}
          disabled={!isEligible}
        >
          {isEligible ? "Apply Now" : "Requirements Not Met"}
        </Button>
      </div>
    </motion.div>
  );
}
