---
name: Artifact cleanup
description: Procedure for removing a duplicate registered artifact and its managed workflow.
---

Managed workflows owned by an artifact reject direct workflow removal. The reliable cleanup sequence is to stop the managed workflow, remove the artifact itself, and refresh workflow state so the platform prunes the associated workflow.

**Why:** Removing only source files can leave a registered preview or workflow behind, while removing the artifact is what clears the workspace-level registration.

**How to apply:** Confirm the replacement artifact first, stop the duplicate service, remove the duplicate artifact, then verify the artifact registry, workflow list, and remaining app build.