# Site Structure & Global Elements
Source: https://kailash-shivanandam.com/ (all 8 pages scraped; see individual page files for per-page content)

Platform detected: **WordPress** (Astra theme + Astra Child theme), Contact Form 7, Bootstrap 5.3.2, Bootstrap Icons, Swiper, Slick carousel, Fancybox 3.5.7 (lightbox), mmenu (mobile nav), Material Design Iconic Font.

## Header (identical on every page)
Structure (top to bottom):
1. **Logo** (`logo.png`) + wordmark: "Kailash" with tagline "A Philanthropic Organization"
2. Sub-line: "Founded by Swami Shivananda Giri Maharaj"
3. **Primary nav** (also duplicated in a slide-out mobile menu, `#menu`, via mmenu.js):
   - Home → `/`
   - About Us → `/about-kailash/`
   - Maharaj → `/about-maharaja/`
   - Anandam (London) → `/anandam-london/`
   - Publications → `/publications/`
   - Activities → `/activities/`
   - Gallery → `/gallery/`
   - Contact → `/contact-us/`
   - **Donate Now** (CTA button, visually distinct) → `/donation/` (note: this page was not in the scrape list but is linked from every page's nav — flag for the dev to confirm whether it needs to be built)
4. A small top-bar contact strip also appears in the mobile/expanded menu markup with:
   - Email: kailashssgm@gmail.com (`mailto:%20kailashssgm@gmail.com` — note the encoded leading space in the mailto, likely an authoring typo to clean up)
   - Phone: 90075 27687 (`tel:9007527687`)
   - Phone: 84201 90532 (`tel:8420190532`)
   - Social icons: Facebook (https://www.facebook.com/kailash.anandam), YouTube (https://www.youtube.com/@shivanandam6393), plus two icon links that point to `#` (LinkedIn and Instagram icons are present visually — `linkedin.svg`, `insta.svg` — but not wired to real URLs; treat as placeholders/dead links)

## Footer (identical on every page)
Structure:
1. **Kailash** brand block: "Founded by Swami Shivananda Giri Maharaj"
2. Mission blurb: "Since 1978, we've been transforming lives through care and education. Help us continue this journey."
3. **Donate Now** button (CTA) → `/donation/`
4. "Contact Us" heading, with:
   - Registered Office: 21/2 Beadon Street, Kolkata – 700 006, West Bengal, India
   - Email: kailashssgm@gmail.com
   - Phones: 90075 27687 / 84201 90532
5. "Follow Us on" — social icon row (same Facebook/YouTube links + LinkedIn/Instagram placeholders as header)
6. "Quick Links" column — repeats the main nav plus an extra item not in the header:
   - Home, About Us, Maharaj, Anandam (London), Activities, Publications, Gallery, **News And Update** (→ `/news-and-update/` — a section referenced from the homepage "Read More" links but not in the 8 scraped pages; flag for dev), Contact
7. Legal/registration block:
   - Regn No: SO/022788 of 1978-79 under W.B. Society Registration Act XXVI of 1961
   - CSR Registration number: CSR00103130
   - "Donations are exempted from Income Tax u/s 80G (5)(vi) of the I.T.Act 1961"
8. Copyright line: "© 2026 Kailash" | "Developed by Pixel Solutionz." (→ https://www.pixelsolutionz.com/ — this is the original site builder's credit link; the new Eleventy site should decide whether to keep/replace this)
9. A "Scroll to Top" button (appears twice in markup — likely one for desktop, one for mobile).

## Contact details (canonical, consolidated from footer + Contact page)
- Organization: Kailash
- Contact person: Sri Arpan Banerjee, Secretary
- Registered Office: 21/2 Beadon Street, Kolkata – 700 006, West Bengal, India
- Phones: +91 90075 27687 (also shown as 90075 27687), +91 84201 90532 (also shown as 84201 90532), and a third form "+91 9007527678" appears specifically beside "Sri Arpan Banerjee / Secretary" on the Contact page — **note the digit discrepancy (27687 vs 27678) between the footer/nav phone and the one on the Contact page; flag this for the client to confirm the correct number**
- Email: kailashssgm@gmail.com
- Registration Number: SO/022788 of 1978-79 under W.B. Society Registration Act XXVI of 1961
- CSR Registration Number: CSR00103130
- Tax note: Donations exempted from Income Tax u/s 80G (5)(vi) of the I.T. Act 1961
- Social: Facebook (https://www.facebook.com/kailash.anandam), YouTube (https://www.youtube.com/@shivanandam6393). LinkedIn/Instagram icons present but unlinked (`#`).

## Repeated global components across pages
- **Page banner/hero**: every interior page (About Kailash, About Maharaja, Anandam London, Publications, Activities, Gallery, Contact) has a full-width banner image with the page title overlaid (e.g. "About <span>Kailash</span>", "Our <span>Activities</span>") — the `<span>` wraps the last word/phrase, presumably for a color/style accent on that word.
- **Decorative "band" graphics**: `band.png`, `band-2.png`, `band-white.png` are thin decorative divider images used repeatedly between sections — purely ornamental, should be replaced with CSS dividers/borders in the rebuild rather than image assets.
- **PDF publication cards**: A recurring content block of 3–5 "booklet cover" images + title + "Read More"/direct link to a PDF. Appears on: Home ("Writings by Maharaj" section), About Maharaja ("Writings by Maharaj"), and Publications (full list). Titles seen: "Panch Sike Panch Aana" (monthly magazine, multiple monthly issues), "My Maharaj", "Maharaj's Kirtan in London", "Maharaj at ISKCON Studio", "The Rebel Mahaprabhu", "The God's Throat Cancer", "Abataranika" (English + Bengali).
- **News & Updates teaser** (Home page only): 3 news cards, each with image, title, short blurb, and "Read More" link to `/news-and-update/?tab=<id>` — the actual News & Update section/page was not in the scrape scope; flag for the dev/client whether it needs to be built for the new site.
- **Gallery preview strip** (Home page only): a horizontal row of 5 sample images (`gal1.jpg`–`gal5.jpg`, generic "Sample image #1" alt text — these look like placeholder/theme-demo images, not real Kailash photos) plus a "View All" link to `/gallery/`. Recommend replacing these placeholders with real photos when rebuilding.
- **Contact form**: WordPress Contact Form 7 with Google reCAPTCHA, fields: First Name*, Last Name*, Email*, Mobile*, Comment. Only present on the Contact page.
- **Video embeds**: About Maharaja page has a "Video" tab with 7 YouTube videos (thumbnail + play icon, opens via lightbox or link to youtu.be).
- **Tabbed photo gallery**: The Gallery page uses nested tabs — 3 location/center tabs ("Kailash at Beadon Street", "Shivananda Snehanir", "Vivekananda Snehanir"), each with "Photo"/"Video" sub-tabs. Photo counts: 7 / 21 / 67 respectively. All Video sub-tabs show a "Videos Coming Soon" placeholder message.

## Visual / design notes (inferred from theme CSS at `/wp-content/themes/astra-child/css/style.css`)
- **Color palette** (from actual hex values in the theme stylesheet, ranked by frequency):
  - Deep olive/moss green — `#3B4D00` (primary dark, likely headings/CTA)
  - Olive/khaki green (mid) — `#708726`
  - Near-black green-brown — `#191F0D` (likely body text or dark backgrounds)
  - Cream/parchment background — `#F6F6E2`
  - Warm beige background — `#EAE9D0`
  - Muted sand — `#E3E3C3`
  - Secondary olive — `#5A6632`
  - Rust/burnt-orange accent — `#C52E00` (used for the "Donate Now" CTA and other accent highlights — this is the standout accent color against the muted olive/cream palette)
  - Supporting neutrals: `#fff`, `#000`, `#f1f1f1`, `#C9C9A4`, `#D0D0AD`
  - Overall palette reads as an earthy, spiritual/ashram-appropriate scheme: olive greens + cream/parchment neutrals + one warm rust-orange accent. Recommend carrying this palette (or a refined version of it) into the new site's design tokens.
- **Typography** (Google Fonts, confirmed via `@import`/`<link>` and CSS custom properties):
  - `--bodyFont: "Inter", sans-serif` — body copy
  - `--headingFont: "Tapestry", serif` — a decorative/calligraphic display font, used for large stylized headings (e.g. hero titles)
  - `--thirdFont: "IM Fell English", serif` — an old-style serif, likely used for quotes/scripture excerpts (e.g. the Sanskrit/Bengali verse blocks and pull-quotes seen throughout)
- **Layout pattern**: Single-column, section-stacked "brochure" layout typical of Elementor/Astra-style WordPress sites — full-width hero/banner sections alternating with centered content blocks, card grids (3–4 columns on desktop) for activities/publications/gallery, and tab/accordion interactions for the gallery and video sections. Built on Bootstrap 5 grid (`container`, `row`, `col-*` classes) plus custom theme CSS — not currently optimized for mobile (heavy image use, many decorative PNGs, JS-dependent carousels/tabs). The new Eleventy site should aim for a leaner, mobile-first single-column layout with CSS Grid/Flexbox card grids and native `<details>`/simple JS tabs instead of Bootstrap+jQuery+mmenu+Fancybox+Swiper+Slick (5 separate JS libraries currently loaded).
- **Icons**: Bootstrap Icons + Material Design Iconic Font + custom SVGs (`facebook.svg`, `yt.svg`, `linkedin.svg`, `insta.svg`, `eye.svg`) — recommend consolidating to a single icon set (e.g. inline SVGs or one icon font) in the rebuild.

## Known content gaps / flags for the client or dev
1. `/donation/` page is linked from every nav/footer but was not in the scrape scope — confirm whether it exists and needs to be rebuilt.
2. `/news-and-update/` page/section is linked from the footer "Quick Links" and from Home page "Read More" links (with `?tab=` query params suggesting a tabbed news archive) but was not in the scrape scope — confirm scope.
3. Phone number discrepancy: footer/header shows "90075 27687"; the Contact page shows "+91 9007527678" next to the Secretary's name (last two digits differ: 87 vs 78). Confirm the correct number with the client.
4. Contact page "CSR Registration Number" field has no value directly in its own markup; the value (CSR00103130) was recovered from the footer, which repeats the same registration data. Confirm this is correct and complete for the Contact page.
5. Home page's small gallery preview strip uses generic placeholder images (`gal1.jpg`...`gal5.jpg`, alt="Sample image #1") that look like leftover theme demo content rather than real photos — recommend replacing with real Kailash photos in the rebuild.
6. LinkedIn and Instagram social icons are present in the header/footer markup but link to `#` (non-functional) on every page — confirm whether real profile links exist or the icons should be removed.
7. The mailto link for email is inconsistently encoded across pages: some use `mailto:%20kailashssgm@gmail.com` (leading space) and the Contact page also has a clean `mailto:kailashssgm@gmail.com` — recommend standardizing on the clean version.

## Pages scraped (status)
| Page | URL | Status |
|---|---|---|
| Home | `/` | OK — full content extracted |
| Anandam (London) | `/anandam-london/` | OK — full content extracted |
| About Kailash | `/about-kailash/` | OK — full content extracted |
| About Maharaja | `/about-maharaja/` | OK — full content extracted |
| Publications | `/publications/` | OK — thin body copy (page is mostly a document/media grid; all PDF and YouTube links captured) |
| Activities | `/activities/` | OK — full content extracted |
| Gallery | `/gallery/` | OK — tabbed photo grid, all photo URLs captured and categorized |
| Contact Us | `/contact-us/` | OK — content recovered from split label/value markup plus footer cross-reference (see gaps above) |

All 8 pages returned full server-rendered HTML via `curl` (WordPress server-side rendering — no headless browser was needed; content was not JS-rendered/thin).
