
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemes } from "@/context/ThemesContext";

interface GhibliSkyProps {
  className?: string;
}

// ── World Configurations ──
// These define the aesthetic "filter" and elements for each Ghibli world.
type WorldConfig = {
  skyMorning: string[];
  skyDay: string[];
  skyEvening: string[];
  skyNight: string[];
  hillFar: string;
  hillMid: string;
  hillNear: string;
  spirits: ("kodama" | "soot" | "firefly")[];
  showClouds: boolean;
  showStars: boolean;
  silhouette?: "totoro" | "bathhouse" | "broom";
};

const WORLD_STYLES: Record<string, WorldConfig> = {
  default: {
    skyMorning: ["#F9D8C5", "#E8C4B0", "#C9D9E8"],
    skyDay:     ["#C8DCF0", "#A4C6E7", "#F7EFE2"],
    skyEvening: ["#E8967A", "#C9A8C4", "#7A9EC8"],
    skyNight:   ["#0F2340", "#1A3A5C", "#0D1E38"],
    hillFar:    "rgba(140,171,147,0.35)",
    hillMid:    "rgba(90,122,94,0.45)",
    hillNear:   "rgba(44,72,44,0.55)",
    spirits:    ["kodama", "firefly"],
    showClouds: true,
    showStars:  true,
  },
  "totoro-forest": {
    skyMorning: ["#D4E5D8", "#B8D4C0", "#F7EFE2"],
    skyDay:     ["#A8C69F", "#8CAB93", "#F2E8D5"],
    skyEvening: ["#7C9A7E", "#5A7A5E", "#3D523F"],
    skyNight:   ["#1A2420", "#2C3E33", "#121A16"],
    hillFar:    "rgba(70,100,80,0.4)",
    hillMid:    "rgba(50,85,65,0.6)",
    hillNear:   "rgba(35,65,50,0.8)",
    spirits:    ["kodama"],
    showClouds: true,
    showStars:  true,
    silhouette: "totoro",
  },
  "spirited-bath": {
    skyMorning: ["#F9E2D2", "#D4A28B", "#F7EFE2"],
    skyDay:     ["#E6BAB7", "#D4A28B", "#F9F5EC"],
    skyEvening: ["#D47C6A", "#9C5A4E", "#4A2F2B"],
    skyNight:   ["#2D1F1E", "#4A2F2B", "#1A1413"],
    hillFar:    "rgba(160,120,100,0.3)",
    hillMid:    "rgba(130,90,75,0.5)",
    hillNear:   "rgba(100,70,60,0.7)",
    spirits:    ["soot"],
    showClouds: false,
    showStars:  true,
    silhouette: "bathhouse",
  },
  "kiki-delivery": {
    skyMorning: ["#E6E6FA", "#D8BFD8", "#FFF0F5"],
    skyDay:     ["#B0C4DE", "#A4C6E7", "#E6BAB7"],
    skyEvening: ["#DDA0DD", "#BA55D3", "#4B0082"],
    skyNight:   ["#191970", "#483D8B", "#000000"],
    hillFar:    "rgba(176,196,222,0.4)",
    hillMid:    "rgba(119,136,153,0.5)",
    hillNear:   "rgba(70,130,180,0.6)",
    spirits:    ["firefly"],
    showClouds: true,
    showStars:  true,
    silhouette: "broom",
  },
  "ghibli-night": {
    skyMorning: ["#1A2B4A", "#0F2340", "#09182D"],
    skyDay:     ["#0F2340", "#1A3A5C", "#0D1E38"],
    skyEvening: ["#09182D", "#0A1426", "#050B14"],
    skyNight:   ["#050B14", "#09182D", "#020408"],
    hillFar:    "rgba(15,35,65,0.4)",
    hillMid:    "rgba(10,25,48,0.6)",
    hillNear:   "rgba(5,15,32,0.8)",
    spirits:    ["soot", "firefly"],
    showClouds: false,
    showStars:  true,
    silhouette: "totoro",
  },
};

const CLOUD_CONFIGS = [
  { width: 180, height: 70,  top: "8%",  duration: 90,  delay: 0,    opacity: 0.85 },
  { width: 120, height: 50,  top: "18%", duration: 120, delay: 15,   opacity: 0.7  },
  { width: 220, height: 85,  top: "5%",  duration: 100, delay: 40,   opacity: 0.6  },
  { width: 160, height: 60,  top: "14%", duration: 110, delay: 60,   opacity: 0.65 },
];

