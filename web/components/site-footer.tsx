import Link from "next/link";
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
          About this demo <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </footer>
  );
}
