# Saan Tayo? — UI/UX Design Specification

**Version:** 1.0 (working baseline)  
**Product:** Saan Tayo? — Balanga Restaurant Menu Directory  
**Design direction:** Modern Kanto / Kanto Editorial  
**Platform:** Responsive browsable website (mobile, tablet, desktop)  
**Status:** Proposed implementation specification based on the approved desktop + mobile visual reference  
**Date:** 18 November 2026

> **Reference versus proposal.** The supplied visual reference establishes the overall look: ivory background, assertive blue wordmark, black headline, yellow-and-blue local architectural graphic, search, horizontal category filters, and restaurant cards. Exact pixel measurements, fonts, contrast states, breakpoints, interaction behavior, and content rules were not specified in the image. Those details below are **proposed implementation decisions**, not claims about the existing mockup.

## 1. Product definition and scope

### 1.1 Purpose
Saan Tayo? helps people discover restaurants in Balanga City, Bataan and browse **real menus**, organized by menu category, item name, description, and price. The website is a lightweight, public-facing catalog rather than a transaction platform.

### 1.2 Primary user jobs
1. See restaurants available in Balanga.
2. Narrow the list using restaurant/cuisine filters or text search.
3. Open a restaurant and browse its menu categories and prices.
4. Return to the listing without losing browsing context.

### 1.3 Phase 1 included
- Public restaurant catalog/homepage.
- Restaurant detail and read-only menu pages.
- Text-based search (at minimum restaurant name and cuisine; dish/item search if catalog indexing supports it).
- Category/cuisine filtering.
- Responsive navigation and cards.
- Basic content states: loading only if required by hosting strategy, empty search, missing photos, incomplete/unknown menu prices, unavailable menu data.
- Static or build-time data source (e.g., JSON / generated pages).

### 1.4 Out of scope for Phase 1
Accounts, login, favorites/bookmark persistence, restaurant self-service, admin dashboard, ordering, payments, reviews, reservations, user submissions, live location tracking, and real-time availability. **Note:** The bookmark icons shown on the visual reference are illustrative only: omit them in Phase 1 rather than ship a nonfunctional control.

## 2. Visual concept

**Creative premise:** “Kanto familiarity. Contemporary clarity.”

The personality is local, bold, approachable, straightforward and useful. Borrow the confidence and information-first spirit of neighborhood signboards, price labels, and independent local guides—not literal decorative nostalgia. The UI must be visibly *Saan Tayo?* even when restaurant photos are unavailable.

**Signature elements:** compact blue logotype; strong editorial headline; paper-like canvas; blue outlines and controls; restrained yellow highlights; clean information grids; actual Balanga restaurant images; prominent menu prices.

**Avoid:** generic food-app gradients, multiple competing accent colors, decorative food doodles, floating elements, AI-generated dishes presented as actual menu photography, deep shadows, excessive rounded pills, and overly promotional copy.

## 3. Design tokens

### 3.1 Color tokens (proposed)
| Token | Hex | Application |
|---|---|---|
| `--color-brand` | `#2447B2` | Identity, primary buttons, active filters, links |
| `--color-brand-hover` | `#1C398F` | Primary hover state |
| `--color-brand-pressed` | `#152D72` | Primary pressed state |
| `--color-paper` | `#F5F1E6` | Page background |
| `--color-surface` | `#FFFFFF` | Search, cards, raised panels |
| `--color-ink` | `#20211F` | Body, headings, strong text |
| `--color-muted` | `#575B58` | Supporting content |
| `--color-outline` | `#C5C8C4` | Card borders and quiet dividers |
| `--color-highlight` | `#F4C84B` | Editorial labels and restrained highlights |
| `--color-focus` | `#2447B2` | Keyboard focus outline |
| `--color-error` | `#AA3030` | Error text when needed |

