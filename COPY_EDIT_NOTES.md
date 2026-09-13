# Copy Edit Notes

## Home (src/index.njk)
- Location: "The Guru founded a social service institution in the name of his disciple, which is an unique and unparalleled event that remains ever glorious." (Kailash intro section)
- Issue: "an unique" is a grammar error — "unique" starts with a consonant *sound* (/j/), so it takes "a," not "an."
- Suggestion: "a unique and unparalleled event"

- Location: Birth-of-Maharaj blockquote — `&#10077;Inwardly they are Shaktas...&#10078;`
- Issue: Punctuation inconsistency. This blockquote uses numeric heavy-angle-quote entities (`&#10077;` / `&#10078;`), while other blockquotes/quoted phrases on this same page and site use curly quotes (`&#8220;`/`&#8221;` or `&ldquo;`/`&rdquo;`).
- Suggestion: Standardize on `&ldquo;` / `&rdquo;` (curly double quotes) for all English blockquotes site-wide.

- Location: "Activities of Kailash" blockquote — `&#8220;My ship is little...&#8221;`
- Issue: Minor inconsistency — uses numeric entities (`&#8220;`/`&#8221;`) rather than the named entities (`&ldquo;`/`&rdquo;`) used elsewhere (e.g. the "Ananda Sandhya" blockquotes on the News page). Same rendered character, but inconsistent source markup.
- Suggestion: Standardize on one form across all templates (named entities recommended for readability of source).

