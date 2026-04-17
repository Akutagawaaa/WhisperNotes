
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";

// Inline Totoro SVG for the empty state illustration
const TotoroIllustration = () => (
  <svg
    width="140"
    height="160"
    viewBox="0 0 140 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Totoro illustration"
  >
    {/* Shadow */}
    <ellipse cx="70" cy="154" rx="38" ry="8" fill="rgba(44,24,16,0.08)" />

    {/* Body */}
    <ellipse cx="70" cy="115" rx="42" ry="40" fill="#8CAB93" />

    {/* Belly */}
    <ellipse cx="70" cy="120" rx="28" ry="26" fill="#F7EFE2" opacity="0.9" />

    {/* Belly pattern (wavy lines) */}
    <path d="M50 108 Q70 103 90 108" stroke="#E6C17A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M47 116 Q70 110 93 116" stroke="#E6C17A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    <path d="M50 124 Q70 118 90 124" stroke="#E6C17A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />

    {/* Head */}
    <circle cx="70" cy="68" r="46" fill="#8CAB93" />

    {/* Left ear */}
    <ellipse cx="32" cy="28" rx="12" ry="20" fill="#8CAB93" transform="rotate(-20 32 28)" />
    <ellipse cx="32" cy="28" rx="7"  ry="13" fill="#F2E8D5" opacity="0.6" transform="rotate(-20 32 28)" />

    {/* Right ear */}
    <ellipse cx="108" cy="28" rx="12" ry="20" fill="#8CAB93" transform="rotate(20 108 28)" />
    <ellipse cx="108" cy="28" rx="7"  ry="13" fill="#F2E8D5" opacity="0.6" transform="rotate(20 108 28)" />

    {/* Eyes */}
    <circle cx="55" cy="62" r="10" fill="white" />
    <circle cx="85" cy="62" r="10" fill="white" />
    <circle cx="57" cy="63" r="5.5" fill="#1F2937" />
    <circle cx="87" cy="63" r="5.5" fill="#1F2937" />
    {/* Eye shine */}
    <circle cx="59" cy="60" r="2" fill="white" />
    <circle cx="89" cy="60" r="2" fill="white" />

    {/* Nose */}
    <ellipse cx="70" cy="73" rx="4" ry="3" fill="rgba(44,24,16,0.25)" />

    {/* Whiskers */}
    <line x1="30" y1="72" x2="58" y2="75" stroke="rgba(44,24,16,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="76" x2="58" y2="76" stroke="rgba(44,24,16,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="82" y1="75" x2="110" y2="72" stroke="rgba(44,24,16,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="82" y1="76" x2="110" y2="76" stroke="rgba(44,24,16,0.2)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Smile */}
    <path d="M60 80 Q70 87 80 80" stroke="rgba(44,24,16,0.25)" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Small leaf in paw */}
    <ellipse cx="100" cy="138" rx="9" ry="6" fill="#5A7A5E" transform="rotate(-30 100 138)" />
    <line x1="100" y1="138" x2="106" y2="132" stroke="#8CAB93" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

interface EmptyStateProps {
  action?: () => void;
  actionText?: string;
}

const EmptyState = ({ action, actionText = "Create your first note" }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Totoro bouncing */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <TotoroIllustration />
      </motion.div>

      {/* Handwritten text */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream mb-3"
      >
        No notes yet…
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-ghibli-navy/60 dark:text-ghibli-cream/60 font-hand text-lg mb-8 max-w-xs leading-relaxed"
      >
        ✨ Time to start a new adventure — every great story begins with a single word.
      </motion.p>

      {action && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileTap={{ scale: 0.96 }}
        >
          <Button
            onClick={action}
            className="btn-ghibli flex items-center gap-2 text-base px-7 py-3"
          >
            <Feather className="h-4 w-4" />
            {actionText}
          </Button>
        </motion.div>
      )}

      {/* Floating soot sprites around Totoro */}
      {[
        { x: -80, y: -30, size: 7, delay: 0   },
        { x:  90, y: -50, size: 5, delay: 0.8 },
        { x: -60, y:  40, size: 6, delay: 1.5 },
        { x:  75, y:  20, size: 4, delay: 2   },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-ghibli-navy/15 pointer-events-none"
          style={{ width: s.size, height: s.size }}
          animate={{
            x:       [s.x, s.x + 10, s.x - 5, s.x],
            y:       [s.y, s.y - 8,  s.y + 4,  s.y],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 4 + i, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
};

export default EmptyState;
