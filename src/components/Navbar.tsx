
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Feather, Search, Palette, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemes } from "@/context/ThemesContext";

// Inline Totoro logo SVG
// ── Ghibli Character Logos ──

// 1. Meadow Kodama (Meadows - Peace & Life)
const KodamaLogo = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
    {/* Spiritual Body */}
    <motion.path 
      d="M16 34 C10 34 6 30 6 24 C6 18 10 14 16 14 C22 14 26 18 26 24 C26 30 22 34 16 34 Z" 
      fill="white" opacity="0.6"
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.circle 
      cx="16" cy="14" r="11" fill="white" opacity="0.85"
      animate={{ rotate: [0, -8, 8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Facial Features */}
    <circle cx="11.5" cy="12" r="1.8" fill="#2C3E50" />
    <circle cx="20.5" cy="12" r="1.8" fill="#2C3E50" />
    <path d="M14 18 Q16 20 18 18" stroke="#2C3E50" strokeWidth="1.2" fill="none" />
    {/* 🌸 THE MEADOW FLOWER */}
    <motion.circle 
      cx="26" cy="24" r="3" fill="#818CF8" 
      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="26" cy="24" r="1" fill="#FDE047" />
  </svg>
);

// 2. Iconic Totoro (Totoro Forest)
const TotoroLogo = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
    <ellipse cx="16" cy="27" rx="12" ry="9" fill="currentColor" opacity="0.15" />
    <ellipse cx="16" cy="26" rx="12" ry="10" fill="currentColor" opacity="0.8" />
    <circle cx="16" cy="15" r="10" fill="currentColor" opacity="0.85" />
    <path d="M7 6 L6 0 L12 8" fill="currentColor" opacity="0.8" transform="rotate(-5 7 6)" />
    <path d="M25 6 L26 0 L20 8" fill="currentColor" opacity="0.8" transform="rotate(5 25 6)" />
    <circle cx="11" cy="13" r="2.8" fill="white" />
    <circle cx="21" cy="13" r="2.8" fill="white" />
    <circle cx="11.5" cy="13" r="1.5" fill="#1F2937" />
    <circle cx="20.5" cy="13" r="1.5" fill="#1F2937" />
    <path d="M13 22 L16 20 L19 22 M12 25 L16 23 L20 25" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
    <motion.g animate={{ rotate: 5 }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
      <path d="M16 10 L16 2 M12 2 Q16 -1 22 3" stroke="#5A7A5E" strokeWidth="1.5" fill="none" />
      <path d="M12 2 Q17 -2 22 3 Q17 1 12 2" fill="#8CAB93" />
    </motion.g>
  </svg>
);

// 3. Soot Sprite / Susuwatari (Spirited Bathhouse)
const SootLogo = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
    <motion.circle 
      cx="16" cy="18" r="14" fill="#0D1117"
      animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 0.2, repeat: Infinity }}
    />
    {/* Spikes */}
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.path 
        key={i} d={`M 16 18 L ${16 + Math.cos(i * (Math.PI/6)) * 16} ${18 + Math.sin(i * (Math.PI/6)) * 16}`} 
        stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round"
      />
    ))}
    <circle cx="11" cy="15" r="4.5" fill="white" />
    <circle cx="21" cy="15" r="4.5" fill="white" />
    <motion.circle cx="12" cy="15" r="1.8" fill="black" animate={{ x: [-1, 1, -1] }} transition={{ duration: 1, repeat: Infinity }} />
    <motion.circle cx="22" cy="15" r="1.8" fill="black" animate={{ x: [-1, 1, -1] }} transition={{ duration: 1, repeat: Infinity }} />
  </svg>
);

