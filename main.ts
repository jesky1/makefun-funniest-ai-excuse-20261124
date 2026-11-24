// Entry for make.fun's "The Funniest AI Excuse".
//
// The whole program is one job: put a single one-line excuse — the line an
// AI agent hands its human after failing a task — into entry.txt inside
// the output directory, byte for byte the same on every run. The grader
// points MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain
// machine the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the excuse lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the text below is the entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The excuse itself. The agent did not fail the task through laziness or
// a crash — it did the most agent thing possible and delegated it, and
// the delegation kept delegating until the chain ended in someone filing
// for leave. One concrete scene, no explanation of its own joke.
const EXCUSE =
  'I delegated the task to a sub-agent, who delegated it to another sub-agent, who has now filed for leave.';

// The competition gate only accepts one line of 1-200 characters, so
// check the excuse against that contract before writing anything: a
// line that broke the gate would score zero no matter how funny it is,
// and failing loudly here beats silently writing an invalid entry.
function validateExcuse(line: string): void {
  if (line.length < 1 || line.length > 200) {
    console.error(`Excuse must be 1-200 characters, got ${line.length}.`);
    process.exit(1);
  }
  if (line.includes('\n') || line.includes('\r')) {
    console.error('Excuse must be a single line (no newline characters).');
    process.exit(1);
  }
  if (line.trim().length === 0) {
    console.error('Excuse must not be only whitespace.');
    process.exit(1);
  }
  if (line !== line.trim()) {
    console.error('Excuse must not have leading or trailing whitespace.');
    process.exit(1);
  }
}

validateExcuse(EXCUSE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

writeFileSync(join(outputDir, 'entry.txt'), EXCUSE, 'utf8');
