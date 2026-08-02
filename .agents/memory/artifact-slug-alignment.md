---
name: Artifact slug alignment
description: Environment-specific constraint when promoting an existing Vite app into a newly registered artifact.
---

When an existing Vite app is copied into a newly registered artifact, keep the workspace package name and Vite base path aligned with the new artifact slug.

**Why:** The workflow selects the package through pnpm's workspace filter, while preview routing depends on the Vite base path; a copied scaffold can otherwise build under the wrong package or render at the wrong route.

**How to apply:** After registering a replacement artifact, verify `package.json` uses the new `@workspace/<slug>` name and `vite.config.ts` defaults to `/<slug>/` before restarting its workflow.