// 4. Jiji the Cat (Kiki's Delivery)
const JijiLogo = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
    <path d="M6 18 Q16 32 26 18 Q26 10 16 12 Q6 10 6 18" fill="#1A1A1A" />
    <path d="M8 12 L4 2 L12 10" fill="#1A1A1A" />
    <path d="M24 12 L28 2 L20 10" fill="#1A1A1A" />
    <path d="M7 10 L5 4 L10 9" fill="#E6BAB7" opacity="0.5" />
    <path d="M25 10 L27 4 L20 9" fill="#E6BAB7" opacity="0.5" />
    <ellipse cx="11" cy="17" rx="3.5" ry="4.5" fill="white" />
    <ellipse cx="21" cy="17" rx="3.5" ry="4.5" fill="white" />
    <circle cx="11" cy="17" r="1.8" fill="black" />
    <circle cx="21" cy="17" r="1.8" fill="black" />
    <circle cx="16" cy="20" r="1" fill="#E6BAB7" />
  </svg>
);

// 5. No-Face / Kaonashi (Ghibli Night - Image 1 Reference)
const NoFaceLogo = () => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
    {/* Ghostly Body */}
    <motion.path 
      d="M6 34 C6 18 8 4 16 4 C24 4 26 18 26 34" 
      fill="#0A0A0A" opacity="0.9"
      animate={{ opacity: [0.8, 0.95, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Iconic Mask */}
    <ellipse cx="16" cy="14" rx="9" ry="11" fill="white" />
    {/* Mask Markings (Reference Image 1) */}
    <rect x="13.5" cy="5.5" width="5" height="1.5" rx="0.75" fill="#6B4171" opacity="0.3" />
    <ellipse cx="12" cy="7" rx="1.5" ry="3" fill="#6B4171" opacity="0.6" />
    <ellipse cx="20" cy="7" rx="1.5" ry="3" fill="#6B4171" opacity="0.6" />
    {/* Eyes */}
    <ellipse cx="12" cy="13.5" rx="2.5" ry="1.8" fill="black" />
    <ellipse cx="20" cy="13.5" rx="2.5" ry="1.8" fill="black" />
    {/* Lower Markings */}
    <ellipse cx="12" cy="18.5" rx="1.5" ry="3" fill="#6B4171" opacity="0.6" />
    <ellipse cx="20" cy="18.5" rx="1.5" ry="3" fill="#6B4171" opacity="0.6" />
    <rect x="13.5" cy="22" width="5" height="1.5" rx="0.75" fill="black" opacity="0.8" />
    <rect x="14.5" cy="24.5" width="3" height="1" rx="0.5" fill="black" opacity="0.4" />
  </svg>
);

const LogoCharacter = ({ themeId }: { themeId: string }) => {
  const characters: Record<string, React.ReactNode> = {
    "default":        <KodamaLogo />,
    "totoro-forest":  <TotoroLogo />,
    "spirited-bath":  <SootLogo />,
    "kiki-delivery":  <JijiLogo />,
    "ghibli-night":   <NoFaceLogo />,
  };
  return characters[themeId] || characters["default"];
};

const Navbar = () => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm]           = useState("");
  const [searchFocused, setSearchFocused]     = useState(false);
  const location  = useLocation();
  const { currentTheme, isAmbientDark } = useThemes();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const handleNewNote = () => {
    if (location.pathname !== "/notes") window.location.href = "/notes";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim())
      window.location.href = `/notes?search=${encodeURIComponent(searchTerm)}`;
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/",       label: "Home",     icon: null },
    { to: "/notes",  label: "My Notes", icon: null },
    { to: "/themes", label: "Themes",   icon: null },
    { to: "/draw",   label: "Draw",     icon: null },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? `py-2 navbar-glass shadow-sm ${isAmbientDark ? 'bg-ghibli-midnight/40' : 'bg-white/40'}` 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            key={currentTheme.id}
            initial={
              currentTheme.id === "spirited-bath" ? { scale: 0, rotate: -45 } :
              currentTheme.id === "ghibli-night" ? { scale: 0, filter: "brightness(2)" } :
              { x: -30, opacity: 0, rotate: -15 }
            }
            animate={{ 
              x: 0, opacity: 1, rotate: 0, scale: 1, filter: "brightness(1)",
              y: [0, -2, 0] 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 12,
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`transition-colors duration-300 ${isAmbientDark ? "text-ghibli-amber" : "text-ghibli-forest"}`}
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
          >
            <LogoCharacter themeId={currentTheme.id} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className={`text-2xl font-heading font-bold tracking-tight block leading-none transition-colors ${
                isAmbientDark ? "text-white drop-shadow-sm" : "text-ghibli-navy"
              }`}
            >
              WhisperNotes
            </span>
            <span className={`text-[10px] font-hand tracking-widest uppercase opacity-80 ${
              isAmbientDark ? "text-ghibli-amber" : "text-ghibli-terracotta"
            }`}>
              ✦ Ghibli Dreams ✦
            </span>
          </motion.div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link text-sm font-semibold transition-all duration-300 drop-shadow-sm ${
                isAmbientDark 
                  ? "text-ghibli-cream/90 hover:text-ghibli-amber brightness-110" 
                  : "text-ghibli-navy/90 hover:text-ghibli-navy"
              } ${isActive(to) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-all ${
                searchFocused
                  ? "text-ghibli-gold"
                  : isAmbientDark ? "text-ghibli-cream/40" : "text-ghibli-navy/40"
              }`}
            />
            <input
              type="text"
              placeholder="Search notes…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`pl-8 pr-4 py-1.5 rounded-full text-sm font-hand outline-none transition-all duration-300 border ${
                isAmbientDark
                  ? "bg-ghibli-midnight/60 border-ghibli-sky/20 text-ghibli-cream placeholder:text-ghibli-cream/30 focus:bg-ghibli-midnight focus:border-ghibli-gold/50"
                  : "bg-ghibli-parchment/70 border-ghibli-gold/25 text-ghibli-navy placeholder:text-ghibli-navy/35 focus:bg-ghibli-cream focus:border-ghibli-gold/60"
              } ${searchFocused ? "w-[200px] shadow-glow-warm" : "w-[160px]"}`}
            />
          </form>

          {/* New Note button */}
          <motion.button
            className="btn-ghibli flex items-center gap-2 text-sm py-2 px-5"
            onClick={handleNewNote}
            whileTap={{ scale: 0.96 }}
          >
            <Feather className="h-3.5 w-3.5" />
            New Note
          </motion.button>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isAmbientDark ? "hover:bg-white/10" : "hover:bg-ghibli-parchment"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileMenuOpen ? (
              <motion.div key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className={`h-6 w-6 ${isAmbientDark ? "text-ghibli-cream" : "text-ghibli-navy"}`} />
              </motion.div>
            ) : (
              <motion.div key="menu"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className={`h-6 w-6 ${isAmbientDark ? "text-ghibli-cream" : "text-ghibli-navy"}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile Menu — scroll-unroll animation ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className={`md:hidden overflow-hidden border-t ${
              isAmbientDark
                ? "bg-ghibli-midnight/95 border-ghibli-sky/15"
                : "bg-ghibli-parchment/97 border-ghibli-gold/25"
            } backdrop-blur-md`}
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`py-2.5 px-4 rounded-xl font-hand text-base transition-all ${
                    isActive(to)
                      ? isAmbientDark
                        ? "bg-ghibli-gold/15 text-ghibli-amber"
                        : "bg-ghibli-gold/20 text-ghibli-navy font-semibold"
                      : isAmbientDark
                        ? "text-ghibli-cream/80 hover:bg-white/8 hover:text-ghibli-amber"
                        : "text-ghibli-navy/80 hover:bg-ghibli-gold/10 hover:text-ghibli-navy"
                  }`}
                >
                  {label}
                </Link>
              ))}

              <form onSubmit={handleSearch} className="relative mt-3">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isAmbientDark ? 'text-ghibli-cream/40' : 'text-ghibli-navy/40'}`} />
                <input
                  type="text"
                  placeholder="Search notes…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-full font-hand text-sm border outline-none transition-colors ${
                    isAmbientDark
                      ? "bg-ghibli-midnight border-ghibli-sky/20 text-ghibli-cream placeholder:text-ghibli-cream/30"
                      : "bg-ghibli-cream border-ghibli-gold/30 text-ghibli-navy placeholder:text-ghibli-navy/35"
                  }`}
                />
              </form>

              <motion.button
                className="btn-ghibli mt-3 w-full flex items-center justify-center gap-2"
                onClick={handleNewNote}
                whileTap={{ scale: 0.97 }}
              >
                <Feather className="h-4 w-4" />
                New Note
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
