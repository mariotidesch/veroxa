# Memory index

- [framer-motion transition typing](framer-motion-ts.md) — standalone transition objects need `ease: "..." as const` or strict tsc fails; check typecheck after design-subagent passes.
- [Artifact slug alignment](artifact-slug-alignment.md) — copied Vite artifacts need package name and base path aligned with the registered slug before pnpm workflows can resolve them.
- [Gmail contact delivery](gmail-contact-delivery.md) — contact submissions use the server-side Gmail connector; keep the connector dependency in the API package, not workspace root.
- [Artifact cleanup](artifact-cleanup.md) — managed artifact workflows cannot be removed directly; stop the workflow, remove the artifact, and let workspace state prune it.
