import { motion } from "framer-motion";
import { Search, GraduationCap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, degreeLevels } from "@/data/universities";

interface HeroSectionProps {
  onSearch: (country: string, degreeLevel: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const country = formData.get("country") as string;
    const degreeLevel = formData.get("degreeLevel") as string;
    onSearch(country || "all", degreeLevel || "all");
    
    // Scroll to universities section
    document.getElementById("universities")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="container relative mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium backdrop-blur-sm border border-primary-foreground/20">
            <GraduationCap className="w-4 h-4" />
            Discover 500+ Universities Worldwide
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground text-center max-w-4xl leading-tight mb-6"
        >
          Your Dream University{" "}
          <span className="text-gradient">Awaits You</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-primary-foreground/70 text-center max-w-2xl mb-12"
        >
          Find the perfect university based on your scores, budget, and aspirations. 
          Compare programs and apply with confidence.
        </motion.p>

        {/* Quick Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSearch}
          className="w-full max-w-3xl"
        >
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-elevated p-3 flex flex-col md:flex-row gap-3">
            {/* Country Select */}
            <div className="flex-1">
              <Select name="country">
                <SelectTrigger className="h-14 border-0 bg-muted/50 text-base">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <SelectValue placeholder="Select Country" />
                  </div>
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

            {/* Degree Level Select */}
            <div className="flex-1">
              <Select name="degreeLevel">
                <SelectTrigger className="h-14 border-0 bg-muted/50 text-base">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <SelectValue placeholder="Degree Level" />
                  </div>
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

            {/* Search Button */}
            <Button type="submit" variant="hero" size="xl" className="md:w-auto w-full">
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: "500+", label: "Universities" },
            { value: "50+", label: "Countries" },
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="text-primary-foreground/60 text-sm mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1, duration: 0.5 },
            y: { delay: 1.5, duration: 2, repeat: Infinity }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-primary-foreground/50">
            <span className="text-sm">Explore Universities</span>
            <ArrowRight className="w-5 h-5 rotate-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
