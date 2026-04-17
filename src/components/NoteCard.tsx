import { motion } from "framer-motion";
import { Leaf, Tag } from "lucide-react";
import { useThemes } from "@/context/ThemesContext";

export interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
  color?: string;
  onClick?: () => void;
}

// Stable per-card tint variants so cards aren't all the same
const CARD_TINTS = [
  "linear-gradient(145deg, #FEF9EF 0%, #F7EFE2 60%, #F0E4CC 100%)",
  "linear-gradient(145deg, #F9F5EC 0%, #F2EAD8 60%, #EAE0CA 100%)",
  "linear-gradient(145deg, #FDFAF2 0%, #F9F0E2 60%, #F2E6D0 100%)",
];

const DARK_CARD_TINTS = [
  "linear-gradient(145deg, #1A2435 0%, #0F1E33 60%, #09182D 100%)",
  "linear-gradient(145deg, #232E42 0%, #1A2439 60%, #121A2E 100%)",
  "linear-gradient(145deg, #1E2D42 0%, #131C2E 60%, #0D1624 100%)",
];

const NoteCard = ({ id, title, content, date, tags = [], onClick }: NoteCardProps) => {
  const { isAmbientDark } = useThemes();
  const plainContent = content.replace(/<[^>]*>/g, " ");
  const truncated    = plainContent.length > 130 ? plainContent.slice(0, 130) + "…" : plainContent;
  
  const tints = isAmbientDark ? DARK_CARD_TINTS : CARD_TINTS;
  const tint  = tints[parseInt(id?.slice(-1) ?? "0", 16) % tints.length];

  return (
    <motion.div
      whileHover={{
        y: -7,
        rotate: 0.4,
        boxShadow: isAmbientDark 
          ? "0 16px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2), 3px 5px 0 rgba(0,0,0,0.15)"
          : "0 16px 32px rgba(180,140,80,0.18), 0 4px 8px rgba(0,0,0,0.08), 3px 5px 0 rgba(44,24,16,0.08)",
        transition: { duration: 0.22 },
      }}
      initial={{ opacity: 0, y: 18, rotate: -0.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`note-card relative group ${onClick ? "cursor-pointer" : ""} ${isAmbientDark ? 'border-ghibli-sky/10' : ''}`}
      style={{ background: tint }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
      } : undefined}
    >
      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ink pin dot (top-left corner accent) */}
      <div className={`absolute top-3 left-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isAmbientDark ? 'bg-ghibli-gold' : 'bg-ghibli-gold/60'}`} />

      {/* Content */}
      <div className="relative z-10">
        <h3 className={`text-xl font-heading font-bold mb-2 leading-snug line-clamp-2 transition-colors ${isAmbientDark ? 'text-ghibli-cream' : 'text-ghibli-navy'}`}>
          {title}
        </h3>
        <p className={`mb-4 text-sm leading-relaxed font-sans line-clamp-4 transition-colors ${isAmbientDark ? 'text-ghibli-cream/70' : 'text-ghibli-navy/75'}`}>
          {truncated}
        </p>

        <div className={`flex flex-wrap items-center justify-between mt-2 pt-2.5 border-t ${isAmbientDark ? 'border-ghibli-sky/10' : 'border-ghibli-gold/20'}`}>
          {/* Date with leaf icon */}
          <div className={`flex items-center text-xs gap-1.5 font-hand ${isAmbientDark ? 'text-ghibli-amber/70' : 'text-ghibli-navy/50'}`}>
            <Leaf className={`h-3 w-3 ${isAmbientDark ? 'text-ghibli-gold' : 'text-ghibli-forest'}`} />
            <span>{date}</span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-hand font-semibold border ${
                    isAmbientDark 
                      ? 'bg-ghibli-gold/10 text-ghibli-amber border-ghibli-gold/20' 
                      : 'bg-ghibli-forest/12 text-ghibli-moss border-ghibli-forest/20'
                  }`}
                >
                  <Tag className="h-2 w-2" />
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Soot-sprite hover effect — tiny dark orb floats up */}
      <motion.div
        className={`absolute bottom-3 right-3 w-3 h-3 rounded-full pointer-events-none ${isAmbientDark ? 'bg-ghibli-gold/20' : 'bg-ghibli-navy/20'}`}
        initial={{ y: 0, opacity: 0, scale: 0 }}
        whileHover={{ y: -20, opacity: [0, 0.7, 0], scale: [0, 1, 0.5] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default NoteCard;
