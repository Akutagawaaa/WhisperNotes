
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        clipPath: "circle(0% at 50% 50%)" 
      }}
      animate={{ 
        opacity: 1, 
        clipPath: "circle(150% at 50% 50%)" 
      }}
      exit={{ 
        opacity: 0, 
        clipPath: "circle(0% at 50% 50%)" 
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};
