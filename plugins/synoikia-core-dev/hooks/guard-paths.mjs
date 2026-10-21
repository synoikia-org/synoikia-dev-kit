// PreToolUse hook: denies or asks before edits to the paths that the project lists in .claude/guard-paths.json.
// Each rule is { "match": "<regex on the repo-relative path>", "decision": "deny" | "ask", "reason": "..." }.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const { tool_input: toolInput = {}, cwd } = JSON.parse(input || '{}');
const file = toolInput.file_path ?? toolInput.notebook_path;
if (!file) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? cwd ?? process.cwd();
const config = path.join(root, '.claude', 'guard-paths.json');
if (!existsSync(config)) process.exit(0);

const decide = (permissionDecision, permissionDecisionReason) =>
  console.log(
    JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision, permissionDecisionReason } }),
  );

let rules;
try {
  rules = JSON.parse(readFileSync(config, 'utf8'));
  if (!Array.isArray(rules)) throw new Error('the file must hold an array of rules');
} catch (err) {
  // A broken guard list must not let every edit through.
  decide('ask', `.claude/guard-paths.json cannot be read (${err.message}), so no path is guarded.`);
  process.exit(0);
}

const rel = path.relative(root, path.resolve(root, file)).split(path.sep).join('/');
const rule = rules.find((r) => typeof r?.match === 'string' && new RegExp(r.match).test(rel));
if (!rule) process.exit(0);
decide(rule.decision === 'ask' ? 'ask' : 'deny', `${rel}: ${rule.reason ?? 'this path is guarded'}`);
