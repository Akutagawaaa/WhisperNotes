
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Save, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    // Validate
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
      className="bg-white dark:bg-ghibli-navy dark:text-ghibli-cream rounded-xl shadow-card overflow-hidden w-full max-h-[90vh] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="p-6 border-b border-gray-200 dark:border-ghibli-navy/40 flex items-center justify-between">
        <h2 className="text-2xl font-heading font-semibold text-ghibli-navy dark:text-ghibli-cream">
          {initialData.id ? "Edit Notebook" : "Create New Notebook"}
        </h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-6 overflow-y-auto flex-grow">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notebook Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) setErrors(prev => ({ ...prev, title: false }));
            }}
            placeholder="My Magical Journal"
            className={`${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">Please enter a title for your notebook</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (Optional)
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this notebook for?"
            className="resize-none h-24"
          />
        </div>

        <div>
          <h3 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Choose a Cover
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {NOTEBOOK_COVERS.map((coverOption) => (
              <div
                key={coverOption.id}
                onClick={() => handleCoverSelect(coverOption.id)}
                className={`cursor-pointer ${coverOption.background} h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  cover === coverOption.id ? 'border-ghibli-gold scale-105' : 'border-transparent scale-100'
                }`}
              >
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-white text-xs text-center px-1 bg-black/20 rounded-md">
                    {coverOption.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 dark:border-ghibli-navy/40 flex justify-between">
        {onDelete && (
          <Button 
            variant="outline" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotebookEditor;
