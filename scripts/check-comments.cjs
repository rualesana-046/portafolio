const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const checkedExtensions = new Set([".ts", ".tsx", ".mts", ".mjs", ".cjs", ".css", ".json"]);

function listProjectFiles() {
  return execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    cwd: root,
    encoding: "utf8",
  })
    .split("\n")
    .filter((file) => checkedExtensions.has(path.extname(file)));
}

function lineOf(text, position) {
  return text.slice(0, position).split("\n").length;
}

function findJsonIssues(file, text) {
  try {
    JSON.parse(text);
    return [];
  } catch (error) {
    return [`${file}: not strict JSON, possible comment (${error.message})`];
  }
}

function findCssIssues(file, text) {
  const withoutStrings = text.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, (match) =>
    " ".repeat(match.length),
  );
  return [...withoutStrings.matchAll(/\/\*/g)].map(
    (match) => `${file}:${lineOf(text, match.index)} block comment`,
  );
}

function scriptKindOf(extension) {
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".mjs" || extension === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function findScriptIssues(file, text) {
  const sourceFile = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKindOf(path.extname(file)),
  );
  const seen = new Set();
  const issues = [];

  const record = (ranges) => {
    for (const range of ranges ?? []) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      const snippet = text.slice(range.pos, range.end).slice(0, 60);
      issues.push(`${file}:${lineOf(text, range.pos)} ${snippet}`);
    }
  };

  const visit = (node) => {
    if (node.kind !== ts.SyntaxKind.JsxText) {
      record(ts.getLeadingCommentRanges(text, node.pos));
      record(ts.getTrailingCommentRanges(text, node.end));
    }
    node.getChildren(sourceFile).forEach(visit);
  };

  visit(sourceFile);
  return issues;
}

function findIssues(file) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  const extension = path.extname(file);
  if (extension === ".json") return findJsonIssues(file, text);
  if (extension === ".css") return findCssIssues(file, text);
  return findScriptIssues(file, text);
}

const files = listProjectFiles();
const issues = files.flatMap(findIssues);

if (issues.length > 0) {
  console.error(issues.join("\n"));
  console.error(`${issues.length} comment(s) found in ${files.length} files`);
  process.exit(1);
}

console.log(`No comments found in ${files.length} files`);
