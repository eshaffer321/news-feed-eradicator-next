module.exports = {
  content: ['./src/options/**/*.{svelte,html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
