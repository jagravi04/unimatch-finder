import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, GraduationCap, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { University, Application } from "@/types/university";
import { toast } from "sonner";

interface ApplicationModalProps {
  university: University | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "personal" | "academic";

export function ApplicationModal({
  university,
  isOpen,
  onClose,
}: ApplicationModalProps) {
  const [step, setStep] = useState<Step>("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Application>>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    nationality: "",
    gpa: undefined,
    ielts_score: undefined,
    degree_type: "",
    field_of_study: "",
    statement_of_purpose: "",
  });

  if (!isOpen || !university) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gpa" || name === "ielts_score" ? parseFloat(value) || undefined : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (currentStep: Step): boolean => {
    if (currentStep === "personal") {
      if (!formData.first_name || !formData.last_name || !formData.email) {
        toast.error("Please fill in all required fields");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    }

    if (currentStep === "academic") {
      if (!formData.gpa || !formData.ielts_score || !formData.field_of_study) {
        toast.error("Please fill in all required fields");
        return false;
      }

      // Validate eligibility
      if (formData.gpa < university.min_gpa) {
        toast.error(
          `Your GPA (${formData.gpa}) is below the minimum requirement (${university.min_gpa})`
        );
        return false;
      }

      if (formData.ielts_score < university.min_ielts) {
        toast.error(
          `Your IELTS score (${formData.ielts_score}) is below the minimum requirement (${university.min_ielts})`
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep("personal")) {
      setStep("academic");
    }
  };

  const handleBack = () => {
    setStep("personal");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep("academic")) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-success" />
        <div>
          <div className="font-semibold">Application Submitted!</div>
          <div className="text-sm text-muted-foreground">
            We'll review your application for {university.name}
          </div>
        </div>
      </div>
    );

    setIsSubmitting(false);
    setStep("personal");
    setFormData({});
    onClose();
  };

  const steps = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "academic", label: "Academic Info", icon: GraduationCap },
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
          className="bg-card rounded-2xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <img
                src={university.image_url}
                alt={university.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Apply to {university.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {university.degree_level} · {university.city}, {university.country}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="px-6 py-4 bg-muted/30">
            <div className="flex items-center justify-center gap-4">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      step === s.id
                        ? "bg-accent text-accent-foreground"
                        : s.id === "personal" || step === "academic"
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {(s.id === "personal" && step === "academic") ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <s.icon className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[50vh]">
            <AnimatePresence mode="wait">
              {step === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="e.g., United States"
                    />
                  </div>
                </motion.div>
              )}

              {step === "academic" && (
                <motion.div
                  key="academic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Requirements Alert */}
                  <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Minimum Requirements</p>
                      <p className="text-muted-foreground">
                        GPA: {university.min_gpa}+ · IELTS: {university.min_ielts}+
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gpa">Your GPA (out of 4.0) *</Label>
                      <Input
                        id="gpa"
                        name="gpa"
                        type="number"
                        step="0.1"
                        min="0"
                        max="4"
                        value={formData.gpa ?? ""}
                        onChange={handleInputChange}
                        placeholder="e.g., 3.5"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ielts_score">IELTS Score (out of 9.0) *</Label>
                      <Input
                        id="ielts_score"
                        name="ielts_score"
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        value={formData.ielts_score ?? ""}
                        onChange={handleInputChange}
                        placeholder="e.g., 7.0"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree_type">Degree Type</Label>
                    <Select
                      value={formData.degree_type}
                      onValueChange={(value) => handleSelectChange("degree_type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="field_of_study">Field of Study *</Label>
                    <Input
                      id="field_of_study"
                      name="field_of_study"
                      value={formData.field_of_study}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statement_of_purpose">Statement of Purpose</Label>
                    <Textarea
                      id="statement_of_purpose"
                      name="statement_of_purpose"
                      value={formData.statement_of_purpose}
                      onChange={handleInputChange}
                      placeholder="Tell us about your goals and why you want to study at this university..."
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-border flex items-center justify-between">
            {step === "academic" ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step === "personal" ? (
              <Button variant="hero" onClick={handleNext}>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
