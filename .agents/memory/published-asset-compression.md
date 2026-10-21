---
name: Published asset compression
description: Live static asset compression behavior for the published Veroxa site.
---

The published `veroxa.it` host served JavaScript and CSS without a `Content-Encoding` header in the October 21, 2026 mobile performance check. The browser transferred the JavaScript at its full ~472 KB size even though Vite reports a much smaller gzip build size.

**Why:** Build output alone overstated the transfer savings visitors received; delivery compression is controlled by the published hosting path, not by Vite's gzip estimate.

**How to apply:** When assessing or changing site performance, check the published asset response headers and transfer size before assuming gzip or Brotli is enabled.
