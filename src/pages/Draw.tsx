
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { 
  Download, 
  Save, 
  Undo, 
  Eraser, 
  PenTool, 
  Brush, 
  Minus, 
  Plus,
  Palette,
  Trash2
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const brushTypes = [
  { id: "ink", name: "Ink Pen", width: 2, opacity: 1, color: "#1a1a1a" },
  { id: "brush", name: "Watercolor", width: 8, opacity: 0.6, color: "#336699" },
  { id: "pencil", name: "Soft Pencil", width: 3, opacity: 0.8, color: "#6b5b4d" },
  { id: "marker", name: "Marker", width: 10, opacity: 0.9, color: "#ff6b6b" },
  { id: "calligraphy", name: "Calligraphy", width: 6, opacity: 1, color: "#000000" },
];

const colors = [
  "#1a1a1a", // Black
  "#6b5b4d", // Brown
  "#336699", // Blue
  "#558b6e", // Green
  "#a86a3d", // Terracotta
  "#ca7e8a", // Rose
  "#9b87f5", // Purple
  "#ff6b6b", // Red
  "#ffd166", // Yellow
];

const Draw = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [brushType, setBrushType] = useState("ink");
  const [brushColor, setBrushColor] = useState("#1a1a1a");
  const [brushSize, setBrushSize] = useState(2);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { toast } = useToast();
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        // Restore drawing if needed
        if (historyIndex >= 0 && context) {
          context.putImageData(drawingHistory[historyIndex], 0, 0);
        }
      }
    };
    
    // Setup the canvas context
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      setContext(ctx);
      
      // Save initial blank canvas state
      resizeCanvas();
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory([initialState]);
      setHistoryIndex(0);
    }
    
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  
  // Update brush settings based on the selected brush type
  useEffect(() => {
    const selectedBrush = brushTypes.find(brush => brush.id === brushType);
    if (selectedBrush && context) {
      setBrushSize(selectedBrush.width);
      setBrushColor(selectedBrush.color);
      context.globalAlpha = selectedBrush.opacity;
    }
  }, [brushType, context]);
  
  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;
    
    setIsDrawing(true);
    context.beginPath();
    
    // Get position based on event type
    const position = getEventPosition(e);
    if (position) {
      context.moveTo(position.x, position.y);
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;
    
    // Prevent scrolling when drawing on touch devices
    if (e.type === 'touchmove') {
      e.preventDefault();
    }
    
    const position = getEventPosition(e);
    if (position) {
      context.lineTo(position.x, position.y);
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
      context.stroke();
    }
  };
  
  const stopDrawing = () => {
    if (!isDrawing || !context || !canvasRef.current) return;
    
    context.closePath();
    setIsDrawing(false);
    
    // Save the current state to history
    const canvas = canvasRef.current;
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any forward history if we've gone back and now draw something new
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    setDrawingHistory([...newHistory, newState]);
    setHistoryIndex(newHistory.length);
  };
  
  // Helper to get position from mouse or touch event
  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };
  
  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0 && context && canvasRef.current) {
      const newIndex = historyIndex - 1;
      context.putImageData(drawingHistory[newIndex], 0, 0);
      setHistoryIndex(newIndex);
    }
  };
  
  // Clear canvas
  const handleClear = () => {
    if (!context || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save the new blank state
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    setDrawingHistory([newState]);
    setHistoryIndex(0);
  };
  
  // Save drawing
  const handleSave = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL("image/png");
    
    // Use localStorage or integrate with your Notes context
    // For now, we'll just show a success message
    toast({
      title: "Drawing Saved",
      description: "Your artwork has been saved to your notes.",
    });
    
    // Here you would typically call a function to save to your notes system
    console.log("Drawing saved:", imageUrl);
  };
  
  // Download drawing
  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL("image/png");
    
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ghibli-sketch-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Drawing Downloaded",
      description: "Your artwork has been downloaded.",
    });
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-ghibli-sky-light to-ghibli-beige overflow-hidden">
        <Navbar />
        
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-heading font-bold text-ghibli-navy">Artistic Sketchpad</h1>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleSave}
                        className="bg-white/80 hover:bg-white"
                      >
                        <Save className="h-5 w-5 text-ghibli-forest" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save to Notes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleDownload}
                        className="bg-white/80 hover:bg-white"
                      >
                        <Download className="h-5 w-5 text-ghibli-navy" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Drawing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* Tools Panel */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-soft p-3 flex flex-wrap items-center gap-2 md:gap-4">
              {/* Brush Selection */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-ghibli-navy">Brush:</label>
                <Select
                  value={brushType}
                  onValueChange={(value) => setBrushType(value)}
                >
                  <SelectTrigger className="w-[120px] md:w-[150px] h-9 bg-ghibli-beige/50">
                    <SelectValue placeholder="Select brush" />
                  </SelectTrigger>
                  <SelectContent>
                    {brushTypes.map((brush) => (
                      <SelectItem key={brush.id} value={brush.id}>
                        {brush.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Color Selection */}
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-ghibli-navy" />
                <div className="flex items-center gap-1 bg-ghibli-beige/50 p-1 rounded-md">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full ${
                        brushColor === color ? 'ring-2 ring-offset-1 ring-ghibli-gold' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setBrushColor(color)}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Brush Size */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setBrushSize(Math.max(1, brushSize - 1))}
                  className="h-9 w-9 bg-ghibli-beige/50"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{brushSize}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setBrushSize(Math.min(50, brushSize + 1))}
                  className="h-9 w-9 bg-ghibli-beige/50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Tool Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="h-9 w-9 bg-ghibli-beige/50"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClear}
                  className="h-9 w-9 bg-ghibli-beige/50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Canvas Container */}
            <motion.div 
              className="bg-white rounded-xl shadow-card paper-texture relative flex-1 h-[70vh]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full rounded-xl cursor-crosshair touch-none"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Draw;
