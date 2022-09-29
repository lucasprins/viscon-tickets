/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      md: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.875rem'],
      display_xs: ['1.5rem', '2rem'],
      display_sm: ['1.875rem', '2.375rem'],
      display_md: ['2.25rem', '2.75rem'],
      display_lg: ['3rem', '3.75rem'],
      display_xl: ['3.75rem', '4.5rem'],
      display_2xl: ['4.5rem', '5.625rem']
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      primary: {
        25: '#F5FAFF',
        50: '#EFF8FF',
        100: '#D1E9FF',
        200: '#B2DDFF',
        300: '#84CAFF',
        400: '#53B1FD',
        500: '#2E90FA',
        600: '#1570EF',
        700: '#175CD3',
        800: '#1849A9',
        900: '#194185'
      },
      gray: {
        25: '#FCFCFD',
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#EAECF0',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1D2939',
        900: '#101828'
      },
      success: {
        25: '#F6FEF9',
        50: '#ECFDF3',
        100: '#D1FADF',
        200: '#A6F4C5',
        300: '#6CE9A6',
        400: '#32D583',
        500: '#12B76A',
        600: '#039855',
        700: '#027A48',
        800: '#05603A',
        900: '#054F31'
      },
      error: {
        25: '#FFFBFA',
        50: '#FEF3F2',
        100: '#FEE4E2',
        200: '#FECDCA',
        300: '#FDA29B',
        400: '#F97066',
        500: '#F04438',
        600: '#D92D20',
        700: '#B42318',
        800: '#912018',
        900: '#7A271A'
      }
    },
    extend: {},
  },
  plugins: [],
}