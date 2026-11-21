import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <div>
        <Link className="footer-brand" href="/">
          SAAN TAYO?
        </Link>
        <p>Hanap kainan. Silip menu. Tara na.</p>
      </div>
      <div>
        <p>Made for discovering Balanga.</p>
        <Link href="/about">
          About this demo
          <ArrowUpRight size={22} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
