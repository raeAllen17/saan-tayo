import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export const metadata: Metadata = { title: "About the directory" };
export default function About() {
  return (
    <main id="main" className="container about-page">
      <span className="eyebrow">BALANGA MUNA. KAIN TAYO.</span>
      <h1>
        Less guessing.
        <br />
        More menu browsing.
      </h1>
      <p>
        Saan Tayo? is a local restaurant menu directory starting in Balanga
        City, Bataan. The idea is simple: see what’s on the menu before deciding
        where to eat.
      </p>
      <h2>A little preview of what’s next.</h2>
      <p>
        This is a frontend demo. All seven restaurants are fictional. Menu
        items, prices, and location labels are sample content, and the artwork
        is illustrative. We haven’t published any verified restaurant listings
        yet.
      </p>
      <h2>Built around the menu.</h2>
      <p>
        Browse by cuisine, search for a dish, and open a menu to see sample
        categories and prices. Future listings will need restaurant-verified
        information and permission to use their photos. The church illustration
        is original decorative artwork, not a verified depiction of a specific
        landmark.
      </p>
      <Link href="/#restaurants" className="primary-button">
        Explore the demo restaurants
        <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </main>
  );
}