**Usage rule:** 70–80% paper/surface; 15–25% ink/brand; yellow as a small accent. Maintain WCAG AA contrast; do not place small white text on yellow. The screenshot's warm highlights are inspiration, not a directive to use yellow on every component.

### 3.2 Typography (proposed)
| Role | Type | Weight | Fluid / base sizing |
|---|---|---|---|
| Wordmark | Customized Archivo ExtraBold / Black prototype | 800–900 | Desktop 30–36 px; mobile 22–26 px |
| Hero | Archivo Black or ExtraBold | 800–900 | `clamp(40px, 5vw, 80px)`, tight 0.95–1.05 line-height |
| Page title | Archivo Bold | 700–800 | 32–44 px desktop; 28–34 px mobile |
| Section title | Space Grotesk Bold or Archivo Bold | 700 | 24–32 px desktop; 22–26 px mobile |
| Restaurant title | Space Grotesk Bold | 700 | 18–20 px |
| UI/body | DM Sans | 400–600 | 16 px regular; 14 px supplemental |
| Menu price | DM Sans Bold | 700 | 16–18 px; tabular figures if available |
| Overline/label | DM Sans Bold | 700 | 11–12 px; deliberate tracking |

**Implementation note:** Load only licensed, required webfont weights, use a system sans fallback and `font-display: swap`; ensure the selected font has adequate support for Filipino and accented terms. The exact logo lettering should eventually be drawn rather than relying on a standard italic font.

### 3.3 Spacing, geometry, elevation
- Base spacing unit: **4 px**. Recommended steps: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Page gutters: mobile **16 px**; tablet **24–32 px**; desktop **40–64 px**.
- Content maximum width: **1280 px** (excluding background flourishes).
- Card radius: **12–16 px**; text field radius: **10–12 px**; button radius: **10–12 px**; category chip radius: **24 px**.
- Borders: **1 px** neutral / brand; avoid thick noisy outlines for all surfaces.
- Shadows: generally none; optional subtle elevation on navigation overlays only.
- Tap targets: **44 × 44 px minimum** for standalone controls.
- Motion: 150–200 ms for hover/focus transitions; respect `prefers-reduced-motion`.

## 4. Identity system

### 4.1 Wordmark
- Display exactly **SAAN TAYO?** with consistent baseline and intentional letter spacing.
- Blue text, no yellow underline. The approved reference uses an aligned single-line wordmark on both desktop and mobile.
- Adjacent small location descriptor: **BALANGA, BATAAN**; desktop may add **FOOD DIRECTORY** on a second line. Keep the descriptor secondary to the name.
- Small-screen fallback: hide “FOOD DIRECTORY” before compressing the logo; never distort or stretch lettering.
- Do not substitute a fork/map-pin icon as the primary mark.

### 4.2 Editorial local graphic
The approved desktop hero shows a monochrome blue illustration/photo treatment of a local church-like landmark over a strong yellow geometric field. Treat this as **provisional artwork**, requiring rights clearance and confirmation that it depicts the intended Balanga landmark before production use. Desktop may use this in the hero; omit or simplify on mobile to avoid pushing search and listings below the fold. Provide meaningful alt text only if the landmark conveys content; otherwise mark decoration appropriately.

### 4.3 Imagery
- Prefer authentic, restaurant-supplied photos and identifiable storefronts. Do not use fictional images to represent real businesses in production.
- Restaurant card photos: crop to a consistent landscape ratio, **16:9** or **3:2**; use `object-fit: cover` and stable aspect ratio.
- Do not fabricate a restaurant count or menu prices from the mockup. “32 restaurants” shown in the screenshot is an illustrative placeholder until verified against catalog data.
- Provide consistent branded, text-first fallback for missing restaurant photos. Menu item photos are optional.

## 5. Information architecture and routes

