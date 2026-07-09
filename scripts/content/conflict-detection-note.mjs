export default {
  contentType: 'note',
  richTextFields: ['body'],
  fields: {
    title: 'Conflict Detection in Shared-Memory Agent Systems',
    slug: 'conflict-detection-shared-memory',
    category: 'Agents',
    description:
      'Two cheap checks before you pay for an LLM call — how to flag contradictory agent memories without burning tokens on every write.',
    pubDate: '2026-07-09',
    body: `If multiple agents write to a shared memory pool, eventually two of them will write something that contradicts each other. The question isn't whether this happens — it's how you catch it without making every single write expensive.

## The naive approaches, and why they fail

**Check nothing.** Fast, but contradictions silently corrupt downstream reasoning. An agent reads two conflicting "facts" and produces output based on whichever one it happened to weight more.

**Check everything with an LLM.** Correct, but you're now making an LLM call on every single memory write, comparing it against everything already stored. Most writes aren't contradictory. You're paying full price for a check that returns "no conflict" 95% of the time.

## The two-stage approach

**Stage one: embedding similarity, no LLM involved.** When a new memory gets written, embed it and compare against existing memories in the same scope using cosine similarity. This is near-instant and nearly free. Most writes either don't overlap with anything (low similarity, no further check needed) or are clearly restating something already known (high similarity, no conflict). Only a narrow middle band — similar enough to be about the same thing, not similar enough to obviously agree — needs a closer look.

**Stage two: LLM arbitration, only when stage one flags something.** For that narrow middle band, an LLM call actually reads both memories and decides: do these agree, contradict, or one supersede the other? This is the expensive step, but it's now only running on the small fraction of writes that stage one couldn't resolve cheaply.

## What happens after a conflict is flagged

Detecting a conflict isn't the same as resolving it automatically — that's a decision worth surfacing, not hiding. Three options, presented as a choice rather than an automatic resolution: **keep** the existing memory and discard the new write, **merge** them into a single reconciled memory, or **dismiss** the flag if it's actually not a real conflict (the similarity check has false positives — two memories can be topically similar without being contradictory).

## Why this shape works

The pattern generalizes past agent memory: cheap filter first, expensive judge second, human-in-the-loop for the ambiguous cases the judge can't call alone. It's the same shape as spam filtering, fraud detection, or any system where the cost of checking everything thoroughly is higher than the cost of most things being fine. Don't reach for the expensive tool until the cheap one tells you it's actually needed.`,
  },
};
