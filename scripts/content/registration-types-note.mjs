export default {
  contentType: 'note',
  richTextFields: ['body'],
  fields: {
    title: 'Rigid, Affine, and Deformable Registration — What’s Actually Different',
    slug: 'rigid-affine-deformable-registration',
    category: 'Imaging',
    description:
      'Three ways to line up two medical scans, from simplest to most flexible — and why you almost always need more than one of them.',
    pubDate: '2026-07-16',
    body: `Image registration is the process of lining up two images of the same thing — say, an MRI taken before surgery and an ultrasound taken during it — so that a point in one image maps to the same physical point in the other. The word "registration" covers a spectrum of techniques, and the differences between them matter a lot more than the shared name suggests.

## Rigid registration

The simplest case: assume nothing about the anatomy changed, only the camera (or scanner) moved. Rigid registration allows just rotation and translation — you can slide and rotate one image until it lines up with the other, but you can't stretch, squash, or bend it. This works well when the thing you're imaging genuinely didn't deform between scans — bone, for instance, barely does.

## Affine registration

One step more flexible: adds scaling and shearing to rotation and translation. Now the image can stretch uniformly or skew slightly, on top of moving and rotating. Still a single, global transformation applied to the whole image at once — every pixel gets adjusted by the same rule. This handles mild, uniform differences (a slightly different zoom level between two scans) that rigid registration can't.

## Deformable registration

The big jump: instead of one global transformation, deformable registration allows different regions of the image to move differently from each other. One part of the image can shift left while another shifts right, stretches while its neighbor compresses. This is what you need when the actual anatomy changed shape between scans — which is exactly what happens in brain surgery, where removing tissue and draining fluid causes the brain to physically shift and settle differently than it sat in the preoperative scan.

## Why you almost always need more than one

In practice, you don't pick one of these and stop. You run rigid registration first — it's fast, stable, and gets you most of the way to aligned. Then you refine with something more flexible only where the simpler method isn't enough. Jumping straight to deformable registration without a rigid starting point is both slower and less reliable — deformable methods have far more parameters to solve for, and a bad starting alignment gives them too much freedom to find a plausible-looking but wrong answer.

## The trade you're always making

More flexibility means the transformation can fit more kinds of real anatomical change — and also means it can fit noise, artifacts, and coincidental similarity that isn't actually the same structure at all. Rigid registration can't be fooled into bending things that shouldn't bend, because it doesn't have the freedom to bend anything. Deformable registration has that freedom, which is exactly why it needs the most care, the most validation, and — as it turns out — its own estimate of where to trust the result and where not to.`,
  },
};
