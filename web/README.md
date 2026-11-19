# Saan Tayo? — public frontend demo

Next.js App Router, TypeScript, and Tailwind CSS. No environment variables, backend, or database are required. Use Node.js 20.9+ and npm.

## Run locally

```powershell
cd D:\saan-tayo\web
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. For a production preview, run `npm.cmd run build` followed by `npm.cmd start`.

## Verify

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
```

Browser tests use installed Google Chrome through Playwright and start/stop the production server on port 3100. Run the build first. Screenshots are generated in ignored `test-results/`.

## Source map

- `app/`: homepage, dynamic restaurant menu route, About, 404, shared layout, and design tokens/responsive styles.
- `components/`: responsive navigation, catalog search/filtering, restaurant cards, and footer.
- `lib/restaurants.ts`: typed fictional data, data-access functions, text matching, and peso formatting. Replace the data-access functions when the verified public API is available.
- `public/art/`: original local SVG illustrations; these are not restaurant photographs or a verified landmark depiction.
- `tests/`: browser checks for the main browsing flows, all menu routes, and responsive overflow.

Search updates on submit and combines with one cuisine filter. Search matches restaurant names, cuisine labels, item names, and descriptions; it ignores case, accents, and repeated spaces. Query/filter state is kept in the URL and carried through restaurant links and back navigation.

The homepage and About page are prerendered. Menu pages use Next.js server rendering with local data to retain query context; no external API or service is called. They need a Next.js runtime (`npm start`), not a plain static-file host.

All seven restaurants, menus, and prices are fictional. Data is visibly labeled throughout. Unknown prices and explicit size variants are demonstrated. Demo pages intentionally use `noindex` metadata until real content is ready. No accounts, ordering, payments, reservations, reviews, or admin workflows are included.

Automated Chrome checks are not a full WCAG audit or physical-device acceptance. Real listing verification, photo permissions, landmark review, and production deployment remain outside this prototype.
