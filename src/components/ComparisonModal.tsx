import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, GraduationCap, Trophy, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { University } from "@/types/university";

interface ComparisonModalProps {
  universities: University[];
  isOpen: boolean;
  onClose: () => void;
  onApply: (university: University) => void;
}

export function ComparisonModal({
  universities,
  isOpen,
  onClose,
  onApply,
}: ComparisonModalProps) {
  if (!isOpen || universities.length === 0) return null;

  const comparisonRows = [
    {
      label: "Location",
      icon: MapPin,
      getValue: (u: University) => `${u.city}, ${u.country}`,
    },
    {
      label: "Degree Level",
      icon: GraduationCap,
      getValue: (u: University) => u.degree_level,
    },
    {
      label: "World Ranking",
      icon: Trophy,
      getValue: (u: University) => (u.ranking ? `#${u.ranking}` : "N/A"),
    },
    {
      label: "Tuition Fee (Annual)",
      icon: DollarSign,
      getValue: (u: University) => `$${u.tuition_fee.toLocaleString()}`,
      highlight: true,
    },
    {
      label: "Min GPA Required",
      icon: GraduationCap,
      getValue: (u: University) => `${u.min_gpa} / 4.0`,
      highlight: true,
    },
    {
      label: "Min IELTS Required",
      icon: CheckCircle2,
      getValue: (u: University) => `${u.min_ielts} / 9.0`,
      highlight: true,
    },
    {
      label: "Acceptance Rate",
      icon: CheckCircle2,
      getValue: (u: University) => (u.acceptance_rate ? `${u.acceptance_rate}%` : "N/A"),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-card rounded-2xl shadow-elevated max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Compare Universities
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Side-by-side comparison of {universities.length} universities
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* University Headers */}
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left w-48">
                    <span className="text-sm font-medium text-muted-foreground">
                      Criteria
                    </span>
                  </th>
                  {universities.map((uni) => (
                    <th key={uni.id} className="p-4 text-center min-w-[200px]">
                      <div className="space-y-2">
                        <img
                          src={uni.image_url}
                          alt={uni.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <h3 className="font-bold text-foreground text-sm">
                          {uni.name}
                        </h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Comparison Rows */}
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={`border-b border-border ${
                      row.highlight ? "bg-muted/30" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <row.icon className="w-4 h-4 text-accent" />
                        {row.label}
                      </div>
                    </td>
                    {universities.map((uni) => (
                      <td
                        key={uni.id}
                        className="p-4 text-center text-sm font-semibold text-foreground"
                      >
                        {row.getValue(uni)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Apply Row */}
                <tr>
                  <td className="p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Action
                    </span>
                  </td>
                  {universities.map((uni) => (
                    <td key={uni.id} className="p-4 text-center">
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => {
                          onApply(uni);
                          onClose();
                        }}
                      >
                        Apply Now
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
