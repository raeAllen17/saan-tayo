import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getRestaurant, getRestaurants } from "@/lib/restaurants";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
};
export const dynamicParams = false;
export function generateStaticParams() {
  return getRestaurants().map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRestaurant((await params).slug);
  return {
    title: r ? `${r.name} — Demo menu` : "Restaurant not found",
    description: r
      ? `Browse the fictional ${r.name} sample menu. ${r.cuisines.join(", ")} dishes and demo prices for the Saan Tayo? prototype.`
      : undefined,
  };
}
export default async function RestaurantPage({ params, searchParams }: Props) {
  const r = getRestaurant((await params).slug);
  if (!r) notFound();
  const filters = await searchParams;
  const back = new URLSearchParams();
  if (filters.q) back.set("q", filters.q);
  if (filters.category) back.set("category", filters.category);
  return (
    <main id="main" className="container detail-page">
      <Link
        className="back-link"
        href={`/${back.size ? "?" + back : ""}#restaurants`}
      >
        ← Back to restaurants
      </Link>
      <section className="restaurant-intro">
        <div>
          <span className="eyebrow">
            DEMO RESTAURANT · {r.cuisines.join(" / ")}
          </span>
          <h1>{r.name}</h1>
          <p className="intro-description">{r.description}</p>
          <p className="location-label">{r.locationLabel}</p>
        </div>
        <div className="detail-art">
          {r.image ? (
            <Image
              src={r.image}
              alt={`Decorative ${r.cuisines[0].toLowerCase()} illustration, not a restaurant photo`}
              fill
              sizes="(max-width:767px) 90vw, 40vw"
              priority
            />
          ) : (
            <div className="image-fallback">
              <strong>Lutong bahay.</strong>
              <span>No restaurant photo yet.</span>
            </div>
          )}
        </div>
      </section>
      <div className="menu-disclosure">
        <strong>Sample menu, hindi totoong listing.</strong>
        <p>
          This restaurant, its dishes, and prices are fictional. Demo data
          prepared <time dateTime={r.menuUpdatedAt}>18 November 2026</time>.
          Nothing here is verified business information.
        </p>
      </div>
      <nav className="menu-categories" aria-label="Menu categories">
        {r.menu.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.name}
          </a>
        ))}
      </nav>
      <div className="menu-content">
        <div className="menu-title">
          <span className="eyebrow">ANO’NG NASA MENU?</span>
          <h2>The menu</h2>
          <p>Sample prices in Philippine pesos.</p>
        </div>
        <div>
          {r.menu.length ? (
            r.menu.map((c) => (
              <section className="menu-section" key={c.id} id={c.id}>
                <h2>{c.name}</h2>
                {c.items.map((item) => (
                  <article className="menu-item" key={item.id}>
                    <div>
                      <h3>{item.name}</h3>
                      {item.description && <p>{item.description}</p>}
                    </div>
                    <div className="menu-price">
                      {item.variants ? (
                        item.variants.map((v) => (
                          <p key={v.name}>
                            <span>{v.name}</span> {formatPrice(v.pricePHP)}
                          </p>
                        ))
                      ) : item.pricePHP === null ? (
                        <span className="unknown-price">Price unavailable</span>
                      ) : (
                        formatPrice(item.pricePHP)
                      )}
                    </div>
                  </article>
                ))}
              </section>
            ))
          ) : (
            <p>
              No sample menu available yet.{" "}
              <Link href="/">Browse other restaurants</Link>.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
