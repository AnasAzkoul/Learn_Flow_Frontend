---
name: LearnFlow
description: AI-powered course generation platform with warm, earthy design language
colors:
  ember: "#e8571a"
  ember-hover: "#d44e15"
  ember-subtle: "#e8571a0f"
  ember-border: "#e8571a24"
  warm-parchment: "#faf9f5"
  linen: "#f3f1eb"
  clean-surface: "#ffffff"
  espresso: "#1a1310"
  roasted-walnut: "#2a201a"
  dark-bark: "#3d3028"
  worn-leather: "#564538"
  driftwood: "#7a6b5d"
  sandstone: "#a99e92"
  clay-dust: "#c4bbb0"
  kiln-ash: "#ddd7cf"
  parchment-ink: "#f5f0ea"
  border-default: "#ddd7cf"
  border-hover: "#c4bbb0"
  border-light: "#ece8e1"
  moss: "#5a8a5e"
  goldenrod: "#c6890e"
  brick-red: "#c0392b"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, SF Mono, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  wrapper-inline: "60px"
  wrapper-max: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.ember}e6"
  button-generate:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.parchment-ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
  button-generate-hover:
    backgroundColor: "{colors.roasted-walnut}"
  button-secondary:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.md}"
    padding: "0 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    rounded: "{rounded.md}"
    padding: "0 16px"
  card-default:
    backgroundColor: "{colors.clean-surface}"
    rounded: "{rounded.md}"
    padding: "24px"
  input-default:
    backgroundColor: "{colors.warm-parchment}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  nav-bar:
    backgroundColor: "{colors.warm-parchment}cc"
    textColor: "{colors.espresso}"
    height: "64px"
---

# Design System: LearnFlow

## 1. Overview

**Creative North Star: "The Ember Curriculum"**

Knowledge as a glowing ember you tend and grow. LearnFlow's design system channels warmth that builds into something powerful: earthy tones ground the learner, the singular ember accent ignites action without shouting, and a serif-forward reading experience signals substance over spectacle. The system is lightly layered, quietly precise, and never generic.

This is not another SaaS landing page with gradient blobs and "powered by AI" badges. It is not a course marketplace drowning in discount banners and card grids. It is not sterile institutional e-learning. LearnFlow looks like it was built by people who care about learning, not people who care about looking like an AI startup.

**Key Characteristics:**
- Warm, tinted neutrals drawn from an espresso scale; never pure black or pure white
- A single ember accent used with restraint and purpose
- Serif body text for reading comfort; geometric sans display for authority; monospace labels for technical credibility
- Lightly layered surfaces with warm-tinted shadows
- Quietly precise interactions: every click feels deliberate and responsive
- Generous whitespace with varied rhythm, never monotonous padding

## 2. Colors: The Ember Palette

A restrained palette built on tinted neutrals with one deliberate accent. Every neutral is warm-shifted toward the espresso hue. The accent earns its presence through scarcity.

