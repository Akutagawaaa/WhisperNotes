
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Tag, Image, Mic, Bold, Italic, List, CheckSquare } from "lucide-react";

interface NoteEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  onSave?: (note: { title: string; content: string; tags: string[] }) => void;
  onCancel?: () => void;
}

const NoteEditor = ({
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  onSave,
  onCancel
}: NoteEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave?.({
        title: title.trim(),
        content: content.trim(),
        tags
      });
    }
  };

  return (
    <div className="bg-ghibli-cream/90 backdrop-blur-sm rounded-xl shadow-card paper-texture p-6 animate-paper-enter">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-ghibli-navy">
          {initialTitle ? "Edit Note" : "Create New Note"}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-ghibli-navy hover:bg-ghibli-terracotta/10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full bg-transparent border-b border-ghibli-navy/20 py-2 text-lg font-heading focus:border-ghibli-gold outline-none transition-colors"
        />
      </div>

      <div className="mb-2 flex items-center gap-1 bg-ghibli-beige/50 p-1 rounded-md">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-md"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-md"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-md"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-md"
          title="Checklist"
        >
          <CheckSquare className="h-4 w-4" />
        </Button>
        <div className="h-5 w-px bg-ghibli-navy/10 mx-1"></div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-md"
          title="Add Image"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-md"
          title="Voice Note"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your magical notes here..."
          className="w-full bg-transparent min-h-[200px] py-3 text-ghibli-navy/90 outline-none resize-none leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Tag className="h-4 w-4 mr-2 text-ghibli-navy/70" />
          <span className="text-sm font-medium text-ghibli-navy/70">Tags</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <div 
              key={index}
              className="flex items-center gap-1 bg-ghibli-forest/10 px-3 py-1 rounded-full text-sm text-ghibli-forest"
            >
              <span>{tag}</span>
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="h-4 w-4 flex items-center justify-center rounded-full hover:bg-ghibli-forest/20"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            placeholder="Add a tag..."
            className="flex-1 bg-ghibli-beige/50 rounded-l-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ghibli-gold/30"
          />
          <Button
            onClick={handleAddTag}
            className="rounded-l-none bg-ghibli-forest/20 hover:bg-ghibli-forest/30 text-ghibli-forest"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="btn-outline"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="btn-ghibli flex items-center gap-2"
          disabled={!title.trim() || !content.trim()}
        >
          <Save className="h-4 w-4" />
          Save Note
        </Button>
      </div>
    </div>
  );
};

export default NoteEditor;
