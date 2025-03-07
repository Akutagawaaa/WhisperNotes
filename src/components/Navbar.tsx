
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PenLine, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-ghibli-cream/80 backdrop-blur-md shadow-soft" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <PenLine className="h-6 w-6 text-ghibli-gold" />
          <h1 className="text-2xl font-heading font-bold text-ghibli-navy">WhisperNotes</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-ghibli-navy hover:text-ghibli-gold transition-colors">
            Home
          </Link>
          <Link to="/notes" className="text-ghibli-navy hover:text-ghibli-gold transition-colors">
            My Notes
          </Link>
          <Link to="/themes" className="text-ghibli-navy hover:text-ghibli-gold transition-colors">
            Themes
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-9 pr-4 py-2 rounded-full bg-ghibli-beige/50 focus:bg-white focus:ring-2 focus:ring-ghibli-gold/30 outline-none transition-all w-[180px] focus:w-[220px]"
            />
          </div>
          <Button className="btn-ghibli">New Note</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-ghibli-navy" />
          ) : (
            <Menu className="h-6 w-6 text-ghibli-navy" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-ghibli-cream/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-ghibli-navy py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/notes" 
                className="text-ghibli-navy py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Notes
              </Link>
              <Link 
                to="/themes" 
                className="text-ghibli-navy py-2 px-4 rounded-md hover:bg-ghibli-beige transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Themes
              </Link>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-ghibli-beige/70 focus:bg-white focus:ring-2 focus:ring-ghibli-gold/30 outline-none transition-all"
                />
              </div>
              <Button 
                className="btn-ghibli mt-2 w-full" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Note
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
