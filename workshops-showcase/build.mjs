import { access } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "favicon.ico",
  "demos/a11y/index.html",
  "demos/mvc/index.html",
];

await Promise.all(requiredFiles.map((file) => access(file)));
console.log(`Showcase build verified: ${requiredFiles.length} files are present.`);
