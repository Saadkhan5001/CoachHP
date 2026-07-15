type ClassicMobileTransitionStageProps = {
  id: string;
  outgoingVisual: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/**
 * Mobile-only "pinned terminal visual" stage. Wraps the REAL incoming
 * section (`children`) together with a decorative, non-interactive
 * "final frame" of the outgoing section (`outgoingVisual`) so both live
 * inside the exact same, unclipped containing block:
 *
 *   <ClassicMobileTransitionStage id="..." outgoingVisual={<Terminal />}>
 *     <section id="faq">...real incoming content...</section>
 *   </ClassicMobileTransitionStage>
 *
 * Why this shape, specifically:
 *
 * 1. CONFIRMED ROOT CAUSE of the previous version's broken/inconsistent
 *    pin: it nested the sticky pin *inside* the real outgoing section
 *    (`#pricing`), which has `overflow: hidden` (needed to contain its own
 *    absolutely-positioned background image). An `overflow: hidden`
 *    ancestor silently breaks `position: sticky`'s actual stuck behavior —
 *    confirmed by direct measurement: the pin's `getBoundingClientRect().top`
 *    moved in perfect 1:1 lockstep with `scrollY` (i.e. behaved exactly
 *    like `position: static`) despite `getComputedStyle().position`
 *    still reporting `"sticky"` as a CSS *value*. The computed-style check
 *    alone is not proof of correct behavior — only a live scroll sweep of
 *    the pin's own bounding rect is. (About's pin, whose section has no
 *    clipping ancestor, measurably DID stick correctly — isolating this
 *    as the exact variable.) This component's pin is therefore never
 *    nested inside a clipped section — it lives at the top level of the
 *    page, a sibling of the outgoing section, not a descendant of it.
 *
 * 2. The real incoming section is a *sibling of the pin*, both direct
 *    children of this wrapper, rather than living outside the stage and
 *    being pulled up with a guessed negative margin. The pin's own
 *    natural `100svh` flow height is what positions the incoming section
 *    at the viewport bottom when the stage is reached — no negative
 *    margin, no hand-tuned overlap distance to get wrong.
 *
 * 3. `data-rise` lives on THIS wrapper, not on the incoming section
 *    inside it. Motion.tsx's desktop logic finds each panel's outgoing
 *    animation target via `incoming.previousElementSibling` — since the
 *    wrapper (not the section) is now `incoming.previousElementSibling`'s
 *    target, and the wrapper's own DOM position is exactly where the
 *    section used to be, desktop targeting is unaffected. On desktop the
 *    pin is `display: none` (see classic.css) and the wrapper adds no
 *    layout of its own, so its rendered box is the incoming section's box
 *    — GSAP's ScrollTrigger geometry stays effectively identical to
 *    before this change.
 */
export function ClassicMobileTransitionStage({ id, outgoingVisual, children, className = "" }: ClassicMobileTransitionStageProps) {
  return (
    <div id={id} data-rise className={`classic-mobile-transition-stage ${className}`}>
      <div className="classic-mobile-transition-pin" aria-hidden="true" inert>
        {outgoingVisual}
      </div>
      {children}
    </div>
  );
}
