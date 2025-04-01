
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: () => void;
  actionLabel?: string;
  actionText?: string; // Added this prop for backward compatibility
}

const EmptyState = ({
  title = "No notes yet",
  description = "Start writing your first magical note",
  action,
  actionLabel,
  actionText
}: EmptyStateProps) => {
  // Use actionText as fallback if actionLabel is not provided
  const buttonText = actionLabel || actionText || "Create Note";
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mb-8">
        <motion.div
          className="absolute inset-0 bg-ghibli-gold/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="relative w-28 h-28 bg-ghibli-beige rounded-full flex items-center justify-center border-4 border-ghibli-gold/30"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <PenLine className="h-12 w-12 text-ghibli-gold" />
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-heading font-bold text-ghibli-navy mb-2">{title}</h3>
      <p className="text-ghibli-navy/70 max-w-md mb-8">{description}</p>
      
      {action && (
        <Button 
          onClick={action}
          className="btn-ghibli flex items-center gap-2"
        >
          <PenLine className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
