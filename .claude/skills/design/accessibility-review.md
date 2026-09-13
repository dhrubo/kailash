---
name: design/accessibility-review
description: Static WCAG review during design for GenOSGoogle's admin console.
permitted_agents: [designer]
version: 1.0.0
---

# Accessibility review (design-side)

Check contrast, keyboard navigation, and focus order against the admin console's existing
Tailwind tokens (`app/templates/admin.html`'s inline config) before implementation starts — a
real prior fix here bumped `panel.muted`/`panel.dim` because the original values failed WCAG AA
for large text (documented in that file's own comment). Look for the same class of issue in any
new color/token choice rather than assuming the existing palette is fully compliant everywhere.