| Route | Primary purpose | Required information |
|---|---|---|
| `/` | Landing + directory browsing | Hero, search, category filters, restaurant index |
| `/restaurants` | Optional direct catalog entry | Same index component; can redirect/anchor to home if duplicate |
| `/restaurants/:slug` | Restaurant + menu | Name, location, cuisine, menu categories, item names, descriptions and prices |
| `/about` | Short explanation | What Saan Tayo? is; Balanga focus; how menu data is sourced/updated |
| `404` | Not found | Clear message + return to directory |

Avoid separate pages for filter results unless they help with shareable URLs. If search/filter is URL-driven, use e.g. `/?q=coffee&category=cafe` so browser back/forward works.

## 6. Desktop catalog/home specification

### 6.1 Site header
- Left: Saan Tayo? wordmark plus location label.
- Right: text links **Home**, **Restaurants**, **About**; distinguish current route clearly.
- Background matches paper or uses a subtle surface treatment; keep nav quiet relative to headline.
- `header` and `nav` semantic elements; keyboard reachable links.

### 6.2 Hero
- Headline exact copy: **“Anong gusto mo?”**
- Supporting copy from the approved mockup: **“Browse restaurants in Balanga and see their menus in one place.”**
- Desktop composition: copy on left, blue/yellow Balanga artwork on right.
- Hero should not monopolize the viewport; users should see search and the start of listings without excessive scrolling.
- Search below supporting copy, full width within the text region / content area.

### 6.3 Search
- Visible search affordance and placeholder such as **“Search for a restaurant, cuisine, or dish…”** (only mention dishes if dish indexing exists).
- Search action may be enter key or a button; results update on submit or debounced input, consistently.
- Keyboard-accessible clear action when query is present.
- Announce filtered result count in an accessible live region (do not interrupt typing).

### 6.4 Cuisine/category filters
- Horizontal chips: **All, Café, Burgers, Filipino, Pasta, Pizza, Drinks**, with categories derived from actual catalog taxonomy.
- Only one cuisine filter active initially; **All** is default. If multi-select is implemented, change visual states and behavior explicitly.
- Active: solid brand blue with white text; inactive: transparent/paper fill and 1 px blue outline.
- Icons optional; ensure text alone carries meaning.
- On narrow widths use a horizontally scrollable chip row, not tiny compressed chips.
- Search and category filters combine using logical AND.

### 6.5 Restaurant directory
- Use a 3-column desktop grid at wide widths, with consistent image sizes and text alignment.
- Each card exposes restaurant name, category/cuisine, and Balanga location. Entire card or a clearly labeled link navigates to its menu page.
- Card image should not contain essential text. Use a subtle right-arrow affordance if desired.
- No bookmarks/favorites in Phase 1.
- Show actual live/catalog-derived result count; do not hardcode “32 restaurants.”
- Suggested heading: **“Mga kainan sa Balanga”**, optionally styled as a compact yellow editorial label. Do not require a slanted sticker treatment on every section heading.

## 7. Restaurant detail / menu page

The restaurant detail page is the product's core information surface, even though it is not shown in the supplied reference. The following is a **proposed functional specification**, not an observed design.

### 7.1 Content hierarchy
1. Breadcrumb/back to restaurants.
2. Restaurant identity: name, cuisine tags, locality/barangay if available, optional verified image.
3. A short informational note such as **“Menu prices may change. Last updated [date]”** when a date is available.
4. Menu category index (e.g., Rice Meals, Pasta, Drinks).
5. Menu sections containing item name, optional description, and price.
6. Simple footer / attribution / source note where appropriate.

### 7.2 Menu item pattern
- Left: item name (strong), description underneath (if available).
- Right: price, aligned consistently; use Philippine peso symbol, e.g., **₱185**.
- If multiple sizes/variants exist, label them explicitly; do not collapse them into a misleading single price.
- If price is unavailable, use **“Price unavailable”** rather than a fabricated numeric value or `₱0`.
- If description is missing, omit the description row; avoid placeholder lorem ipsum.
- No Add to cart, checkout, or ordering CTA.

