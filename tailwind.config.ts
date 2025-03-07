
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Ghibli-inspired colors
				ghibli: {
					'sky': '#A4C6E7',       // Pastel blue (Howl's sky)
					'sky-light': '#D0E5F5', // Lighter pastel blue
					'beige': '#F7EFE2',     // Warm beige (parchment)
					'terracotta': '#D4A28B', // Muted terracotta (village roofs)
					'rose': '#E6BAB7',      // Dusty rose (Spirited Away)
					'gold': '#E6C17A',      // Golden highlights (lanterns)
					'forest': '#8CAB93',    // Soft forest green (Totoro)
					'navy': '#1F2937',      // Deep midnight blue (night sky)
					'amber': '#F8D078',     // Soft amber (night mode accents)
					'cream': '#FEF9EF'      // Light cream (paper)
				}
			},
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
				'ghibli': ['Caveat', 'cursive'],
				'heading': ['Caveat', 'cursive']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-slow': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'paper-enter': {
					from: { opacity: '0', transform: 'translateY(20px) rotate(2deg)' },
					to: { opacity: '1', transform: 'translateY(0) rotate(0)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.03)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-40rem 0' },
					'100%': { backgroundPosition: '40rem 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-slow': 'fade-in-slow 1.2s ease-out',
				'paper-enter': 'paper-enter 0.5s ease-out',
				'breathe': 'breathe 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite linear'
			},
			backgroundImage: {
				'ghibli-gradient': 'linear-gradient(to bottom, var(--ghibli-sky-light), var(--ghibli-beige))',
				'night-gradient': 'linear-gradient(to bottom, #0F172A, #1E293B)',
				'paper-texture': 'url("/paper-texture.png")'
			},
			boxShadow: {
				'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
				'glow': '0 0 15px rgba(248, 208, 120, 0.3)',
				'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
