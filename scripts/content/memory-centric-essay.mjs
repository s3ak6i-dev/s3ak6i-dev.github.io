export default {
  contentType: 'blogPost',
  richTextFields: ['body'],
  fields: {
    title: 'Stop Building Agent-Centric Systems. Build Memory-Centric Ones.',
    slug: 'memory-centric-agent-systems',
    description:
      'Most multi-agent frameworks put the agents at the center and treat memory as an afterthought. Flip that, and a lot of your hardest coordination problems disappear.',
    pubDate: '2026-07-09',
    body: `Every multi-agent framework I've looked at draws the same diagram: agents in the middle, memory off to the side as a thing they occasionally check in with. An orchestrator dispatches tasks, agents do their thing, and somewhere a vector store or a scratchpad holds state that everyone reads from and writes to whenever they remember to.

That diagram is backwards. And building Cortex is what made me notice.

## The Default Pattern Is Backwards

Ask most people to sketch a multi-agent system and they'll draw arrows from an orchestrator to a set of workers, with memory as a dependency each worker happens to use. The center of gravity is the agents. Memory is plumbing.

The problem with this framing shows up the moment you have more than two or three agents running concurrently. Agent A writes something. Agent B was already mid-task with stale context. Agent C reads a half-updated state and produces output based on information that's already wrong. Nobody designed for this — it just falls out of treating memory as a side effect of agent activity instead of the thing the whole system is actually organized around.

## Flip the Center of Gravity

The alternative: put memory at the center, and treat agents as workers that read from and write to it. Not a stylistic choice — an architectural one. The shared memory pool isn't a dependency agents happen to use; it's the hub everything else orbits.

This sounds like a small reframe. It changes real decisions. Where does conflict detection live — in each agent, or in the memory layer itself? Where does access control live — per-agent logic, or scoped at the memory boundary (personal, shared, agent-private)? Where do you put observability — scattered agent logs, or a single stream of memory writes you can replay?

Once memory is the hub, all of those questions have one obvious answer instead of N inconsistent ones.

## What This Actually Buys You

**Agents become interchangeable.** If an agent's entire job is "read from memory, do work, write back to memory," you can swap its implementation — different model, different prompt, different framework entirely — without touching anything else in the system. The contract is the memory schema, not the agent's internals.

**Conflicts become visible instead of silent.** When two agents write contradictory information, a memory-centric system can catch that at the write boundary, before it propagates. An agent-centric system usually only finds out when a downstream agent produces something nonsensical and someone has to reconstruct what went wrong after the fact.

**Auditability comes for free.** Every meaningful state change in the system is a memory write. That's your audit log. You didn't have to build one — it was a side effect of the architecture.

## The Hard Part Nobody Mentions

Here's the thing the diagrams never show: making memory the hub means you now have to actually solve conflict detection, instead of hand-waving it as "the agents will figure it out."

Two agents write overlapping, slightly contradictory facts to the same memory scope. Now what? Comparing every new write against the entire existing memory pool with an LLM call is correct but absurdly expensive — you'd burn tokens checking things that are obviously fine 95% of the time. Skipping the check entirely means silent corruption.

The approach that's actually worked for me: a cheap embedding-similarity check first (near-instant, no LLM involved) to find candidate memories that might conflict, and only escalate to an LLM call for arbitration when something looks genuinely contradictory. Cheap filter, expensive judge — only when the filter says it's worth it. I go deeper on exactly how that two-stage check works in the companion note.

## The Point

Multi-agent systems don't fail because the agents are bad. They fail because nobody designed the memory layer on purpose — it got bolted on after the orchestration logic was already written, and by then the hard problems (conflicts, consistency, auditability) don't have a natural home.

Design the memory layer first. Decide what it means for two agents to disagree, and what happens when they do, before you write a single line of orchestration code. The agents are the easy part. They always were.`,
  },
};