- Location: News & Updates card links — `/news-and-update/?tab=645`, `?tab=647`, `?tab=649`
- Issue: The News & Update page (src/news-and-update/index.njk) has no tab/query-string handling — its sections are plain anchors with ids `#15th-august`, `#anandam-london`, `#ananda-sandhya`. The `?tab=NNN` links go nowhere meaningful (they'll just load the page from the top, not scroll to the relevant story).
- Suggestion: Needs client/dev clarification — confirm whether these should be `/news-and-update/#15th-august`, `/news-and-update/#anandam-london`, `/news-and-update/#ananda-sandhya` (matching the actual ids) or whether a real tab system is planned.

## About Kailash (src/about-kailash/index.njk)
- Location: Page intro — same sentence as Home: "...which is an unique and unparalleled event..."
- Issue: Same "an unique" error, duplicated verbatim from the homepage.
- Suggestion: "a unique and unparalleled event" (fix in both places).

- Location: "Among the beloved spiritual children, the one who had earned a special place closest to Maharaj's heart... was Kailash Ghosh."
- Issue: None — reads fine, flagging only to note the following sentence has an ambiguity (see below).

- Location: "Swami Shivananda Giri Maharaj founded Kailash... He named the organization after an untimely death of one of his closest disciple Kailash Ghosh. He was then a reputed football player too, playing for a first division club of Kolkata."
- Issue: (1) "one of his closest disciple" should be plural: "disciples." (2) Comma splice/capitalization: "...across our society, He named..." — a comma cannot join two independent clauses with a capitalized "He"; needs a period or semicolon. (3) Ambiguous pronoun: "He was then a reputed football player" — grammatically "He" attaches to Maharaj (the subject of the prior clause), but contextually this almost certainly refers to Kailash Ghosh, the disciple. As written, a reader could easily believe it describes Maharaj.
- Suggestion: Split into two sentences and clarify the subject, e.g.: "...as an attempt to spread welfare activities across our society. He named the organization after the untimely death of one of his closest disciples, Kailash Ghosh, who was then a reputed football player, playing for a first division club of Kolkata." Needs client confirmation that the football-player detail refers to Kailash Ghosh, not Maharaj.

- Location: "This special worship of the Shyam-Shyama deity, conceived and planned by Sri Thakur himself."
- Issue: Sentence fragment — no main verb ("was" is missing before "conceived").
- Suggestion: "This special worship of the Shyam-Shyama deity was conceived and planned by Sri Thakur himself."

- Location: "...a Shankha (conch) and a Chakra (discuss) in other two hands."
- Issue: Spelling error — "discuss" (the verb) should be "discus" (the disc-shaped weapon), which is what "Chakra" refers to.
- Suggestion: "a Shankha (conch) and a Chakra (discus) in the other two hands."

- Location: "...he would immersed in divine ecstasy."
- Issue: Grammar error — verb form doesn't fit ("would immersed").
- Suggestion: "he would be immersed in divine ecstasy" or "he would immerse himself in divine ecstasy."

- Location: Section heading "Kailash Centers & Activities" vs. section heading later on the same page, "Kailash Runs Other Two Centres"
- Issue: Spelling inconsistency within a single page — "Centers" (American) vs. "Centres" (British).
- Suggestion: Pick one spelling convention (the site otherwise reads British English — "organisation," "colour" not present but "Centres" used elsewhere) and apply consistently; recommend "Centres" throughout.

- Location: "Vivekananda Snehanir was the first step to social work by Kailash being founded in 1979."
- Issue: Awkward/ambiguous phrasing — reads as if "being founded in 1979" modifies "social work" or "Kailash" rather than "Vivekananda Snehanir."
- Suggestion: "Vivekananda Snehanir was Kailash's first social-work initiative, founded in 1979."

- Location: "Distribution of blankets, clothings, foods to underprivileged and needy people of the adjoining places" (appears twice on this page, and again on the Activities page)
- Issue: "Clothings" is not standard English — "clothing" is uncountable and has no plural form. "Foods" is likewise awkward in this list.
- Suggestion: "Distribution of blankets, clothing, and food to underprivileged and needy people of the adjoining places" (apply the same fix everywhere this phrase recurs).

- Location: Quoted sayings — `"Daridra Devo Bhava"`, `"Abahelita Devo Bhava."`, and the later blockquote `"Chant the holy name of God..."`
- Issue: Punctuation inconsistency — this page uses straight double quotes for quoted speech, while the Home and News pages use curly quotes (`&ldquo;`/`&rdquo;`) for equivalent quoted material.
- Suggestion: Convert to curly quotes for consistency site-wide (see Cross-page section).

## About Maharaja (src/about-maharaja/index.njk)
- Location: "Believers feel that the spiritual power of all fifty-one Shakti Peethas meets here at the feet of Maa Kali."
- Issue: Subject-verb agreement — "all fifty-one Shakti Peethas" is plural, so it should take "meet," not "meets."
- Suggestion: "...all fifty-one Shakti Peethas meet here at the feet of Maa Kali."

- Location: HTML comment above "The Master's Words, Voice & Vision" section (`<!-- Original site presented this as "Audio" / "Video" tabs... -->`)
- Issue: Not a visible copy issue (it's a code comment, not rendered), but flagging for awareness: the original Audio tab apparently had no content in the scrape. Confirm with client whether an Audio tab/content should exist, or if the Video-only presentation here is correct.
- Suggestion: Needs client clarification (functional/content-completeness question, not a grammar fix).

- Location: Page `<title>`/frontmatter says "About Maharaja," but every heading and all body copy on the page (and everywhere else on the site) refers to him only as "Maharaj."
- Issue: Naming inconsistency between the page's metadata/URL (`/about-maharaja/`, title "About Maharaja") and the actual body copy, which never uses "Maharaja." A visitor could notice the browser tab/search-result title uses a form of the name that never appears on the page itself.
- Suggestion: See Cross-page consistency section.

## Anandam (London) (src/anandam-london/index.njk)
- Location: "With Maharaj's arrival, these informal gathering took on a new spiritual dimension."
- Issue: Grammar — subject/number mismatch: "these informal gathering" should be plural.
- Suggestion: "these informal gatherings took on a new spiritual dimension."

- Location: "Everyone was eager to meet Maharaj, however those who met him were immediately touched by his warmth..."
- Issue: Comma splice — "however" is being used as a coordinating conjunction after a comma, joining two independent clauses, which is a run-on.
- Suggestion: "Everyone was eager to meet Maharaj; however, those who met him were immediately touched by his warmth, wisdom, compassion, and simplicity." (or split into two sentences)

- Location: "He also encouraged the devotees to take by turns hosting the gatherings in their respective homes."
- Issue: Awkward phrasing — "take by turns hosting" is not idiomatic.
- Suggestion: "He also encouraged the devotees to take turns hosting the gatherings in their respective homes."

- Location: "The previous year (2025) marked the 40th anniversary of the Anandam Kali Puja..."
- Issue: Ambiguous/possibly inconsistent date. Anandam London itself began in July 1975 (stated earlier on this page), but the Kali Puja tradition is described as a separate, later initiative ("Another important chapter... a tradition initiated by Maharaj"). If the Kali Puja had also started in 1975, 2025 would mark the 50th anniversary, not the 40th — implying the Puja tradition actually began around 1985. The page never states the year the Kali Puja tradition began.
- Suggestion: Needs client clarification — confirm the year the Anandam Kali Puja tradition started so the "40th anniversary in 2025" figure can be verified or the copy adjusted.

## Publications (src/publications/index.njk)
- No language/grammar issues found in body copy (mostly image captions and download links).
- See Cross-page consistency section for the "Panch Sike Panch Ana" vs. "Panch Sike Panch Aana" naming inconsistency.

## Activities (src/activities/index.njk)
- Location: "Distribution of blankets, clothings, foods to underprivileged and needy people of the adjoining places." (Distribution Drive card)
- Issue: Same "clothings"/"foods" issue as on the About Kailash page.
- Suggestion: "Distribution of blankets, clothing, and food to underprivileged and needy people of the adjoining places."

- Location: "A Proud Milestone for Vivekananda Snehanir" card — "Where discipline blossoms into achievement."
- Issue: Vague/ambiguous — the caption doesn't say what the "milestone" actually was (an exam result? a sports win? a graduation?). Not an English error, but a reader can't tell what event this refers to.
- Suggestion: Needs client clarification — a one-line description of the actual achievement would help (e.g., "Our boys' football team won the district trophy" or similar, if known).

## Gallery (src/gallery/index.njk)
- No issues found. ("Videos Coming Soon" is intentional placeholder UI copy for an unbuilt tab, not a scraping artifact — reads fine as-is.)

## Contact Us (src/contact-us/index.njk)
- Location: "Our online enquiry form isn't wired up yet — until then, please write to us directly:"
- Issue: Tone — this reads as an internal developer note that has leaked into user-facing copy ("isn't wired up yet" is implementation language, not something a visiting donor should see).
- Suggestion: Rephrase to something visitor-appropriate, e.g., "Our online enquiry form is temporarily unavailable. Please contact us directly using the details below:" (Confirm with client whether/when a working form is planned, since that affects final wording.)

- Location: Secretary phone number `+91 9007527678` vs. the footer/nav-wide number `90075 27687` (src/_data/site.json, `phoneNoteForDev`)
- Issue: This is already flagged in code via a TODO/comment (`site.json` → `contact.phoneNoteForDev`) — the Secretary's listed number on this page conflicts in its last two digits with the number used site-wide in the footer/nav. Restating here since it's a genuine, unresolved copy/data discrepancy visible to end users.
- Suggestion: Needs client clarification — confirm the correct number for Sri Arpan Banerjee (Secretary) and reconcile it with the site-wide contact number.

## Donation (src/donation/index.njk)
- Location: "PAN/AADHAR" (in the Section 10BE paragraph)
- Issue: Spelling — the correct term is "Aadhaar" (India's national ID), not "AADHAR." As written it looks like an inconsistent/incorrect all-caps abbreviation of the name.
- Suggestion: "PAN/Aadhaar" (or "PAN/AADHAAR" if the client wants it fully capitalized to match "PAN," but the spelling should be corrected to include the second "a" either way).

## News and Update (src/news-and-update/index.njk)
- Location: Section heading "Celebrating Independence Day at Vivekananda Snehanir" vs. the Home page's teaser for the same story, "Kailash celebrated India's 80th Independence Day."
- Issue: Naming inconsistency — the News page attributes the celebration specifically to Vivekananda Snehanir, while the Home page teaser attributes it to Kailash generally. A reader clicking through might be mildly confused about which entity is being described.
- Suggestion: Align the wording, e.g. update the Home teaser to "Vivekananda Snehanir celebrated India's 80th Independence Day" to match the News page, or vice versa if "Kailash" is the preferred umbrella term.

- Location: Date formatting — "Sunday, 13th September 2026" vs. "Sunday, 1 March 2026"
- Issue: Inconsistent date style — one uses an ordinal ("13th"), the other does not ("1").
- Suggestion: Standardize on one style throughout, e.g. "1st March 2026" or drop ordinals everywhere ("13 September 2026").

- Location: Em dash usage — this page uses the HTML entity `&mdash;` (e.g., "all above the age of eighty &mdash; Smt. Purnima Ghosh...") while the Anandam (London) page uses a raw Unicode em dash "—" directly in the text (e.g., "became much more than a religious observance—it became a celebration").
- Issue: Punctuation/markup inconsistency across pages (same visual character, different source encoding — not itself a visible bug, but worth normalizing for maintainability).
- Suggestion: Pick one convention (either `&mdash;` everywhere or a raw em dash everywhere) across all templates.

## Cross-page consistency
- **"Maharaj" vs "Maharaja":** The name is spelled "Maharaj" consistently in all body copy across every page. "Maharaja" only appears in the About Maharaja page's frontmatter (`title: About Maharaja`, permalink `/about-maharaja/`) and nowhere in the visible text. This means the browser tab title and any search-engine result for that page will show "Maharaja," a form that never appears on the page itself. Recommend changing the page `title` to something like "Swami Shivananda Giri Maharaj" or "About Maharaj" to match body usage (the URL slug can stay as-is).

- **Straight vs. curly apostrophes/quotes:** The Home page (src/index.njk) consistently uses curly quote entities (`&rsquo;`, `&#8217;`, `&ldquo;`/`&rdquo;`) for possessives and quoted speech (e.g., "India&rsquo;s 80th Independence Day," "Maharaj&rsquo;s Kirtan in London"). Every other page (About Kailash, About Maharaja, Anandam London, Contact Us, Donation, News and Update) uses plain straight apostrophes/quotes throughout (e.g., "Maharaj's heart," "the God's Throat Cancer," "Kailash's heart," "Bhanumati," etc. — though News and Update does use curly `&ldquo;`/`&rdquo;` for quoted dialogue). This is the most pervasive inconsistency on the site. Recommend picking one standard (curly quotes are typographically preferred for published body copy) and applying it uniformly across all ten templates.

- **"Panch Sike Panch Ana" vs. "Panch Sike Panch Aana":** The About Kailash page refers to the magazine as "Panch Sike Panch Ana" (one "a"), while the Publications page names it "Panch Sike Panch Aana – Sept 26" / "...Aug 26" (two "a"s), and the image alt text on Publications also uses "Aana." Needs client clarification on the correct/official spelling of the magazine's name so it can be made consistent everywhere it's mentioned.

- **"Centers" vs "Centres":** Only occurs within About Kailash itself (see that page's notes above), but worth calling out as a site-wide style decision — the rest of the site's spelling (e.g., "organisation," "programme," "recognised" is not used but "Anandam Kirtan Gosthi," "colour"-less copy) leans British English, so "Centres" is the more consistent choice if a single convention is wanted everywhere "center(s)" might appear.

- **"Vivekananda Snehanir" spelling:** Spelled consistently as "Vivekananda Snehanir" across Home, About Kailash, Activities, News and Update, and Gallery — no variant spellings found. No action needed.

- **"Kailash" vs "KAILASH":** No instances of all-caps "KAILASH" were found in body copy on any of the ten pages — the name is capitalized consistently as "Kailash" throughout. No action needed.
