import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FilterSection } from "@/components/FilterSection";
import { UniversityCard } from "@/components/UniversityCard";
import { CompareBar } from "@/components/CompareBar";
import { ComparisonModal } from "@/components/ComparisonModal";
import { ApplicationModal } from "@/components/ApplicationModal";
import { Footer } from "@/components/Footer";
import { useUniversities } from "@/hooks/useUniversities";
import { University, FilterParams } from "@/types/university";
import { Helmet } from "react-helmet";

const Index = () => {
  // Filter state
  const [filters, setFilters] = useState<FilterParams>({
    country: "all",
    degree_level: "all",
    min_tuition: 5000,
    max_tuition: 60000,
  });

  // Comparison state
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Application state
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Fetch universities
  const { universities, loading } = useUniversities(filters);

  // Get selected university objects
  const selectedUniversities = universities.filter((u) =>
    selectedForCompare.includes(u.id)
  );

  // Handlers
  const handleSearch = (country: string, degreeLevel: string) => {
    setFilters((prev) => ({
      ...prev,
      country,
      degree_level: degreeLevel,
    }));
  };

  const handleToggleCompare = useCallback((id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((uniId) => uniId !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const handleApply = (university: University) => {
    setSelectedUniversity(university);
    setIsApplicationModalOpen(true);
  };

  const handleClearCompare = () => {
    setSelectedForCompare([]);
  };

  return (
    <>
      <Helmet>
        <title>UniMatch - Find Your Dream University | Compare & Apply</title>
        <meta
          name="description"
          content="Discover 500+ universities worldwide. Compare programs, check eligibility, and apply to your dream university based on your GPA, IELTS score, and budget."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />

        {/* Universities Section */}
        <section id="universities" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore Top Universities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Filter by country, tuition, and check your eligibility in real-time
              </p>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="lg:col-span-1">
                <FilterSection
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </div>

              {/* University Grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                  </div>
                ) : universities.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-lg text-muted-foreground">
                      No universities found matching your criteria.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try adjusting your filters.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {universities.map((university, index) => (
                      <UniversityCard
                        key={university.id}
                        university={university}
                        isSelected={selectedForCompare.includes(university.id)}
                        onToggleCompare={handleToggleCompare}
                        onApply={handleApply}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* Compare Bar */}
        <CompareBar
          selectedUniversities={selectedUniversities}
          onRemove={handleToggleCompare}
          onCompare={() => setIsCompareModalOpen(true)}
          onClear={handleClearCompare}
        />

        {/* Comparison Modal */}
        <ComparisonModal
          universities={selectedUniversities}
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          onApply={handleApply}
        />

        {/* Application Modal */}
        <ApplicationModal
          university={selectedUniversity}
          isOpen={isApplicationModalOpen}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setSelectedUniversity(null);
          }}
        />
      </div>
    </>
  );
};

export default Index;
