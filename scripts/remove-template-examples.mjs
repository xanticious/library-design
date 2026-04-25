#!/usr/bin/env node
// Removes the hello world example files from the template, leaving the
// project scaffolding intact so the app still compiles.

import { existsSync, readdirSync, rmSync, rmdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const filesToDelete = [
  "src/components/Counter.tsx",
  "src/components/Counter.module.css",
  "src/components/FontExamples.tsx",
  "src/components/FontExamples.module.css",
  "src/components/PixiExample.tsx",
  "src/components/PixiExample.module.css",
  "src/machines/counterMachine.ts",
];

const APP_STUB = `export default function App() {
  return (
    <main>
      <h1>Hello</h1>
    </main>
  );
}
`;

let removed = 0;

for (const rel of filesToDelete) {
  const full = join(root, rel);
  if (existsSync(full)) {
    rmSync(full);
    console.log(`  removed  ${rel}`);
    removed++;
  }
}

// Remove the machines directory if it is now empty
const machinesDir = join(root, "src/machines");
if (existsSync(machinesDir) && readdirSync(machinesDir).length === 0) {
  rmdirSync(machinesDir);
  console.log(`  removed  src/machines/`);
}

// Replace App.tsx with a minimal compilable stub
writeFileSync(join(root, "src/App.tsx"), APP_STUB, "utf-8");
console.log(`  reset    src/App.tsx`);

// Clear App.module.css
writeFileSync(join(root, "src/App.module.css"), "", "utf-8");
console.log(`  cleared  src/App.module.css`);

if (removed === 0) {
  console.log("Nothing to remove — template examples were already cleaned up.");
} else {
  console.log("\nDone. The project still compiles; start building your app in src/App.tsx.");
}