### 7.3 Menu category navigation
- On desktop, may use a narrow category sidebar or sticky row; on mobile use a horizontal category strip or clear section headings.
- Category links scroll to headings with sufficient offset for sticky headers.
- Preserve heading hierarchy (`h1` restaurant name; `h2` menu category; `h3` item where semantically sensible).
- If there is no menu yet, state this plainly and provide a link back to directory.

## 8. Responsive behavior

These are recommended **layout thresholds**, not device categories hardcoded into product logic. Make layouts adapt fluidly between widths.

| Viewport | Header | Hero | Filters | Restaurant index | Menu page |
|---|---|---|---|---|---|
| **Mobile** `<640px` | Small aligned wordmark; compact menu trigger if needed | Headline and copy first; remove/de-emphasize landmark art | Horizontal scroll | 1-column compact horizontal cards, photo left | Stacked info, sticky/scrolling categories, price aligned right |
| **Tablet** `640–1023px` | Wordmark + shortened links or compact nav | Two-column only if space permits; else stacked | Scroll/wrap as needed | 2-column cards | Single or two-column depending content |
| **Desktop** `≥1024px` | Full nav + location descriptor | Split left headline / right graphic | Single row or balanced wrap | 3-column image-led cards | Content + optional category sidebar |

- Mobile reference shows compact **horizontal restaurant rows**, not a 3-column miniature grid. Maintain 44 px targets and readable type.
- Desktop grid shifts from 3 to 2 to 1 columns with **content-based breakpoints**; avoid overflow at intermediate widths.
- Hero art must not overlap search, crop essential content, or create sideways scrolling.
- Mobile menu navigation must close on selection/Escape and return focus to trigger where appropriate.
- Images use `srcset`/responsive sizes and loading hints; avoid loading offscreen images eagerly.

## 9. UI component inventory and states

| Component | Variants / states | Essential behavior |
|---|---|---|
| Brand lockup | desktop, compact | Linked to home; no underline; preserve baseline alignment |
| Header/navigation | desktop, mobile; current, hover, focus | Accessible menu and route state |
| Search field | idle, focus, filled, cleared, no results | Label, submit/clear keyboard support |
| Search button | default, hover, pressed, focus, disabled only if appropriate | Trigger actual search |
| Category chip | default, hover, selected, focus | Update active filter and results |
| Restaurant card | image, no-image, hover, keyboard-focus | Link to restaurant detail |
| Restaurant count | plural, singular, zero | Reflect filtered results, not placeholders |
| Menu category link | default, current, focus | Jump to section / clear section label |
| Menu item | with/without description, single/variant/unknown price | Readable price and no misleading values |
| Empty state | no matching restaurants, missing menu | Helpful message and clear/reset action |
| Footer | standard | Short project/context links |

Do not include visible controls that perform no action. In particular, remove the mockup's bookmark controls until favorites become a planned feature.

## 10. Interaction and content rules

- Search is case-insensitive, tolerant of extra spaces, and should reasonably match full or partial restaurant names. Optional diacritic-insensitive matching can improve usability.
- Filters and search combine predictably; provide an obvious **Clear filters** option when there are zero results.
- Keep selected query/category in the URL where practical, so users can share and navigate back.
- Use actual catalog language; restaurant names must not be translated or normalized without permission.
- Cuisine taxonomy should be curated and consistent (e.g., decide whether Café and Coffee are separate categories).
- Do not display unsupported claims (open now, rating, distance, featured, exact dish availability).
- Every price is tied to a source and an update timestamp if possible; prices remain informational, not promises.
- Distinguish image alt text for meaningful storefront pictures from decorative hero graphics.

## 11. Accessibility requirements

