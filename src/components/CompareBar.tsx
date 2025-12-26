import { motion, AnimatePresence } from "framer-motion";
import { X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

interface University {
  id: string;
  name: string;
  image_url: string | null;
}

interface CompareBarProps {
  selectedUniversities: University[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

export function CompareBar({
  selectedUniversities,
  onRemove,
  onCompare,
  onClear,
}: CompareBarProps) {
  if (selectedUniversities.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-elevated border border-border p-4 flex items-center gap-4">
          {/* Selected Universities */}
          <div className="flex items-center gap-2">
            {selectedUniversities.map((uni) => (
              <motion.div
                key={uni.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative group"
              >
                <img
                  src={uni.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'}
                  alt={uni.name}
                  className="w-12 h-12 rounded-lg object-cover ring-2 ring-accent"
                />
                <button
                  onClick={() => onRemove(uni.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: 3 - selectedUniversities.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-12 h-12 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-xs"
              >
                +
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-border" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedUniversities.length}/3 selected
            </span>
            <Button
              variant="hero"
              size="sm"
              onClick={onCompare}
              disabled={selectedUniversities.length < 2}
            >
              <Scale className="w-4 h-4 mr-2" />
              Compare Now
            </Button>
            <Button variant="ghost" size="sm" onClick={onClear}>
              Clear
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
