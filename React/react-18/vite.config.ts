import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
    console.log('',mode, loadEnv(mode, process.cwd()).VITE_APP_TITLE);
    return defineConfig({
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                    old: resolve(__dirname, 'old.html'),
                },
            },
            outDir: mode === 'development' ? 'dist-dev' : 'dist',
        },
        server: {
            port: 10018,
        },
        plugins: [react({jsxRuntime: 'automatic',})],
    });
};
