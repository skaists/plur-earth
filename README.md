# PLUR festival publication

The PLUR homepage now contains the festival attendee experience imported from the estate, with the same three views, day-pass beads, animation controls, economy board and application doors.

Routes: `/`, `/festival/`, `/surfaces/festival/`. Shared CSS, fonts (with their licenses), language corpus and view controls are hosted in this repository. Other estate application links open skaists.dev in a new tab; they are not represented as newly deployed PLUR applications. Public Arbitrum RPC requests remain external and can fail independently.

Source commit and original path are in SOURCE.json. To refresh from a reviewed checkout:

    node scripts/import-festival.mjs C:/path/to/beehive-nature
    node scripts/check-festival.mjs

GitHub Pages publishes main at repository root. CNAME remains plur.earth. DNS must point at GitHub Pages before the custom-domain HTTPS edition can be verified; this import does not change DNS or certificate settings.
