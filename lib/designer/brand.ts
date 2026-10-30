/**
 * Design tokens pulled directly from the live Crafted site (app/globals.css
 * @theme block + Header.tsx hardcoded values) so /designer matches exactly.
 * See docs/DESIGNER_BUILD_PLAN.md §Brand audit for where each value came from.
 */
export const BRAND = {
  blue: '#2B7CC1',
  blueDark: '#1E5C96',
  blueLight: '#EBF4FF',
  headerBlue: '#1F5FAC', // distinct "deep blue" used only by Header/chat header bg
  dark: '#1A202C',
  textSecondary: '#4A5568',
  textMuted: '#6B7280',
  white: '#FFFFFF',
  offWhite: '#F7F8FA',
  lightGray: '#EEF0F4',
  border: 'rgba(0,0,0,0.08)',
  borderMed: 'rgba(0,0,0,0.14)',
  success: '#15803D',
  successBg: '#F0FDF4',
  error: '#B91C1C',
  errorBg: '#FDECEC',
  warning: '#B45309',
  warningBg: '#FFFBEB',
} as const;

export const FONT_DISPLAY = "var(--font-display), 'Montserrat', system-ui, sans-serif";
export const FONT_SANS = "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif";
