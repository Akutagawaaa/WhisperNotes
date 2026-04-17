import React, { useEffect, useState } from 'react';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, Fingerprint } from 'lucide-react';
import { Button } from './ui/button';

interface BiometricAuthProps {
  onAuthenticated: () => void;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({ onAuthenticated }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    checkBiometry();
  }, []);

  const checkBiometry = async () => {
    try {
      const result = await NativeBiometric.isAvailable();
      setIsSupported(result.isAvailable);
      if (result.isAvailable) {
        // Automatically attempt authentication on mount if supported
        handleAuth();
      }
    } catch (err) {
      console.error('Biometric check failed:', err);
      setIsSupported(false);
    }
  };

  const handleAuth = async () => {
    setIsAuthenticating(true);
    setError(null);
    
    try {
      await NativeBiometric.verifyIdentity({
        reason: "Unlock your Ghibli WhisperNotes",
        title: "Log in",
        subtitle: "Using your biometrics",
        description: "Verify your identity to keep your notes safe.",
      });
      
      await Haptics.impact({ style: ImpactStyle.Heavy });
      onAuthenticated();
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please try again.");
      await Haptics.notification({ type: NotificationType.Error });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-ghibli-midnight overflow-hidden">
      {/* Background Animated Spirits (Subtle) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-bounce duration-[4000ms]">
          <Eye className="w-12 h-12 text-blue-300" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-pulse duration-[3000ms]">
          <Fingerprint className="w-16 h-16 text-green-300" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md text-center space-y-8"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 animate-pulse">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ghibli-gold flex items-center justify-center shadow-lg"
          >
            <Lock className="w-4 h-4 text-ghibli-midnight" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-heading text-white">WhisperNotes Secure</h1>
          <p className="text-white/60 font-medium">Protecting your magical thoughts</p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-red-400 font-medium text-sm bg-red-400/10 py-2 px-4 rounded-full border border-red-400/20"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="pt-4">
          <Button 
            onClick={handleAuth}
            disabled={isAuthenticating}
            className="w-full h-14 bg-white text-ghibli-midnight hover:bg-white/90 rounded-2xl text-lg font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {isAuthenticating ? (
              <span className="animate-pulse">Verifying...</span>
            ) : (
              <>
                <Fingerprint className="w-6 h-6" />
                Unlock with Biometrics
              </>
            )}
          </Button>
          
          <button 
            onClick={() => onAuthenticated()} // Fallback just for dev/accessibility
            className="mt-6 text-white/40 text-sm underline hover:text-white/60 transition-colors"
          >
           Skip (Developer Fallback)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
