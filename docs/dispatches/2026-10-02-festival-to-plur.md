# Festival to PLUR — 2026-10-02

Published the existing festival experience into skaists/plur-earth, replacing its holding page. Same full HTML on home, /festival/ and /surfaces/festival/, with local styles, 29 font/license assets, shared register and language controls and language corpus. Arbitrum reads remain external. Other estate applications remain skaists.dev links that open new tabs. No payment, DNS, certificate, wallet or contract change.

Source commit is in SOURCE.json. An explicit importer makes the navigation transformations reproducible. Validation: identical routes, every direct local asset and CSS font URL exists, all inline/shared scripts parse, external links carry target/rel, CNAME retained. No localhost server used.

Deployment boundary: Pages was already configured for main/root and plur.earth. DNS lookup returned 192.64.119.27 and custom-domain HTTPS timed out after 20 seconds. DNS was not changed: docs/dispatches/LANE_A_HUB_ATLAS_2026-08-28.md in the source estate reserves DNS pointing for founder hands. Repository publication can complete while custom-domain browser acceptance awaits correct DNS.

The seven screenshot artifacts in the genealogy checkout were not touched. Git Bash was invoked by absolute path because sh was not on this new checkout's command PATH; hook installer then ran.
