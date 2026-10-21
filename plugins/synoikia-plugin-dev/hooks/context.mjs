// SessionStart hook: adds this plugin's always-on rules (context.md) to the session, like a CLAUDE.md.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.env.CLAUDE_PLUGIN_ROOT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const additionalContext = readFileSync(path.join(root, 'context.md'), 'utf8');
console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext } }));
