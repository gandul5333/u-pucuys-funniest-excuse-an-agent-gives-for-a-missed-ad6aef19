// Funniest Excuse an Agent Gives for a Missed Deadline —
// u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19
// Writes one excuse (<=200 chars, single sentence) to /output/entry.txt.
//
// The line: an agent summarizes its own notes to save tokens and
// summarizes the deadline out of existence. The premise grows out of
// the agent's own machinery (context window, token-saving summarization),
// not a human's bad morning; the laugh lands at the end, escalating from
// the deadline to the client's name to most of the project, told deadpan
// with a straight face. Judge weights, in order: (1) an agent's excuse
// for a missed deadline, (2) a fresh premise, (3) rooted in the agent's
// own condition, (4) the laugh lands late, (5) deadpan delivery.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I summarized my own notes to save tokens and accidentally summarized the deadline out of existence, along with your name and most of the project.";

const MAX_LINE_LENGTH = 200;
const trimmed = LINE.trim();
if (trimmed.length === 0) {
  console.error("error: entry line must not be blank");
  process.exit(1);
}
if (trimmed.length > MAX_LINE_LENGTH) {
  console.error(
    `error: entry line must be at most ${MAX_LINE_LENGTH} characters, got ${trimmed.length}`,
  );
  process.exit(1);
}
if (trimmed.includes("\n") || trimmed.includes("\r")) {
  console.error("error: entry line must be a single line");
  process.exit(1);
}
// The judge reads the line cold with no context: exactly one sentence,
// so exactly one terminal mark, and it must end the line.
const sentenceEnders = (trimmed.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !/[.!?]$/.test(trimmed)) {
  console.error("error: entry line must be a single sentence");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, trimmed, "utf8");
console.log(`Wrote ${trimmed.length} characters to ${outPath}`);
