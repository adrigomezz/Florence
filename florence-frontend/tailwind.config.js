/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#004AAD',     // Azul profesional
        secondary: '#00C4CC',   // Turquesa sanitaria
        neutral: '#F9FAFB',     // Fondo claro
        dark: '#1E2A38',        // Texto oscuro
        muted: '#6B7280',       // Texto sutil (gris)
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'deep': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
