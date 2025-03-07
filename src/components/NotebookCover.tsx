
import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Edit, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotebookCoverProps {
  id: string;
  title: string;
  description?: string;
  cover: string;
  count?: number;
  onClick?: () => void;
  onEdit?: () => void;
  selected?: boolean;
}

// Predefined cover styles inspired by Ghibli films
export const NOTEBOOK_COVERS = [
  {
    id: "spirited-bath",
    name: "Spirited Bathhouse", 
    background: "bg-gradient-to-br from-red-700 to-amber-700",
    pattern: "radial"
  },
  {
    id: "totoro-forest",
    name: "Totoro's Forest", 
    background: "bg-gradient-to-br from-green-700 to-emerald-500",
    pattern: "leaves"
  },
  {
    id: "howl-sky",
    name: "Howl's Sky", 
    background: "bg-gradient-to-br from-blue-500 to-sky-300",
    pattern: "clouds"
  },
  {
    id: "kiki-delivery",
    name: "Kiki's Delivery", 
    background: "bg-gradient-to-br from-purple-600 to-pink-400",
    pattern: "stars"
  },
  {
    id: "castle-gold",
    name: "Castle in the Sky", 
    background: "bg-gradient-to-br from-yellow-500 to-amber-600",
    pattern: "gears"
  },
  {
    id: "mononoke-forest",
    name: "Mononoke Forest", 
    background: "bg-gradient-to-br from-teal-700 to-green-600",
    pattern: "spirits"
  },
  {
    id: "ponyo-ocean",
    name: "Ponyo's Ocean", 
    background: "bg-gradient-to-br from-blue-600 to-cyan-400",
    pattern: "waves"
  },
  {
    id: "arrietty-garden",
    name: "Arrietty's Garden", 
    background: "bg-gradient-to-br from-green-600 to-lime-400",
    pattern: "tiny"
  }
];

// Cover selection styles
const getCoverStyle = (cover: string) => {
  const coverInfo = NOTEBOOK_COVERS.find(c => c.id === cover) || NOTEBOOK_COVERS[0];
  
  return {
    className: coverInfo.background,
    pattern: coverInfo.pattern
  };
};

// Pattern overlays based on pattern type
const PatternOverlay = ({ type }: { type: string }) => {
  switch (type) {
    case "leaves":
      return (
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              className="absolute w-10 h-10 rounded-full border-2 border-white/50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      );
    case "clouds":
      return (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute bg-white/20 rounded-full"
              style={{
                width: 40 + i * 20,
                height: 20 + i * 10,
                bottom: `${20 + i * 30}%`,
                left: `-10%`
              }}
              animate={{ x: ["0%", "120%"] }}
              transition={{ 
                duration: 30 + i * 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 5
              }}
            />
          ))}
        </div>
      );
    case "waves":
      return (
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute left-0 right-0 h-1 bg-white/30"
              style={{
                bottom: `${15 + i * 20}%`
              }}
              animate={{ scaleX: [1, 1.05, 1, 0.95, 1] }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      );
    case "stars":
      return (
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ 
                duration: 1 + Math.random() * 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

const NotebookCover = ({
  id,
  title,
  description,
  cover,
  count = 0,
  onClick,
  onEdit,
  selected = false
}: NotebookCoverProps) => {
  const coverStyle = getCoverStyle(cover);
  
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 12px 20px -3px rgba(0, 0, 0, 0.15)" }}
      animate={selected ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        "notebook-cover rounded-lg overflow-hidden shadow-md cursor-pointer h-full",
        selected ? "ring-2 ring-ghibli-gold ring-offset-2" : ""
      )}
      onClick={onClick}
    >
      <div 
        className={`relative w-full aspect-[3/4] ${coverStyle.className} overflow-hidden`}
      >
        {/* Pattern overlay */}
        <PatternOverlay type={coverStyle.pattern} />
        
        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-black/20 backdrop-blur-sm" />
        
        {/* Title area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 w-4/5">
            <h3 className="font-heading font-bold text-white drop-shadow-md text-lg">
              {title}
            </h3>
            
            {description && (
              <p className="text-white/90 text-xs mt-1">{description}</p>
            )}
            
            <div className="mt-2 flex items-center justify-center text-white/90 text-xs">
              <Book className="w-3 h-3 mr-1" />
              <span>{count} notes</span>
            </div>
          </div>
        </div>
        
        {/* Edit button */}
        {onEdit && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="absolute top-2 right-2 w-7 h-7 bg-white/70 hover:bg-white/90 rounded-full flex items-center justify-center transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-ghibli-navy" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Special "New Notebook" component
export const NewNotebookCover = ({ onClick }: { onClick?: () => void }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="notebook-cover border-2 border-dashed border-ghibli-navy/30 rounded-lg h-full flex flex-col items-center justify-center cursor-pointer bg-white/50 hover:bg-white/80 transition-colors"
      onClick={onClick}
    >
      <div className="w-full aspect-[3/4] flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-full bg-ghibli-beige flex items-center justify-center mb-3">
          <Plus className="w-7 h-7 text-ghibli-navy/70" />
        </div>
        <h3 className="font-heading font-medium text-ghibli-navy/70 text-center">
          Create New Notebook
        </h3>
      </div>
    </motion.div>
  );
};

export default NotebookCover;
