---
name: framer-motion transition typing
description: TS error "ease: string not assignable to Easing" with framer-motion transition objects
---

Rule: when a framer-motion `transition` is declared as a standalone object (outside the JSX prop), named easings must be narrowed, e.g. `ease: "easeInOut" as const`, or tsc fails with `Type 'string' is not assignable to type 'Easing | Easing[]'`.

**Why:** TS widens `ease` to `string` in standalone object literals; inline props infer correctly.

**How to apply:** any workspace artifact with strict tsc typecheck + framer-motion; also affects design-subagent output, so check typecheck right after their passes.
