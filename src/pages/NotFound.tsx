
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-ghibli-sky-light to-ghibli-beige flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="mb-8"
          >
            <div className="text-[120px] md:text-[150px] font-heading font-bold text-ghibli-gold opacity-80">
              404
            </div>
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-ghibli-navy mb-4">
            Page Not Found
          </h1>
          
          <p className="text-ghibli-navy/70 mb-8">
            Seems like you've wandered off into an unexplored part of our magical world. Let's guide you back to familiar territory.
          </p>
          
          <Link to="/">
            <Button className="btn-ghibli flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4c6e7' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5
          }}
        />
      </div>
    </PageTransition>
  );
};

export default NotFound;
