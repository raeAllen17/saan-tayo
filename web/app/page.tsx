import Image from "next/image";
import { Suspense } from "react";
import { Catalog } from "@/components/catalog";
import { getRestaurants } from "@/lib/restaurants";
export default function Home() {
  return (
    <main id="main" className="container">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">YOUR NEXT KAINAN, RIGHT HERE.</p>
          <h1 id="hero-heading">
            Anong
            <br className="desktop-break" /> gusto mo?
          </h1>
          <p className="hero-description">
            Browse restaurants in Balanga and see
            <br className="desktop-break" /> their menus in one place.
          </p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/art/church.svg"
            alt=""
            fill
            priority
            sizes="(max-width:767px) 1px, 50vw"
          />
        </div>
      </section>
      <Suspense
        fallback={
          <div className="catalog-loading" role="status">
            Loading the demo directory…
          </div>
        }
      >
        <Catalog restaurants={getRestaurants()} />
      </Suspense>
      <aside className="closing-note">
        <span>LOCAL FINDS. LESS GUESSWORK.</span>
        <p>
          Sa susunod na “saan tayo?”
          <br />
          <strong>may menu ka nang titingnan.</strong>
        </p>
      </aside>
    </main>
  );
}
