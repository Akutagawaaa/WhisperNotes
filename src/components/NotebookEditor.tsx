
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Save, Trash2, Book, Sparkles } from "lucide-react";
import { NOTEBOOK_COVERS } from "@/components/NotebookCover";
import { toast } from "@/components/ui/use-toast";

interface NotebookEditorProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    cover: string;
  };
  onSave: (data: { title: string; description: string; cover: string }) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const NotebookEditor = ({ 
  initialData = { title: "", description: "", cover: "howl-sky" }, 
  onSave, 
  onCancel, 
  onDelete 
}: NotebookEditorProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [cover, setCover] = useState(initialData.cover);
  const [errors, setErrors] = useState({ title: false });

  const handleSave = () => {
    if (!title.trim()) {
      setErrors(prev => ({ ...prev, title: true }));
      toast({
        title: "Notebook needs a title",
        variant: "destructive"
      });
      return;
    }
    onSave({ title, description, cover });
  };

  const handleCoverSelect = (coverId: string) => {
    setCover(coverId);
  };

  return (
    <motion.div
      className="ghibli-card p-0 overflow-hidden w-full max-h-[90vh] flex flex-col shadow-glow-warm border-ghibli-gold/30"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
    >
      {/* Header */}
      <div className="p-6 bg-white/40 dark:bg-ghibli-midnight/40 border-b border-ghibli-gold/15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ghibli-gold/20 flex items-center justify-center text-ghibli-gold border border-ghibli-gold/10">
            <Book className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
              {initialData.id ? "Refine Notebook" : "New Collection"}
            </h2>
            <div className="flex items-center gap-1.5 opacity-60">
               <Sparkles className="h-3 w-3 text-ghibli-gold" />
               <span className="text-[10px] uppercase font-hand tracking-[0.2em] text-ghibli-navy dark:text-ghibli-cream">Studio Bindings</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full text-ghibli-navy dark:text-ghibli-cream hover:bg-ghibli-terracotta/10">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-8 overflow-y-auto flex-grow space-y-8">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-xs font-hand font-bold uppercase tracking-widest text-ghibli-navy/40 dark:text-ghibli-cream/40 mb-2">
            Parchment Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) setErrors(prev => ({ ...prev, title: false }));
            }}
            placeholder="My Magical Journal"
            className={`w-full bg-ghibli-parchment/40 dark:bg-ghibli-midnight/40 rounded-2xl px-6 py-4 text-xl font-heading border-2 transition-all outline-none ${
              errors.title 
                ? 'border-red-400 bg-red-50/30' 
                : 'border-ghibli-gold/20 focus:border-ghibli-gold focus:bg-white dark:focus:bg-ghibli-midnight focus:shadow-glow-warm text-ghibli-navy dark:text-ghibli-cream'
            }`}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-500 font-hand italic">Each journey needs a name...</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-xs font-hand font-bold uppercase tracking-widest text-ghibli-navy/40 dark:text-ghibli-cream/40 mb-2">
            Brief Chronicle (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What secrets will these pages hold?"
            className="w-full bg-ghibli-parchment/30 dark:bg-ghibli-midnight/30 rounded-2xl px-6 py-4 text-lg font-hand border-2 border-ghibli-gold/10 focus:border-ghibli-gold/40 focus:divide-ghibli-gold/20 focus:bg-white dark:focus:bg-ghibli-midnight outline-none transition-all resize-none h-32 text-ghibli-navy/80 dark:text-ghibli-cream/80"
          />
        </div>

        {/* Cover Selection */}
        <div>
          <label className="block text-xs font-hand font-bold uppercase tracking-widest text-ghibli-navy/40 dark:text-ghibli-cream/40 mb-4">
            Visual Soul (Cover Art)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {NOTEBOOK_COVERS.map((coverOption) => (
              <motion.div
                key={coverOption.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCoverSelect(coverOption.id)}
                className={`cursor-pointer h-24 rounded-2xl overflow-hidden border-2 transition-all relative group ${
                  cover === coverOption.id 
                    ? 'border-ghibli-gold shadow-glow-warm ring-1 ring-ghibli-gold' 
                    : 'border-white/50 dark:border-white/5 hover:border-ghibli-gold/40'
                }`}
              >
                <img
                  src={coverOption.image}
                  alt={coverOption.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span
                  className="absolute bottom-2 left-0 right-0 text-white text-[10px] text-center px-2 leading-tight font-hand font-bold tracking-wide"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {coverOption.name}
                </span>
                
                {cover === coverOption.id && (
                  <motion.div 
                    layoutId="activeCover"
                    className="absolute top-2 right-2 bg-ghibli-gold rounded-full p-1 shadow-lg"
                  >
                     <Sparkles className="h-3 w-3 text-ghibli-navy" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-8 bg-white/40 dark:bg-ghibli-midnight/40 border-t border-ghibli-gold/15 flex flex-wrap items-center justify-between gap-4">
        {onDelete ? (
          <Button 
            variant="ghost" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50 font-hand text-lg px-6 flex items-center gap-2"
            onClick={onDelete}
          >
            <Trash2 className="h-5 w-5" />
            Vanish
          </Button>
        ) : <div />}
        
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="btn-outline h-12 px-8 min-w-[120px]"
          >
            Wait
          </Button>
          <Button 
            onClick={handleSave}
            className="btn-ghibli h-12 px-8 min-w-[152px] flex items-center gap-2.5"
          >
            <Save className="h-5 w-5" />
            <span>Bind Collection</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotebookEditor;
