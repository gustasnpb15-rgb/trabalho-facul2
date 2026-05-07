import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-static-and-inject',
      closeBundle() {
        const distDir = resolve(__dirname, 'dist');
        copyFileSync(resolve(__dirname, 'script.js'), resolve(distDir, 'script.js'));
        copyFileSync(resolve(__dirname, 'style.css'), resolve(distDir, 'style.css'));

        const indexPath = resolve(distDir, 'index.html');
        let html = readFileSync(indexPath, 'utf-8');
        html = html.replace(
          '</head>',
          '  <link rel="stylesheet" href="./style.css" />\n</head>'
        );
        writeFileSync(indexPath, html);
      },
    },
  ],
});
