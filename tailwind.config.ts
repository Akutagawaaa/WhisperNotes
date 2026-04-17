
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
				// Ghibli-inspired color palette
				ghibli: {
					'sky':        '#A4C6E7',
					'sky-light':  '#D0E5F5',
					'sky-dawn':   '#F9D8C5',
					'sky-dusk':   '#E8A598',
					'sky-night':  '#0F2340',
					'beige':      '#F7EFE2',
					'parchment':  '#F2E8D5',
					'terracotta': '#D4A28B',
					'rose':       '#E6BAB7',
					'gold':       '#E6C17A',
					'amber':      '#F8D078',
					'forest':     '#8CAB93',
					'moss':       '#5A7A5E',
					'navy':       '#1F2937',
					'midnight':   '#0F1E33',
					'cream':      '#FEF9EF',
					'ink':        '#2C1810',
					'spirit':     '#E8F4F0',
				}
			},
			fontFamily: {
				'sans':    ['Inter', 'ui-sans-serif', 'system-ui'],
				'ghibli':  ['Caveat', 'cursive'],
				'heading': ['Noto Serif JP', 'Caveat', 'serif'],
				'hand':    ['Caveat', 'cursive'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'organic': '60% 40% 55% 45% / 45% 55% 45% 55%',
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
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%':      { transform: 'translateY(-12px)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%':      { transform: 'translateY(-8px) rotate(-1deg)' },
					'66%':      { transform: 'translateY(-4px) rotate(1deg)' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to:   { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-slow': {
					from: { opacity: '0' },
					to:   { opacity: '1' }
				},
				'paper-enter': {
					from: { opacity: '0', transform: 'translateY(20px) rotate(2deg)' },
					to:   { opacity: '1', transform: 'translateY(0) rotate(0)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%':      { transform: 'scale(1.04)' }
				},
				'shimmer': {
					'0%':   { backgroundPosition: '-40rem 0' },
					'100%': { backgroundPosition: '40rem 0' }
				},
				// Ghibli-specific animations
				'cloud-drift': {
					'0%':   { transform: 'translateX(-110%)' },
					'100%': { transform: 'translateX(110vw)' }
				},
				'cloud-drift-reverse': {
					'0%':   { transform: 'translateX(110vw)' },
					'100%': { transform: 'translateX(-110%)' }
				},
				'soot-drift': {
					'0%':   { transform: 'translate(0,0) scale(1)', opacity: '0.7' },
					'25%':  { transform: 'translate(6px,-4px) scale(1.05)', opacity: '0.9' },
					'50%':  { transform: 'translate(-4px,6px) scale(0.95)', opacity: '0.7' },
					'75%':  { transform: 'translate(4px,2px) scale(1.02)', opacity: '0.85' },
					'100%': { transform: 'translate(0,0) scale(1)', opacity: '0.7' }
				},
				'firefly': {
					'0%':   { transform: 'translate(0,0)', opacity: '0' },
					'20%':  { opacity: '0.9' },
					'50%':  { transform: 'translate(20px,-15px)', opacity: '0.6' },
					'80%':  { opacity: '0.8' },
					'100%': { transform: 'translate(-10px,10px)', opacity: '0' }
				},
				'kodama-bob': {
					'0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
					'40%':      { transform: 'translateY(-6px) rotate(3deg)' },
					'70%':      { transform: 'translateY(-3px) rotate(-1deg)' }
				},
				'leaf-spiral': {
					'0%':   { transform: 'translateY(-20px) rotate(0deg)',   opacity: '0' },
					'20%':  { opacity: '1' },
					'100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
				},
				'ink-draw': {
					from: { strokeDashoffset: '1000' },
					to:   { strokeDashoffset: '0' }
				},
				'ink-wipe-in': {
					'0%':   { clipPath: 'circle(0% at 50% 50%)', opacity: '0' },
					'100%': { clipPath: 'circle(150% at 50% 50%)', opacity: '1' }
				},
				'ink-wipe-out': {
					'0%':   { clipPath: 'circle(150% at 50% 50%)', opacity: '1' },
					'100%': { clipPath: 'circle(0% at 50% 50%)', opacity: '0' }
				},
				'spirit-appear': {
					'0%':   { transform: 'scale(0) translateY(8px)', opacity: '0' },
					'60%':  { transform: 'scale(1.1) translateY(-2px)' },
					'100%': { transform: 'scale(1) translateY(0)',     opacity: '1' }
				},
				'pen-write': {
					from: { width: '0%' },
					to:   { width: '100%' }
				},
				'totoro-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'40%':      { transform: 'translateY(-8px)' },
					'60%':      { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down':     'accordion-down 0.2s ease-out',
				'accordion-up':       'accordion-up 0.2s ease-out',
				'float':              'float 6s ease-in-out infinite',
				'float-slow':         'float-slow 9s ease-in-out infinite',
				'fade-in':            'fade-in 0.6s ease-out',
				'fade-in-slow':       'fade-in-slow 1.2s ease-out',
				'paper-enter':        'paper-enter 0.5s ease-out',
				'breathe':            'breathe 6s ease-in-out infinite',
				'shimmer':            'shimmer 2s infinite linear',
				'cloud-drift':        'cloud-drift linear infinite',
				'cloud-drift-reverse':'cloud-drift-reverse linear infinite',
				'soot-drift':         'soot-drift 5s ease-in-out infinite',
				'firefly':            'firefly 4s ease-in-out infinite',
				'kodama-bob':         'kodama-bob 4s ease-in-out infinite',
				'leaf-spiral':        'leaf-spiral 8s linear infinite',
				'ink-wipe-in':        'ink-wipe-in 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
				'ink-wipe-out':       'ink-wipe-out 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
				'spirit-appear':      'spirit-appear 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
				'totoro-bounce':      'totoro-bounce 2s ease-in-out infinite',
			},
			backgroundImage: {
				'ghibli-dawn':    'linear-gradient(to bottom, #F9D8C5 0%, #C9D9E8 40%, #A4C6E7 70%, #F7EFE2 100%)',
				'ghibli-day':     'linear-gradient(to bottom, #D0E5F5 0%, #A4C6E7 50%, #F7EFE2 100%)',
				'ghibli-dusk':    'linear-gradient(to bottom, #E8967A 0%, #C9A8C4 40%, #7A9EC8 70%, #F2E8D5 100%)',
				'ghibli-night':   'linear-gradient(to bottom, #0F2340 0%, #1A3A5C 50%, #0F1E33 100%)',
				'paper-texture':  'url("/paper-texture.png")',
				'night-gradient': 'linear-gradient(to bottom, #0F172A, #1E293B)',
			},
			boxShadow: {
				'soft':       '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
				'glow':       '0 0 15px rgba(248,208,120,0.35)',
				'glow-warm':  '0 0 25px rgba(230,193,122,0.4), 0 4px 12px rgba(0,0,0,0.08)',
				'card':       '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)',
				'ink':        '3px 4px 0 rgba(44,24,16,0.12)',
				'parchment':  '0 2px 8px rgba(180,140,80,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
				'spirit':     '0 0 20px rgba(164,198,231,0.5)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
