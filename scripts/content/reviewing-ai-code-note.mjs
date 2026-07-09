export default {
  contentType: 'note',
  richTextFields: ['body'],
  fields: {
    title: 'What to Actually Check When You Didn’t Write the Code',
    slug: 'reviewing-ai-written-code',
    category: 'Agents',
    description:
      'Reviewing AI-written code fails differently than reviewing your own — a short, practical checklist for the failure modes that actually matter.',
    pubDate: '2026-07-09',
    body: `Reviewing code an agent wrote is not the same task as reviewing code a teammate wrote, even though it looks identical on the screen. The failure modes are different, so the checklist has to be different too.

## Where it fails silently

Agent-written code rarely fails by being obviously broken — it usually fails by being plausible. A function that handles the common case perfectly and quietly mishandles an edge case that was never explicitly specified. An assumption baked in that made sense given the prompt, but not given the rest of the codebase the agent didn't fully see. Tests that pass because they were written to match the implementation, not written against the actual requirement.

None of these show up as a red squiggly line. All of them require you to already understand what the code is supposed to do before you can tell whether it does it.

## A short, practical checklist

**Is the assumption stated, or just implied?** If the code handles a specific case a particular way, can you point to where that decision was made explicit — or did it just happen to fall out of how the agent interpreted an ambiguous instruction?

**What happens at the edges?** Empty input, null, the maximum size, the very first or very last item in a loop. Agents are good at the happy path because the happy path is what most training data looks like. Edges are where the interesting bugs live.

**Does this match how the rest of the codebase does it?** Agents optimize for "a reasonable way to do this," not "the way this specific codebase already does it." A locally-correct pattern that's inconsistent with everything around it is a maintenance cost, even if it works today.

**Would this make sense to you in six months, without the context you have right now?** If understanding the code requires reconstructing the conversation that produced it, that context is going to evaporate. The code needs to be self-explanatory, not just explainable.

**Did you actually read it, or did you read the diff summary?** This is the one that matters most. Skimming a description of what changed is not the same as reading the change. The failure modes above are specifically the ones that a summary won't surface.

## The shift this requires

Reviewing your own code, you're checking your memory against reality. Reviewing agent-written code, you have no memory to check against — you're building an understanding of the code from scratch, at review time, every time. That's slower per line than reviewing your own work. It's also the only way the speed gains from writing code faster don't turn into a debt you pay later, with interest.`,
  },
};
