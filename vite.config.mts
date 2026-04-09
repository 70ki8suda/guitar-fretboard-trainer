import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

function injectStylexCssLink() {
  return {
    name: "inject-stylex-css-link",
    async writeBundle(options: { dir?: string }) {
      const outDir = options.dir;

      if (!outDir) {
        return;
      }

      const htmlPath = path.join(outDir, "index.html");
      const assetsDir = path.join(outDir, "assets");

      let assetFiles: string[];

      try {
        assetFiles = await readdir(assetsDir);
      } catch {
        return;
      }

      const stylexCssFile = assetFiles.find((file) => file === "stylex.css");

      if (!stylexCssFile) {
        return;
      }

      const html = await readFile(htmlPath, "utf8");
      const href = `/assets/${stylexCssFile}`;

      if (html.includes(href)) {
        return;
      }

      const nextHtml = html.replace(
        "</head>",
        `    <link rel="stylesheet" href="${href}" />\n  </head>`,
      );

      await writeFile(htmlPath, nextHtml, "utf8");
    },
  };
}

export default defineConfig({
  plugins: [stylex.vite(), react(), injectStylexCssLink()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
