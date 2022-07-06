import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        build: {
            outDir: mode === 'development' ? 'dist-dev' : 'dist',
        },
        server: {
            port: 10017,
        },
        plugins: [react()],
    });
};
