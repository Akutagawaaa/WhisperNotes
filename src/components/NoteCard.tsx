
import { motion } from "framer-motion";
import { Clock, Tag } from "lucide-react";

export interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
  color?: string;
  onClick?: () => void;
}

const NoteCard = ({ title, content, date, tags = [], color = "bg-ghibli-cream", onClick }: NoteCardProps) => {
  // Truncate content to a reasonable preview length
  const truncatedContent = content.length > 120 
    ? content.substring(0, 120) + "..." 
    : content;

  // Animation for tags
  const tagAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        boxShadow: "0 12px 20px -3px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`note-card ${color} hover:scale-[1.01]`}
      onClick={onClick}
    >
      <h3 className="text-xl font-heading font-semibold mb-2 text-ghibli-navy">{title}</h3>
      <p className="text-ghibli-navy/80 mb-4 text-sm leading-relaxed">{truncatedContent}</p>
      
      <div className="flex flex-wrap items-center justify-between mt-2 pt-2 border-t border-ghibli-navy/10">
        <div className="flex items-center text-ghibli-navy/60 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 md:mt-0">
            {tags.map((tag, index) => (
              <motion.div 
                key={index} 
                className="flex items-center bg-ghibli-forest/10 px-2 py-0.5 rounded-full text-xs text-ghibli-forest"
                initial="initial"
                animate="animate"
                transition={{ 
                  delay: index * 0.05,
                  ...tagAnimation.transition 
                }}
                variants={tagAnimation}
              >
                <Tag className="h-2.5 w-2.5 mr-1" />
                {tag}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Magical hover effect - subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-ghibli-gold/20 rounded-full w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default NoteCard;
