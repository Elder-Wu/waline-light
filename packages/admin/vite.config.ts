import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// @ts-ignore
import reiconify from 'vite-plugin-reiconify';

import { version } from './package.json';

export default defineConfig({
  define: {
    VERSION: JSON.stringify(version),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env.NODE_ENV': JSON.stringify('production'),
  },

  plugins: [
    react({ fastRefresh: false }),
    // eslint-disable-next-line
    reiconify(),
    cssInjectedByJsPlugin(),
  ],
  worker: {
    plugins: [react()],
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      formats: ['es'],
      fileName: 'admin',
    },
  },

  server: {
    port: 9010,
    proxy: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '/token': 'http://localhost:9090',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '/user': 'http://localhost:9090',
    },
  },
});
