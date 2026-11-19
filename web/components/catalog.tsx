"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { filterRestaurants, type Restaurant } from "@/lib/restaurants";
import { RestaurantCard } from "./restaurant-card";
import { Search, X } from "lucide-react";
export function Catalog({ restaurants }: { restaurants: Restaurant[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const query = params.get("q") ?? "";
  const categories = [
    "All",
    ...Array.from(new Set(restaurants.flatMap((r) => r.cuisines))),
  ];
  const selected = params.get("category") ?? "All";
  const cuisine = categories.includes(selected) ? selected : "All";
  const results = filterRestaurants(restaurants, query, cuisine);
  function update(q: string, c: string) {
    const next = new URLSearchParams();
    if (q.trim()) next.set("q", q.trim());
    if (c !== "All") next.set("category", c);
    startTransition(() =>
      router.push(`${pathname}${next.size ? "?" + next : ""}`, {
        scroll: false,
      }),
    );
  }
  const returnQuery = params.size ? "?" + params.toString() : "";
  return (
    <>
      <section className="search-section" aria-label="Find a restaurant">
        <form
          className="search-form"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            update(
              String(new FormData(e.currentTarget).get("q") ?? ""),
              cuisine,
            );
          }}
        >
          <label htmlFor="restaurant-search" className="sr-only">
            Search restaurants, cuisines, or menu items
          </label>
          <span className="search-icon">
            <Search size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <input
            key={query}
            id="restaurant-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search for a restaurant, cuisine, or dish…"
          />
          {query && (
            <button
              className="clear-search"
              type="button"
              onClick={() => {
                update("", cuisine);
              }}
              aria-label="Clear search"
            >
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
          <button className="search-submit" type="submit" aria-label="Search">
            <span>Search</span>
            <span className="mobile-search-icon">
              <Search size={22} strokeWidth={1.8} aria-hidden="true" />
            </span>
          </button>
        </form>
      </section>
      <section
        id="restaurants"
        className="catalog-section"
        aria-labelledby="catalog-heading"
      >
        <div className="filters" aria-label="Filter by cuisine">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="filter"
              aria-pressed={cuisine === c}
              onClick={() => {
                update(query, c);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="catalog-heading">
          <h2 id="catalog-heading">Mga kainan sa Balanga</h2>
          <p role="status" aria-live="polite">
            {results.length}{" "}
            {results.length === 1 ? "restaurant" : "restaurants"}
            {query ? ` for “${query}”` : ""}
          </p>
        </div>
        <p className="demo-notice">
          <strong>Silip muna — demo lang!</strong> Fictional restaurants, sample
          menus & prices. Illustrations are not restaurant photos.
        </p>
        <div aria-busy={pending}>
          {results.length ? (
            <div className="restaurant-grid">
              {results.map((r) => (
                <RestaurantCard
                  key={r.slug}
                  restaurant={r}
                  returnQuery={returnQuery}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-kicker">WALA PA RITO</span>
              <h3>Walang tugma. Ibang craving naman?</h3>
              <p>
                Try a dish like adobo, another restaurant name, or a different
                category.
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  update("", "All");
                }}
              >
                Clear search & filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
