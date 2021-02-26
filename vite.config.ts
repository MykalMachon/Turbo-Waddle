import { defineConfig } from 'vite';
import preactRefresh from '@prefresh/vite';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '/@components/': join(__dirname, 'src/components/'),
      '/@utils/': join(__dirname, 'src/utils/'),
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  plugins: [preactRefresh()],
});
