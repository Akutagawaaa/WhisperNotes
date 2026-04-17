
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
    image: "/covers/spirited-bath.png",
    accentColor: "#c0392b",
    labelBg: "rgba(120, 30, 20, 0.75)",
  },
  {
    id: "totoro-forest",
    name: "Totoro's Forest",
    image: "/covers/totoro-forest.png",
    accentColor: "#27ae60",
    labelBg: "rgba(20, 80, 40, 0.75)",
  },
  {
    id: "howl-sky",
    name: "Howl's Sky",
    image: "/covers/howl-sky.png",
    accentColor: "#2980b9",
    labelBg: "rgba(20, 60, 110, 0.75)",
  },
  {
    id: "kiki-delivery",
    name: "Kiki's Delivery",
    image: "/covers/kiki-delivery.png",
    accentColor: "#8e44ad",
    labelBg: "rgba(70, 20, 100, 0.75)",
  },
  {
    id: "castle-gold",
    name: "Castle in the Sky",
    image: "/covers/castle-gold.png",
    accentColor: "#d4a017",
    labelBg: "rgba(100, 70, 10, 0.75)",
  },
  {
    id: "mononoke-forest",
    name: "Mononoke Forest",
    image: "/covers/mononoke-forest.png",
    accentColor: "#16a085",
    labelBg: "rgba(10, 70, 60, 0.75)",
  },
  {
    id: "ponyo-ocean",
    name: "Ponyo's Ocean",
    image: "/covers/ponyo-ocean.png",
    accentColor: "#2471a3",
    labelBg: "rgba(10, 50, 100, 0.75)",
  },
  {
    id: "arrietty-garden",
    name: "Arrietty's Garden",
    image: "/covers/arrietty-garden.png",
    accentColor: "#1e8449",
    labelBg: "rgba(15, 80, 30, 0.75)",
  },
];

const getCover = (cover: string) =>
  NOTEBOOK_COVERS.find((c) => c.id === cover) ?? NOTEBOOK_COVERS[0];

// ──────────────────────────────────────────────────────────────────────────────
// Main NotebookCover
// ──────────────────────────────────────────────────────────────────────────────
const NotebookCover = ({
  id,
  title,
  description,
  cover,
  count = 0,
  onClick,
  onEdit,
  selected = false,
}: NotebookCoverProps) => {
  const coverData = getCover(cover);

  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: `0 24px 40px -8px ${coverData.accentColor}55, 0 8px 16px -4px rgba(0,0,0,0.3)`,
      }}
      animate={selected ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        "notebook-cover rounded-lg overflow-hidden shadow-lg cursor-pointer h-full select-none",
        selected ? "ring-2 ring-ghibli-gold ring-offset-2" : ""
      )}
      onClick={onClick}
      style={{ filter: selected ? "brightness(1.05)" : undefined }}
    >
      {/* ── Book wrapper with 3:4 aspect ratio ── */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">

        {/* ── Full-bleed Ghibli artwork background ── */}
        <img
          src={coverData.image}
          alt={coverData.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* ── Subtle paper/grain overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            mixBlendMode: "overlay",
            opacity: 0.35,
          }}
        />

        {/* ── Vignette to frame the image ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* ── Bottom gradient for label readability ── */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)",
          }}
        />

        {/* ── Realistic book spine ── */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[11px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(255,255,255,0.07) 100%)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        {/* ── Cloth-texture top edge ── */}
        <div
          className="absolute inset-x-0 top-0 h-[6px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
          }}
        />

        {/* ── Title label (frosted-glass style) at the bottom ── */}
        <div
          className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-4 z-10"
        >
          <div
            className="rounded-md px-3 py-2 backdrop-blur-[6px]"
            style={{ background: coverData.labelBg }}
          >
            <h3
              className="font-heading font-bold text-white text-sm leading-tight drop-shadow-sm line-clamp-2"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
            >
              {title}
            </h3>
            {description && (
              <p className="text-white/75 text-[10px] mt-0.5 leading-snug line-clamp-1">
                {description}
              </p>
            )}
            <div className="mt-1.5 flex items-center text-white/60 text-[10px] gap-1">
              <Book className="w-2.5 h-2.5 flex-shrink-0" />
              <span>{count} {count === 1 ? "note" : "notes"}</span>
            </div>
          </div>
        </div>

        {/* ── Edit button ── */}
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Edit notebook"
            aria-label="Edit notebook"
            className="absolute top-2 right-2 w-7 h-7 bg-black/40 hover:bg-black/65 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-20 border border-white/20"
          >
            <Edit className="w-3.5 h-3.5 text-white" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// "Create New Notebook" card
// ──────────────────────────────────────────────────────────────────────────────
export const NewNotebookCover = ({ onClick }: { onClick?: () => void }) => {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px -8px rgba(230,193,122,0.3)" }}
      transition={{ duration: 0.3 }}
      className="notebook-cover border-2 border-dashed border-ghibli-gold/40 rounded-lg h-full flex flex-col items-center justify-center cursor-pointer bg-white/40 dark:bg-ghibli-navy/30 hover:bg-ghibli-gold/10 hover:border-ghibli-gold/70 transition-all duration-300 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="w-full aspect-[3/4] flex flex-col items-center justify-center p-4 gap-3">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-full bg-ghibli-gold/20 border-2 border-ghibli-gold/40 flex items-center justify-center"
        >
          <Plus className="w-7 h-7 text-ghibli-gold" />
        </motion.div>
        <h3 className="font-heading font-medium text-ghibli-navy/70 dark:text-ghibli-cream/70 text-center text-sm leading-snug">
          Create New<br />Notebook
        </h3>
      </div>
    </motion.div>
  );
};

export default NotebookCover;
