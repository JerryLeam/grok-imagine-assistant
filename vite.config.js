import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

// Vite + vite-plugin-monkey stitches the userscript metadata into the build output.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.jsx',
      userscript: {
        author: 'Huipp',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://grok.com/imagine/post/*'],
        // Tampermonkey storage powers the persisted retry slider value in the panel.
        grant: ['GM_getValue', 'GM_setValue'],
        downloadURL: 'https://github.com/JerryLeam/grok-imagine-assistant/raw/refs/heads/main/dist/grok-assistant.user.js',
        updateURL: 'https://github.com/JerryLeam/grok-imagine-assistant/raw/refs/heads/main/dist/grok-assistant.user.js',
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
  build: {
    minify: false,
  },
});
