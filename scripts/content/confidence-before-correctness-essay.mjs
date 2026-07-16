export default {
  contentType: 'blogPost',
  richTextFields: ['body'],
  fields: {
    title: 'Ship the Confidence Estimate Before You Ship the Answer',
    slug: 'confidence-before-correctness',
    description:
      'A brain-surgery navigation system taught me this: knowing where you might be wrong is a bigger engineering win than being right everywhere else.',
    pubDate: '2026-07-16',
    body: `A paper I just published registers preoperative MRI against post-resection intraoperative ultrasound for brain tumor surgery — lining up a scan taken before the operation with one taken mid-surgery, after the surgeon has already removed tissue and the brain has physically shifted inside the skull. The alignment is never perfect everywhere. Some regions register cleanly. Others — near the resection cavity, where the anatomy actually changed — are inherently less trustworthy no matter how good your algorithm is.

The instinct when you build something like this is to chase a single number: overall registration accuracy, averaged across the whole image. We did that first too. It's the wrong number to optimize alone.

## The Instinct Is to Optimize the Average

Averages hide exactly the information a surgeon needs. A registration that's 95% accurate everywhere except catastrophically wrong in the one region near the tumor margin is a worse system than one that's 85% accurate everywhere but tells you clearly where that 85% doesn't hold. The surgeon doesn't need "good on average." They need to know, region by region, where they can trust the overlay and where they should rely on their own judgment instead.

So alongside the registration itself, the system estimates error — flagging where alignment confidence is high and where it's degraded. That single addition changes what the tool actually is. It stops being "here's an answer" and becomes "here's an answer, and here's how much to trust each part of it."

## What Error Estimation Actually Buys You

This sounds like a small addition. It changes the entire risk profile of the system. Without it, a wrong answer looks identical to a right one — same overlay, same visual confidence, no signal that anything is off. With it, the system can be wrong in a specific region and still be useful, because it tells you where not to trust it. The failure mode shifts from "silently misleading" to "explicitly uncertain," and those are not the same category of problem at all.

I've written before about the same shape of idea in a completely different context — multi-agent systems flagging contradictory memories with a cheap similarity check before escalating to an expensive LLM call for arbitration. Same principle here, different domain: don't just produce an answer, produce a signal for how much to trust each part of it, and make that signal cheap enough to compute that you can afford to attach it everywhere.

## The Same Idea, Different Domain

Once you start looking for it, "ship confidence alongside the answer" shows up everywhere serious systems get built. A fraud model that scores a transaction 0.6 is more useful than one that just says "approve," because a human reviewer knows where to spend attention. A coding agent that flags "I'm not sure this handles the edge case with empty input" is more useful than one that silently ships code with the same bug, indistinguishable from correct code until it fails in production. A registration system that says "trust this region, question that one" is more useful than one that reports a single accuracy number and calls it done.

The pattern generalizes: whatever your system produces, ask whether it can also produce a calibrated signal for how much to trust each part of that output. If it can't, that's usually not because the problem is impossible — it's because nobody built the estimator, and it got treated as optional polish instead of core functionality.

## Why This Is Harder Than It Sounds

The hard part isn't computing *some* number and calling it confidence. It's making that number actually calibrated — a system that reports high confidence exactly where it tends to be wrong is worse than no confidence estimate at all, because now people trust a signal that's actively misleading them. An overconfident wrong answer is a more dangerous failure than an uncertain one, in surgery and in software both. Building an honest estimator, one that's actually correlated with where the underlying answer breaks down, is real work — usually harder than building the primary system it's attached to.

## The Point

Most systems ship the answer and treat "how much should you trust this" as an afterthought, if it gets built at all. The better systems ship both from day one, because the two aren't actually separable — an answer without a trust signal is a claim you're asking someone to take on faith. Whether that someone is a surgeon deciding where to cut or an engineer deciding whether to merge a PR, faith is not the thing you want to be shipping.`,
  },
};
