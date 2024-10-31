import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				footer: {
					DEFAULT: 'hsl(var(--footer))',
					foreground: 'hsl(var(--footer-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 0.125rem)',
				sm: 'calc(var(--radius) - 0.25rem)'
			},
			screens: {
				'3xs': '16rem',
				'2xs': '24rem',
				xs: '32rem',
				sm: '40rem',
				md: '48rem',
				lg: '64rem',
				xl: '80rem',
				'2xl': '96rem',
				'3xl': '112rem',
			},
			boxShadow: {
				'right': '1px 0 5px rgba(0, 0, 0, 0.1)',
			},
			keyframes: {
				'pop-blob': {
					'0%': { transform: 'scale(1)' },
					'33%': { transform: 'scale(1.2)' },
					'66%': { transform: 'scale(0.8)' },
					'100%': { transform: 'scale(1)' },
				},
				'shine': {
					from: { backgroundPosition: '200% 0' },
					to: { backgroundPosition: '-200% 0' },
				},
				colors: {
					filter: {
						'blur-20': 'blur(1.25rem)',
						'blur-25': 'blur(1.5625rem)',
					},
				},
			},
			animation: {
				'pop-blob': 'pop-blob 5s infinite',
				"shine": "shine 8s ease-in-out infinite",
			},
		}
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
