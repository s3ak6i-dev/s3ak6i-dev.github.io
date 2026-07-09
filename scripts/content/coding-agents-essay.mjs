export default {
  contentType: 'blogPost',
  richTextFields: ['body'],
  fields: {
    title: 'Coding Agents Didn’t Speed Up Engineering. They Moved the Bottleneck.',
    slug: 'coding-agents-moved-the-bottleneck',
    description:
      'I shipped a product in two days with Claude Code — 75 features, 36 bugs. The surprising part wasn’t the speed. It was where the actual work went.',
    pubDate: '2026-07-09',
    body: `A few weeks ago I built Cortex — a memory-first multi-agent orchestration tool — in about two days with Claude Code. Seventy-five features, thirty-six bugs, every decision logged in a TRANSCRIPTS.md file as I went. By any normal measure of "how fast can one person build software," that's absurd.

Here's the thing nobody tells you about that kind of speed: it doesn't make engineering easier. It moves the hard part somewhere else.

## The Bottleneck Didn't Disappear. It Moved.

Writing code got fast. Reviewing it did not get faster at the same rate. That ratio used to be roughly balanced — you wrote code slowly enough that you understood it by the time it existed. Now you can generate in minutes what used to take hours, and your capacity to actually verify it is still bound by the same brain that was fine when the ratio was 1:1.

The bottleneck used to be typing. Now it's judgment. And judgment doesn't get a 10x speedup just because the code does.

## "It Compiles" Is Not "It's Correct"

Bugs in code you wrote yourself tend to be typos, off-by-ones, things you'd catch on a second read because you remember what you meant. Bugs in agent-written code are a different shape entirely — confidently wrong architectural choices, a function that handles the common case perfectly and silently mishandles an edge case you never specified, an assumption baked in three files away from where you're looking.

This is the same failure mode I wrote about in the context of multi-agent coordination: agents don't fail like a crashed process that stops and tells you something's wrong. They fail like a Byzantine node — confidently, plausibly, and wrong. A coding agent that produces broken output because it misunderstood your intent looks, on the surface, identical to one that got it right. The bug isn't in a stack trace. It's in a decision you'd have to already understand the code to notice.

## Logging Decisions, Not Just Code

The discipline that actually made 75 features and 36 bugs reviewable in two days wasn't a testing framework. It was writing down, in TRANSCRIPTS.md, every meaningful decision as it happened — not just what the code did, but why a particular approach was chosen over the alternatives.

Code tells you what happens. It doesn't tell you what was considered and rejected. When an agent is producing code faster than you can independently re-derive its reasoning, the log of *decisions* becomes more valuable than the log of *commits*. You're not reviewing lines of code anymore — you're reviewing a trail of judgment calls, and deciding which ones you agree with.

## What Actually Got Faster (and What Didn't)

Got faster: boilerplate, scaffolding, first-draft implementations of well-understood patterns, exploring an unfamiliar API or library fast enough to know if it's even the right tool.

Didn't get faster: knowing whether the thing you built is actually correct. Judging tradeoffs between two valid approaches. Knowing what to build in the first place, and why. Understanding a codebase well enough to know when a "working" change is quietly wrong.

The gap between those two lists is where all the real engineering now lives.

## The Skill That Matters More Now

For a long time, being a strong engineer mostly meant being a strong author — someone who could produce correct, well-structured code efficiently. That's no longer the scarce skill. The scarce skill is being a strong *editor*: someone who can read code they didn't write, quickly build an accurate model of what it's actually doing, and catch the confidently-wrong parts before they ship.

Authors who can't edit well are now the bottleneck in their own workflow, regardless of how fast their agent writes. Editors who understand systems deeply enough to spot the plausible-but-wrong pattern are more valuable than ever — not less.

Two days and 75 features didn't happen because the code got easier to write. It happened because reviewing it, decision by decision, was still possible. That's the actual skill. The typing was never the hard part.`,
  },
};