- Target **WCAG 2.2 AA** for common flows.
- Logical focus order, obvious 2 px focus indication, and keyboard navigation for all real controls.
- Respect 200% text zoom and 320 CSS px width without essential content being cut off.
- Do not rely on blue/yellow alone to identify an active filter; use text, borders and `aria-pressed`/appropriate semantics.
- Text labels for search and navigation, semantic landmarks, correct heading sequence, and descriptive restaurant links.
- Images: informative `alt` when meaningful; decorative images use empty alt.
- 44 px touch areas for core controls, adequate spacing between adjacent chips.
- Support `prefers-reduced-motion`, high zoom, and readable contrast on paper backgrounds.

## 12. Static content model (suggested)

```json
{
  "id": "sample-restaurant",
  "slug": "sample-restaurant",
  "name": "Sample Restaurant",
  "cuisines": ["Filipino"],
  "locationLabel": "Balanga City, Bataan",
  "image": null,
  "menuUpdatedAt": "2026-11-18",
  "menu": [
    {
      "id": "rice-meals",
      "name": "Rice Meals",
      "items": [
        {
          "id": "sample-item",
          "name": "Sample Meal",
          "description": "Optional plain-language description.",
          "pricePHP": 185,
          "variants": []
        }
      ]
    }
  ]
}
```

This is **sample schema/data only**, not a real Balanga restaurant or verified menu. Use numeric prices in stored data and format as PHP currency in the UI. Consider price values `null` when unknown, and keep restaurant-specific source metadata separately if necessary.

## 13. Frontend implementation guidance

- Build static-first: client-side filtering on the locally loaded catalog or build-time generated restaurant pages.
- Components should be data-driven, not hardcoded per restaurant.
- Suggested primitives: `SiteHeader`, `BrandLockup`, `Hero`, `RestaurantSearch`, `CuisineFilters`, `RestaurantGrid`, `RestaurantCard`, `RestaurantHeader`, `MenuCategoryNav`, `MenuSection`, `MenuItem`, `EmptyState`, `SiteFooter`.
- Expose color, radius, typography, gutters and breakpoints as design tokens (CSS custom properties or a shared theme object).
- Prefer CSS grid for directory, flex for chip rows and item rows; minimize absolute positioning.
- Optimize for fast first paint on low/midrange mobile connections; avoid animation libraries and heavyweight map integrations in Phase 1.
- Use semantic HTML and routes that work on direct page reload (configure static hosting fallbacks or generated routes).

## 14. Acceptance checklist

- [ ] Brand wordmark is aligned and has **no yellow underline** on desktop and mobile.
- [ ] Hero heading reads **“Anong gusto mo?”** exactly.
- [ ] Three yellow decorative lines adjacent to the hero heading are **absent**.
- [ ] Paper background, blue identity and limited yellow highlights match reference direction.
- [ ] Restaurant cards show actual restaurant-sourced content or clearly marked placeholders in development.
- [ ] Catalog can be searched and filtered, and zero-result state works.
- [ ] Restaurant detail page exposes menu categories, item descriptions where provided, and prices.
- [ ] No login, ordering, booking, review, or inert bookmark UI appears in Phase 1.
- [ ] Mobile, tablet, and desktop sizes have no horizontal page overflow or illegible content.
- [ ] Interactive components have keyboard/focus and touch states.
- [ ] Prices and listing count are sourced from data, not copied from the visual mockup.
- [ ] Source/photo rights and hero landmark identity are reviewed before launch.

## 15. Design decisions to finalize later

1. Final custom wordmark and exact font family/weight.
2. Confirm whether the blue-and-yellow Balanga landmark graphic will be used and acquire/produce licensed artwork.
3. Exact category taxonomy derived from the restaurants in the catalog.
4. Whether Phase 1 search indexes dish names or only restaurant name/cuisine.
5. Final restaurant data-source attribution, update cadence, and disclosure wording.
6. Final mobile navigation approach once the complete page hierarchy is confirmed.

---

**Document boundary:** This is the UI/UX design specification. Wireframes and high-fidelity page mockups are intentionally excluded and can be attached separately later.
