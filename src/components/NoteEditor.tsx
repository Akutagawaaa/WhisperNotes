
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Tag, Image, Mic, Bold, Italic, List, CheckSquare, Sparkles, Feather, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toEditorHtml = (value: string) => {
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(value);
    if (looksLikeHtml) return value;
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  };

  const getPlainTextFromHtml = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

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
    const htmlContent = editorRef.current?.innerHTML || "";
    const plainTextContent = getPlainTextFromHtml(htmlContent).trim();
    if (title.trim() && plainTextContent) {
      onSave?.({
        title: title.trim(),
        content: htmlContent,
        tags
      });
    }
  };
  const canSave = !!title.trim() && !!getPlainTextFromHtml(editorRef.current?.innerHTML || "").trim();

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const exec = (command: string, value?: string) => {
    focusEditor();
    document.execCommand(command, false, value);
  };

  const insertChecklist = () => {
    exec("insertHTML", `<div style="display: flex; align-items: baseline; gap: 8px;"><span>&#9744;</span>&nbsp;</div>`);
  };

  const handleInsertImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      exec("insertImage", reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleVoiceNote = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstart = () => setIsRecording(true);

      recorder.onstop = () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        exec("insertHTML", `<div style="margin: 12px 0;"><audio controls src="${audioUrl}" style="height: 32px; width: 100%; max-width: 300px;"></audio></div><br/>`);

        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      };

      recorder.start();
    } catch {
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = toEditorHtml(initialContent);
    setIsEditorEmpty(!getPlainTextFromHtml(editorRef.current.innerHTML).trim());
  }, [initialContent]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="ghibli-card p-0 overflow-hidden max-h-[90vh] flex flex-col shadow-glow-warm border-ghibli-gold/30">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-ghibli-gold/15 bg-white/40 dark:bg-ghibli-midnight/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ghibli-gold/20 flex items-center justify-center text-ghibli-gold">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream">
              {initialTitle ? "Refine Your Thought" : "A New Adventure"}
            </h2>
            <p className="text-xs font-hand text-ghibli-navy/50 dark:text-ghibli-cream/50 tracking-wider">
               ✦ WhisperNotes Studio ✦
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-ghibli-navy dark:text-ghibli-cream hover:bg-ghibli-terracotta/15 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Title Input */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What calls to you? (Title)"
            className="w-full bg-transparent border-none py-2 text-3xl font-heading font-bold text-ghibli-navy dark:text-ghibli-cream placeholder:text-ghibli-navy/20 dark:placeholder:text-ghibli-cream/20 outline-none transition-all"
          />
          <div className="h-0.5 w-16 bg-ghibli-gold/40 rounded-full" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-ghibli-parchment/50 dark:bg-ghibli-midnight/40 border border-ghibli-gold/10">
          <div className="flex items-center gap-1 px-1">
            <ToolbarButton icon={<Bold className="h-4 w-4" />} onClick={() => exec("bold")} label="Bold" />
            <ToolbarButton icon={<Italic className="h-4 w-4" />} onClick={() => exec("italic")} label="Italic" />
            <ToolbarButton icon={<List className="h-4 w-4" />} onClick={() => exec("insertUnorderedList")} label="List" />
            <ToolbarButton icon={<CheckSquare className="h-4 w-4" />} onClick={insertChecklist} label="Checklist" />
          </div>
          <div className="h-6 w-px bg-ghibli-gold/20 mx-1" />
          <div className="flex items-center gap-1 px-1">
            <ToolbarButton icon={<Image className="h-4 w-4" />} onClick={handleInsertImage} label="Image" />
            <ToolbarButton 
              icon={<Mic className="h-4 w-4" />} 
              onClick={handleVoiceNote} 
              label="Voice" 
              active={isRecording}
            />
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Editor Area */}
        <div className="relative group min-h-[300px]">
          {isEditorEmpty && (
            <span className="pointer-events-none absolute left-4 top-4 text-xl font-hand text-ghibli-navy/30 dark:text-ghibli-cream/30 italic">
              "Every note is a petal falling into the stream of time..."
            </span>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => setIsEditorEmpty(!getPlainTextFromHtml(editorRef.current?.innerHTML || "").trim())}
            className="w-full min-h-[300px] rounded-2xl bg-white/50 dark:bg-ghibli-midnight/30 border border-ghibli-gold/10 px-6 py-6 text-xl font-hand text-ghibli-navy/90 dark:text-ghibli-cream/90 outline-none leading-relaxed prose dark:prose-invert max-w-none"
          />
        </div>

        {/* Tags Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-ghibli-navy/40 dark:text-ghibli-cream/40 font-hand">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[10px]">Spirit Tags</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {tags.map((tag, index) => (
                <motion.div 
                  key={tag}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="ghibli-badge flex items-center gap-1.5 py-1.5 px-3.5 bg-ghibli-forest/15 text-ghibli-moss border-ghibli-forest/30"
                >
                  <span className="text-sm">{tag}</span>
                  <button 
                    onClick={() => handleRemoveTag(tag)}
                    className="h-4 w-4 flex items-center justify-center rounded-full hover:bg-ghibli-forest/20 transition-colors"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="flex max-w-xs group transition-all">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              placeholder="Mark your trail..."
              className="flex-1 bg-ghibli-parchment/40 dark:bg-ghibli-midnight/40 rounded-l-full px-5 py-2.5 text-sm font-hand border border-ghibli-gold/20 focus:border-ghibli-gold/60 focus:bg-white dark:focus:bg-ghibli-midnight outline-none transition-all placeholder:text-ghibli-navy/30"
            />
            <button
              onClick={handleAddTag}
              className="bg-ghibli-gold text-ghibli-navy px-5 rounded-r-full font-hand font-bold text-sm border border-ghibli-gold hover:bg-ghibli-amber transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white/40 dark:bg-ghibli-midnight/40 border-t border-ghibli-gold/15 flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          onClick={onCancel}
          className="btn-outline h-12 px-8 min-w-[120px]"
        >
          Wait, Go Back
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="btn-ghibli h-12 px-8 min-w-[160px] flex items-center gap-2.5 disabled:opacity-50 disabled:grayscale disabled:scale-95 disabled:pointer-events-none"
        >
          <Save className="h-5 w-5" />
          <span>Etch into Memory</span>
        </Button>
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}

const ToolbarButton = ({ icon, onClick, label, active }: ToolbarButtonProps) => (
  <Button 
    variant="ghost" 
    size="sm" 
    className={`h-9 w-9 p-0 rounded-xl transition-all ${
      active 
        ? "bg-ghibli-gold/30 text-ghibli-navy shadow-sm scale-110" 
        : "text-ghibli-navy/60 dark:text-ghibli-cream/60 hover:bg-white/60 dark:hover:bg-ghibli-midnight"
    }`}
    title={label}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {icon}
  </Button>
);

export default NoteEditor;
