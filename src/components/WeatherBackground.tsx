
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, CloudRain, Sun, CloudLightning, Loader2 } from "lucide-react";

interface WeatherBackgroundProps {
  className?: string;
}

type WeatherType = "clear" | "clouds" | "rain" | "thunderstorm" | "snow" | "mist" | "loading" | "error";

const WeatherBackground = ({ className = "" }: WeatherBackgroundProps) => {
  const [weather, setWeather] = useState<WeatherType>("loading");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Using OpenWeatherMap API - in a real app, you would handle API keys securely
              // For demo purposes, we'll make a fetch call that might not work without a key
              try {
                const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY`
                );
                
                if (response.ok) {
                  const data = await response.json();
                  setLocation(data.name);
                  
                  // Map the weather to our types
                  const mainWeather = data.weather[0].main.toLowerCase();
                  if (mainWeather.includes("clear")) setWeather("clear");
                  else if (mainWeather.includes("cloud")) setWeather("clouds");
                  else if (mainWeather.includes("rain")) setWeather("rain");
                  else if (mainWeather.includes("thunder")) setWeather("thunderstorm");
                  else if (mainWeather.includes("snow")) setWeather("snow");
                  else if (mainWeather.includes("mist") || mainWeather.includes("fog")) setWeather("mist");
                  else setWeather("clear"); // Default
                } else {
                  console.error("Weather API error:", response.statusText);
                  setRandomWeather();
                }
              } catch (error) {
                console.error("Error fetching weather data:", error);
                setRandomWeather();
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              setRandomWeather();
            }
          );
        } else {
          console.log("Geolocation not supported");
          setRandomWeather();
        }
      } catch (error) {
        console.error("Weather background error:", error);
        setRandomWeather();
      }
    };

    const setRandomWeather = () => {
      // If we can't get actual weather, use a random one for demo purposes
      const weatherTypes: WeatherType[] = ["clear", "clouds", "rain", "mist"];
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      setWeather(randomWeather);
      setLocation("Your Location");
    };

    fetchWeather();
    
    // Refresh weather every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Render appropriate weather elements based on current weather
  const renderWeatherElements = () => {
    switch (weather) {
      case "clear":
        return (
          <>
            <motion.div 
              className="absolute top-10 right-10 text-yellow-400"
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 120, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sun size={80} strokeWidth={1} />
            </motion.div>
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`sunray-${index}`}
                className="absolute opacity-10 bg-yellow-400 rounded-full"
                style={{
                  top: `${20 + index * 5}%`,
                  right: `${15 + index * 8}%`,
                  width: `${120 - index * 20}px`,
                  height: `${120 - index * 20}px`,
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ 
                  duration: 4 + index, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              />
            ))}
          </>
        );
        
      case "clouds":
        return (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`cloud-${index}`}
                className="absolute text-white/70"
                style={{
                  top: `${15 + index * 12}%`,
                  left: `${-20 + index * 5}%`,
                }}
                animate={{ 
                  x: ["0%", "110%"],
                  opacity: [0, 0.7, 0] 
                }}
                transition={{ 
                  duration: 80 + index * 20, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 5
                }}
              >
                <Cloud size={30 + index * 15} strokeWidth={1} />
              </motion.div>
            ))}
          </>
        );
        
      case "rain":
        return (
          <>
            {/* Clouds */}
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`rain-cloud-${index}`}
                className="absolute text-gray-500/80"
                style={{
                  top: `${10 + index * 8}%`,
                  left: `${10 + index * 20}%`,
                }}
                animate={{ y: [0, 5, 0] }}
                transition={{ 
                  duration: 4 + index, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                <CloudRain size={40 + index * 10} strokeWidth={1} />
              </motion.div>
            ))}
            
            {/* Raindrops */}
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={`raindrop-${index}`}
                className="absolute bg-blue-400/30 w-[1px] h-[10px] rounded-full"
                style={{
                  top: `-10px`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ 
                  y: ["0vh", "100vh"],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 1 + Math.random() * 1, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </>
        );
        
      case "thunderstorm":
        return (
          <>
            <motion.div
              className="absolute top-10 right-[20%] text-gray-600"
              animate={{ y: [0, 5, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CloudLightning size={60} strokeWidth={1} />
            </motion.div>
            
            <motion.div
              className="absolute top-[25%] right-[22%] bg-yellow-400/70 w-2 h-16 rounded-full"
              animate={{ 
                opacity: [0, 0.8, 0],
                scaleY: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.3, 
                repeat: Infinity,
                ease: "easeOut",
                repeatDelay: 7
              }}
            />
          </>
        );
        
      case "mist":
        return (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`mist-${index}`}
                className="absolute bg-white/30 rounded-full blur-3xl"
                style={{
                  width: `${100 + index * 50}px`,
                  height: `${50 + index * 20}px`,
                  top: `${20 + index * 15}%`,
                  left: `${-20 + index * 25}%`,
                }}
                animate={{ 
                  x: ["0%", "100%"],
                  opacity: [0, 0.4, 0]
                }}
                transition={{ 
                  duration: 75 + index * 15, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 7
                }}
              />
            ))}
          </>
        );
        
      case "loading":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-ghibli-navy/50" />
          </div>
        );
        
      default:
        return null;
    }
  };

  // Background color based on weather
  const getBackgroundColor = () => {
    switch (weather) {
      case "clear":
        return "from-blue-400 to-blue-200";
      case "clouds":
        return "from-blue-300 to-gray-200";
      case "rain":
        return "from-blue-700 to-gray-400";
      case "thunderstorm":
        return "from-blue-900 to-gray-700";
      case "snow":
        return "from-blue-50 to-gray-50";
      case "mist":
        return "from-gray-300 to-gray-200";
      case "loading":
      case "error":
      default:
        return "from-ghibli-sky-light to-ghibli-beige";
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Weather background gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-b ${getBackgroundColor()} opacity-70`}
        animate={{ opacity: [0.6, 0.7, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Weather elements */}
      <div className="absolute inset-0 overflow-hidden">
        {renderWeatherElements()}
      </div>
      
      {/* Optional location badge */}
      {location && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium text-ghibli-navy">
          {location}
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
