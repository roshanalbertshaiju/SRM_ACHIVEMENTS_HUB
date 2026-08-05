# Project Guidelines & Behavioral Instructions

## UI/UX review lens — behavioral grounding

When proposing or implementing any UI change (new component, layout, copy, or a fix to an existing one), don't default to aesthetic judgment alone ("this looks cleaner," "this feels more modern"). Ground the decision in how people actually perceive and act, and name the mechanism in your explanation. Use whichever of these actually applies — don't force all of them onto every change:

- **Von Restorff / isolation effect** — the one element that looks visually different is the one people notice. There should be exactly one primary action per screen that's visually isolated from everything else (color, size, or position) — not multiple competing CTAs with similar weight.
- **Hick's Law** — decision time grows with the number of options. Prefer 3-5 top-level nav/choice items over 6+; move low-frequency actions into a secondary menu instead of flattening everything.
- **Fitts's Law** — tap/click targets need to be large enough (~44px minimum) and close to where the user's hand/cursor already is, especially for primary mobile actions. Check thumb-zone placement on mobile layouts.
- **Zeigarnik effect / goal-gradient** — incomplete tasks and visible progress (e.g. "3/4 missions," "420 XP to next rank") pull people back to finish. Lean on this for streaks, missions, and level progress — make partial progress visible, not just the end state.
- **Serial position effect** — first and last items in any list get remembered most. When something is "pinned" or featured, have an explicit, labeled reason for why (e.g. highest XP, faculty-flagged) rather than defaulting to most-recent.
- **Cognitive fluency** — specific, checkable claims ("Faculty Verified," a real DOI, a GitHub link) read as more trustworthy than vague ones. Keep verification/proof elements specific and never let unverified content look visually identical to verified content.
- **Loading/error/empty states** — every async action needs an explicit state, not just a happy path. Errors should say what happened and what to do next, at the point of failure — not a generic toast.

If a request would use one of these mechanisms to create fake urgency, hide information, or make an unwanted action (e.g. canceling, opting out) harder to find than the wanted one, flag that instead of implementing it — persuasion is fine when it's true, not when it's manipulative.

When explaining a UI decision back to the user, include a one-line "because" tied to one of these mechanisms where it applies. If a choice is really just a style preference, say so plainly rather than dressing it up in psychology language it doesn't need.
