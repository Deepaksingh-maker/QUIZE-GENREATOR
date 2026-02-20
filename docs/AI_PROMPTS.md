# AI Prompt Logic (Quiz Generation)

## Design goals
- Enforce strict JSON output.
- Ensure conceptual questions (not sentence copy).
- Support difficulty, question count, and topic focus.
- Support mixed types (MCQ, True/False, Fill Blank).

## Core prompt strategy
1. **Role setup:** “expert instructional designer”.
2. **Hard constraints:** format rules (4 options for MCQ), no markdown.
3. **Pedagogical constraints:** test understanding, require explanations.
4. **Input clipping:** first ~24k chars for token control.
5. **Schema validation:** backend validates response using Zod.

## Optimization tips
- Pass only relevant sections by topic to reduce token usage.
- Cache extracted text and topic summaries for repeated quiz generation.
- For very large documents, chunk by heading and summarize first, then generate quiz.
