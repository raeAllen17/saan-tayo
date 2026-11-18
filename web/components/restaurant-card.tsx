import Image from "next/image";
import Link from "next/link";
import type { Restaurant } from "@/lib/restaurants";
import { ArrowIcon } from "./icons";
export function RestaurantCard({
  restaurant: r,
  returnQuery = "",
}: {
  restaurant: Restaurant;
  returnQuery?: string;
}) {
  return (
    <Link
      className="restaurant-card"
      href={`/restaurants/${r.slug}${returnQuery}`}
    >
      <div className="card-art">
        {r.image ? (
          <Image
            src={r.image}
            alt=""
            fill
            sizes="(max-width:639px) 104px, (max-width:1023px) 45vw, 30vw"
          />
        ) : (
          <div className="image-fallback">
            <span>SAAN TAYO?</span>
            <strong>
              Lutong
              <br />
              bahay.
            </strong>
            <small>PHOTO COMING SOON</small>
          </div>
        )}
        <span className="art-caption">
          {r.image ? "DEMO ILLUSTRATION" : "NO PHOTO YET"}
        </span>
      </div>
      <div className="card-body">
        <div>
          <span className="demo-label">DEMO RESTAURANT</span>
          <h3>{r.name}</h3>
          <p>{r.cuisines.join(" · ")}</p>
          <p className="card-location">Balanga City</p>
        </div>
        <span className="card-arrow">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
