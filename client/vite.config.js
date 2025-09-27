import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/Components',
    }
  },
  server: {
    proxy: {
      '^/(api|locales)': {
        target: 'http://0.0.0.0:3000',
      }
    }
  }
});