const SOOT_CONFIGS = [
  { size: 10, left: "8%",  top: "82%", delay: 0   },
  { size: 8,  left: "85%", top: "78%", delay: 1.5 },
  { size: 12, left: "50%", top: "86%", delay: 3   },
  { size: 7,  left: "25%", top: "90%", delay: 0.8 },
];

const FIREFLY_CONFIGS = [
  { left: "15%", top: "65%", delay: 0,   dur: 4   },
  { left: "35%", top: "75%", delay: 1,   dur: 5.5 },
  { left: "80%", top: "70%", delay: 0.5, dur: 6   },
  { left: "45%", top: "80%", delay: 1.5, dur: 3.5 },
];

const KODAMA_CONFIGS = [
  { left: "12%",  delay: 0   },
  { left: "38%",  delay: 1.2 },
  { left: "65%",  delay: 0.6 },
  { left: "88%",  delay: 2   },
];

// ── SVG Assets ──
const CloudSVG = ({ width, height, opacity }: { width: number; height: number; opacity: number }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
    <path
      d={`M ${width * 0.15} ${height * 0.85} Q ${width * 0.05} ${height * 0.85} ${width * 0.05} ${height * 0.65} Q ${width * 0.05} ${height * 0.4} ${width * 0.2} ${height * 0.38} Q ${width * 0.18} ${height * 0.12} ${width * 0.38} ${height * 0.1} Q ${width * 0.52} ${0} ${width * 0.6} ${height * 0.15} Q ${width * 0.7} ${height * 0.02} ${width * 0.82} ${height * 0.12} Q ${width * 0.98} ${height * 0.14} ${width * 0.96} ${height * 0.38} Q ${width * 1.02} ${height * 0.42} ${width * 0.98} ${height * 0.65} Q ${width * 0.97} ${height * 0.85} ${width * 0.85} ${height * 0.85} Z`}
      fill="white" fillOpacity={opacity}
    />
  </svg>
);

const KodamaSVG = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 24 32" fill="none">
    <ellipse cx="12" cy="22" rx="8" ry="9" fill="rgba(255,255,255,0.85)" />
    <circle cx="12" cy="11" r="10" fill="rgba(255,255,255,0.9)" />
    <circle cx="9" cy="10" r="1.5" fill="rgba(40,40,40,0.5)" />
    <circle cx="15" cy="10" r="1.5" fill="rgba(40,40,40,0.5)" />
    <path d="M10 13.5 Q12 15 14 13.5" stroke="rgba(40,40,40,0.3)" strokeWidth="0.8" fill="none" />
  </svg>
);

const TotoroSilhouette = ({ opacity = 0.15 }: { opacity?: number }) => (
  <svg width="100" height="120" viewBox="0 0 60 70" fill="none">
    <ellipse cx="30" cy="48" rx="22" ry="20" fill={`rgba(0,0,0,${opacity})`} />
    <circle cx="30" cy="30" r="18" fill={`rgba(0,0,0,${opacity})`} />
    <ellipse cx="18" cy="14" rx="5" ry="9" fill={`rgba(0,0,0,${opacity})`} transform="rotate(-15 18 14)" />
    <ellipse cx="42" cy="14" rx="5" ry="9" fill={`rgba(0,0,0,${opacity})`} transform="rotate(15 42 14)" />
  </svg>
);

const BathhouseSilhouette = ({ opacity = 0.15 }: { opacity?: number }) => (
  <svg width="120" height="140" viewBox="0 0 60 70" fill={`rgba(0,0,0,${opacity})`}>
    <rect x="15" y="30" width="30" height="40" />
    <rect x="10" y="45" width="40" height="15" />
    <path d="M10 30 L30 15 L50 30 Z" />
    <rect x="25" y="10" width="10" height="15" />
  </svg>
);

