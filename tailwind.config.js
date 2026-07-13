/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        atlas: '#2563EB',
        success: '#16A34A',
        danger: '#EF4444',
        surface: '#FAFAFB',
        card: '#FFFFFF',
        border: '#ECECEC',
        slate: '#6B7280',
        text: '#111111',
      },
      fontFamily: {
        sans: ['Inter-Regular', 'system-ui', 'sans-serif'],
        display: ['Inter-SemiBold', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '56px', fontWeight: '700' }],
        heading1: ['32px', { lineHeight: '40px', fontWeight: '600' }],
        heading2: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        title: ['20px', { lineHeight: '28px', fontWeight: '500' }],
        body1: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        body2: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        soft: '0px 16px 40px rgba(17, 17, 17, 0.08)',
        panel: '0px 8px 24px rgba(17, 17, 17, 0.08)',
      },
      spacing: {
        18: '72px',
        22: '88px',
      },
    },
  },
  plugins: [],
};