### Primary
- **Ember** (#e8571a): The singular accent. CTAs, active states, focus rings, and the occasional radial glow. Its warmth is the system's emotional signature.
- **Ember Hover** (#d44e15): Deepened for hover and pressed states. Never brighter, always darker.
- **Ember Subtle** (rgba(232, 87, 26, 0.06)): Background tint for ember-adjacent surfaces. Barely visible, structurally important.
- **Ember Border** (rgba(232, 87, 26, 0.14)): Thin accent borders on interactive elements in focus or hover states.

### Neutral
- **Warm Parchment** (#faf9f5): The primary background. Not white; warm enough to feel intentional, light enough to disappear.
- **Linen** (#f3f1eb): Secondary surfaces, muted backgrounds, card alternatives. The paper behind the paper.
- **Clean Surface** (#ffffff): Cards and elevated surfaces only. The brightest value in the system.
- **Kiln Ash** (#ddd7cf): Default borders and dividers. Warm enough to blend, dark enough to separate.
- **Border Light** (#ece8e1): Subtle internal borders within cards and elevated surfaces.
- **Clay Dust** (#c4bbb0): Hover-state borders. One step darker than Kiln Ash.

### Neutral (Espresso Scale)
The dark end of the palette. Used for dark sections, sidebar, and text hierarchy.

- **Espresso** (#1a1310): The deepest value. Primary text on light, backgrounds on dark sections. Never #000.
- **Roasted Walnut** (#2a201a): Dark section backgrounds, sidebar hover states.
- **Dark Bark** (#3d3028): Borders on dark surfaces.
- **Worn Leather** (#564538): Secondary text, de-emphasized content.
- **Driftwood** (#7a6b5d): Muted text, timestamps, metadata. The workhorse neutral.
- **Sandstone** (#a99e92): Secondary text on dark surfaces.
- **Parchment Ink** (#f5f0ea): Primary text on dark surfaces. Not #fff; tinted warm.

### Status
- **Moss** (#5a8a5e): Success. Muted, natural green.
- **Goldenrod** (#c6890e): Warning. Warm, not alarming.
- **Brick Red** (#c0392b): Error and destructive. Serious, not neon.

### Named Rules
**The Ember Scarcity Rule.** Ember appears on no more than 10% of any given screen. Its power comes from restraint. If you're reaching for ember on a third element, one of the first two is wrong.

**The No Pure Black Rule.** Every dark value is tinted toward the espresso hue. `#000` and `#fff` are forbidden. The warmest value is the truest value.

## 3. Typography

**Display Font:** Sora (with sans-serif fallback)
**Body Font:** Source Serif 4 (with Georgia, serif fallback)
**Label/Mono Font:** JetBrains Mono (with SF Mono, monospace fallback)

**Character:** A deliberate three-voice system. Sora's geometric precision commands attention on headlines. Source Serif 4 provides the reading comfort of a well-set book for body text. JetBrains Mono handles technical labels with uppercase letter-spacing that whispers "built by engineers." The contrast between serif warmth and geometric authority is the typographic signature.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5vw, 4rem), line-height 1.0, letter-spacing -0.035em): Hero headlines and section anchors. Sora. Tight tracking pulls the eye in.
- **Headline** (700, clamp(1.5rem, 3vw, 2.25rem), line-height 1.1, letter-spacing -0.025em): Section headings and feature titles. Sora.
- **Title** (700, 1.125rem, line-height 1.2, letter-spacing -0.025em): Card headings, subsection labels. Sora.
- **Body** (400, 1rem, line-height 1.7): Long-form content, descriptions, paragraphs. Source Serif 4. Max line length capped at 65-75ch.
- **Label** (500, 0.7rem, letter-spacing 0.08em, uppercase): Step indicators, metadata, technical annotations. JetBrains Mono. The `.mono-space` utility.

### Named Rules
**The Three Voices Rule.** Never use more than three typefaces on a single screen. Sora for authority, Source Serif 4 for comfort, JetBrains Mono for precision. If you're reaching for a fourth, one of the first three is doing too little.

## 4. Elevation

Lightly layered. Surfaces carry subtle warm-tinted shadows at rest, not as decoration but as spatial information. Depth is ambient, never dramatic. The shadow color is always derived from espresso (rgba(26, 19, 16, ...)), never pure black, so elevation feels like natural light falling across warm surfaces.

### Shadow Vocabulary
- **Ambient Low** (`0 1px 2px rgba(26, 19, 16, 0.04)`): Default card and surface elevation. Barely there. The shadow you feel more than see.
- **Ambient Medium** (`0 4px 12px rgba(26, 19, 16, 0.06)`): Popovers, dropdowns, and modals at rest. Clear separation without weight.
- **Ambient High** (`0 12px 32px rgba(26, 19, 16, 0.1)`): Elevated panels, monolith mockups. The maximum ambient depth.
- **Ember Glow** (`0 4px 16px rgba(232, 87, 26, 0.2)`): Accent shadow for primary CTAs on hover. The ember bleeds warmth into the surface below it.
- **Bar Shadow** (`0 8px 36px rgba(26, 19, 16, 0.22)`): The command-bar CTA. Heavier than ambient because it floats above everything.
- **Bar Focus** (`0 14px 48px rgba(26, 19, 16, 0.3), 0 0 0 2px rgba(232, 87, 26, 0.1)`): Command bar in focus state. Deeper shadow plus a faint ember ring.
- **Pill** (`0 6px 28px rgba(26, 19, 16, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.04)`): Floating pill elements. The inset highlight gives a subtle top-lit feel.
- **Inner Glow** (`inset 0 1px 0 rgba(255, 255, 255, 0.05)`): Subtle inner highlight on dark surface elements. Whisper of dimension.

### Named Rules
**The Warm Shadow Rule.** Every shadow uses espresso-derived RGBA, never `rgba(0,0,0,...)`. Shadows are warm light, not absence of light.

## 5. Components

### Buttons
Quietly precise. Every variant has a clear job; none competes for attention.

- **Shape:** Gently curved edges (12px radius), consistent across all variants.
- **Primary (Ember):** Solid ember background (#e8571a), white text. Height 36px (md), padding 0 16px. The only button that uses the accent color.
- **Hover / Focus:** Background darkens to 90% opacity on hover. Focus ring: 3px ember ring at 50% opacity. Transition: all 200ms ease-in.
- **Generate:** Espresso background (#1a1310), parchment text, 1px dark-bark border. On hover: walnut background, ember-tinted border at 40% opacity, ember glow shadow. The dark inverse of primary.
- **Secondary:** Linen background (#f3f1eb), espresso text. Hover darkens to 80%.
- **Ghost:** Transparent background, espresso text. Hover reveals linen background.
- **Link:** Ember text, underline on hover. No background.
- **Destructive:** Brick-red background (#c0392b), white text. Reserved for irreversible actions.
- **Sizes:** sm (32px), md (36px), lg (44px), xl (56px), pill (36px, fully rounded), icon variants.

### Cards / Containers
- **Corner Style:** Gently curved (12px radius).
- **Background:** Clean Surface (#ffffff) with 1px Border Light (#ece8e1) stroke.
- **Shadow Strategy:** Ambient Low at rest. No hover escalation by default.
- **Internal Padding:** Contextual, never uniform. Content dictates spacing.
- **The `.hearth-card` utility:** background + border + radius + ambient-low shadow in one class.

### Inputs / Fields
- **Style:** 1px kiln-ash border, warm-parchment background, 12px radius.
- **Focus:** Border shifts to ember ring, 3px ember ring at 50% opacity.
- **Error:** Ring shifts to brick-red at 20% opacity, border becomes brick-red.
- **Disabled:** 50% opacity, no pointer events.

### Navigation
- **Style:** Fixed position, warm-parchment background at 80% opacity with backdrop blur. 64px height.
- **Typography:** Body weight for links, label style for logo mark.
- **States:** Default espresso text; hover reveals linen background. Active state not visually distinct from hover.
- **Mobile:** Collapses to hamburger menu (not yet implemented).

### Signature: Command Bar CTA
The bottom-of-page CTA styled as a command input. Espresso background, parchment text, pulsing cursor, ember submit button. Bar shadow at rest, bar-focus shadow on interaction. This is LearnFlow's most distinctive interactive element: it says "type what you want to learn" without explaining itself.

### Signature: Pipeline Visualization
The five-step generation pipeline (Prompt, Triage, Outline, Approve, Generate) with animated progress bars, monospace step labels, and a pulsing ember dot. Technical and alive.

## 6. Do's and Don'ts

### Do:
- **Do** tint every neutral toward espresso. Even the lightest gray should feel warm when placed next to pure white.
- **Do** use the `.mono-space` utility for technical labels, step indicators, and metadata. Uppercase, 0.7rem, 0.08em tracking.
- **Do** use the `.display-text` utility for hero headlines. Sora, 700 weight, -0.035em tracking.
- **Do** vary spacing for rhythm. Sections breathe differently: generous gaps between major sections, tighter spacing within card groups.
- **Do** use warm-tinted shadows (espresso RGBA) for all elevation. Match the Warm Shadow Rule.
- **Do** cap body text at 65-75ch line length for reading comfort.
- **Do** use Source Serif 4 for any paragraph-length content. Serif is for reading; sans is for scanning.

### Don't:
- **Don't** use `#000` or `#fff` anywhere. Every value is tinted. This is non-negotiable.
- **Don't** use identical card grids (same-sized cards with icon + heading + text, repeated endlessly). Vary card content, size, or layout.
- **Don't** use gradient text (`background-clip: text` with gradients). Emphasis comes from weight or size, not color tricks.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px as colored accents). Rewrite with background tints, icons, or nothing.
- **Don't** build hero-metric templates (big number, small label, gradient accent). This is the SaaS cliche LearnFlow explicitly rejects.
- **Don't** use glassmorphism decoratively. The navbar's backdrop-blur is functional (readability over scrolled content), not aesthetic.
- **Don't** make it look like a generic course marketplace. No discount banners, no overwhelming card catalogs, no "browse 10,000 courses" energy. LearnFlow is curated and personal, as stated in PRODUCT.md.
- **Don't** make it look like a cookie-cutter AI startup. No gradient blobs, no "powered by AI" badges, no floating dashboard screenshots with fake data. If someone could guess "AI tool" from the aesthetic alone, it's failed.
- **Don't** use bounce or elastic easing. Ease-out with exponential curves only (quart/quint/expo). The HEARTH easing (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) is the system standard.
- **Don't** animate CSS layout properties. Use transforms and opacity.
- **Don't** use modals as a first thought. Exhaust inline and progressive alternatives first.