const KikiSilhouette = ({ opacity = 0.2 }: { opacity?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    animate={{ x: ["110vw", "-20vw"], y: [0, -10, 5, -15, 0] }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    style={{ top: "15%" }}
  >
    <svg width="80" height="40" viewBox="0 0 80 40" fill={`rgba(0,0,0,${opacity})`}>
      <path d="M10 20 L70 20 Q75 20 75 15" stroke={`rgba(0,0,0,${opacity})`} strokeWidth="2" />
      <circle cx="35" cy="15" r="8" />
      <path d="M30 12 L32 5 M40 12 L38 5" stroke={`rgba(0,0,0,${opacity})`} strokeWidth="1.5" />
      <path d="M35 23 L32 35 L50 20" fill={`rgba(0,0,0,${opacity * 1.5})`} />
    </svg>
  </motion.div>
);

export const GhibliSky = ({ className = "" }: GhibliSkyProps) => {
  const { currentTheme } = useThemes();
  const [hour, setHour] = useState(new Date().getHours());
  
  const world = WORLD_STYLES[currentTheme.id] || WORLD_STYLES.default;
  const isNight = currentTheme.darkMode || hour >= 20 || hour < 5;

  useEffect(() => {
    const id = setInterval(() => setHour(new Date().getHours()), 60_000);
    return () => clearInterval(id);
  }, []);

  const skyGradient = useMemo(() => {
    let colors = world.skyDay;
    if (hour >= 5 && hour < 9) colors = world.skyMorning;
    else if (hour >= 17 && hour < 20) colors = world.skyEvening;
    else if (isNight) colors = world.skyNight;
    
    return `linear-gradient(to bottom, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
  }, [world, hour, isNight]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      {/* ── Sky Gradient ── */}
      <motion.div
        className="absolute inset-0 transition-colors duration-[2000ms]"
        style={{ 
          background: skyGradient,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      />

      {/* ── Stars ── */}
      {world.showStars && isNight && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`star-${i}`} className="absolute rounded-full bg-white"
              style={{ width: 1.5, height: 1.5, top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
        </div>
      )}

      {/* ── Clouds ── */}
      {world.showClouds && !isNight && (
        <div className="absolute inset-0">
          {CLOUD_CONFIGS.map((c, i) => (
            <motion.div
              key={`cloud-${i}`} className="absolute" style={{ top: c.top }}
              initial={{ x: "-200px" }} animate={{ x: "110vw" }}
              transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
            >
              <CloudSVG width={c.width} height={c.height} opacity={c.opacity} />
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Silhouettes ── */}
      {world.silhouette === "totoro" && (
        <div className="absolute bottom-[22%] right-[10%] opacity-20">
          <TotoroSilhouette />
        </div>
      )}
      {world.silhouette === "bathhouse" && (
        <div className="absolute bottom-[22%] left-[15%] opacity-15">
          <BathhouseSilhouette />
        </div>
      )}
      {world.silhouette === "broom" && <KikiSilhouette />}

      {/* ── Spirits ── */}
      <div className="absolute inset-0 pointer-events-none">
        {world.spirits.includes("kodama") && !isNight && KODAMA_CONFIGS.map((k, i) => (
          <motion.div
            key={`kodama-${i}`} className="absolute" style={{ left: k.left, bottom: "20%" }}
            animate={{ y: [0, -5, 0], rotate: [-2, 2, -2], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, delay: k.delay, repeat: Infinity }}
          >
            <KodamaSVG />
          </motion.div>
        ))}
        {world.spirits.includes("soot") && isNight && SOOT_CONFIGS.map((s, i) => (
          <motion.div
            key={`soot-${i}`} className="absolute" style={{ width: s.size, height: s.size, left: s.left, top: s.top }}
            animate={{ x: [0, 5, -5, 0], y: [0, -3, 3, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + i, delay: s.delay, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full bg-ghibli-navy/40 blur-[1px]" />
          </motion.div>
        ))}
        {world.spirits.includes("firefly") && isNight && FIREFLY_CONFIGS.map((f, i) => (
          <motion.div
            key={`firefly-${i}`} className="spirit-dot absolute" style={{ width: 5, height: 5, left: f.left, top: f.top }}
            animate={{ x: [0, 15, -10, 0], y: [0, -15, 10, 0], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* ── Hills ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[28%] pointer-events-none">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full fill-current transition-colors duration-1000">
          <path d="M0 200 L0 130 Q120 80 240 100 Q360 118 480 90 Q600 62 720 85 L1440 200 Z" fill={world.hillFar} />
          <path d="M0 200 L0 155 Q80 130 160 148 Q200 155 220 140 Q360 150 520 155 Q640 175 720 158 L1440 200 Z" fill={world.hillMid} />
          <path d="M0 200 L0 175 Q30 165 50 178 Q80 165 110 175 Q140 165 170 180 L1440 200 Z" fill={world.hillNear} opacity="0.9" />
        </svg>
      </div>

      {/* ── Sun / Moon ── */}
      <motion.div
        className="absolute top-[8%] right-[8%] w-14 h-14 rounded-full pointer-events-none transition-all duration-1000"
        style={{
          background: isNight ? "radial-gradient(circle, #FFFFF0, #D4D4B0)" : "radial-gradient(circle, #FFFDE4, #F8D078)",
          boxShadow: isNight ? "0 0 20px rgba(220,220,180,0.3)" : "0 0 30px rgba(248,208,120,0.4)"
        }}
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
};

export default GhibliSky;
