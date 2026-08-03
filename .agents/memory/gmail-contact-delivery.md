---
name: Gmail contact delivery
description: Durable setup rule for the Veroxa contact form and Gmail connector.
---

The contact form sends through the API server using the Replit Gmail connector, rather than opening a user's mail client. The connector SDK must be declared in the API server package because workspace-root installation is rejected by the monorepo package guard.

**Why:** The integration requires server-side OAuth access and must not expose Gmail credentials or depend on the visitor having a configured mail application.

**How to apply:** Keep the recipient address centralized in the API route, validate form input server-side, and test invalid input without sending a real message. Re-run both API and frontend checks after connector changes.