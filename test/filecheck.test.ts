import { existsSync, readdirSync, readFileSync } from "fs";
import { dirname, join, relative, extname, basename } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcDir = join(root, "src");
const testDir = join(root, "test");

// Read exclusions list
let excluded: string[] = [];
const excludesPath = join(root, ".filecheck-excludes.json");
if (existsSync(excludesPath)) {
  excluded = JSON.parse(readFileSync(excludesPath, "utf-8")) as string[];
}

function collectSourceFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectSourceFiles(fullPath));
    } else {
      const ext = extname(entry.name);
      if (ext === ".ts" || ext === ".tsx") {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function expectedTestPath(srcFile: string): string {
  const rel = relative(srcDir, srcFile);
  const ext = extname(srcFile);
  const withoutExt = rel.slice(0, rel.length - ext.length);
  const testFileName = basename(withoutExt) + ".test" + ext;
  const testSubDir = dirname(withoutExt);
  return join(testDir, testSubDir, testFileName);
}

const srcFiles = collectSourceFiles(srcDir).filter((f) => {
  const rel = relative(root, f).replace(/\\/g, "/");
  return !excluded.includes(rel);
});

const missingTests = srcFiles.filter((f) => !existsSync(expectedTestPath(f)));

describe("Test coverage – every src file has a mirrored test file", () => {
  it("all source files have corresponding test files", () => {
    if (missingTests.length > 0) {
      const list = missingTests.map((f) => "  " + relative(root, f).replace(/\\/g, "/")).join("\n");
      expect.fail(
        `The following source files have no matching test file:\n${list}\n\n` +
          `Add tests or exclude them in .filecheck-excludes.json`,
      );
    }
  });
});
