import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container empty-state not-found">
      <span className="eyebrow">404 · NALIGAW?</span>
      <h1>Wala rito ang hanap mo.</h1>
      <p>Let’s head back to the restaurant directory.</p>
      <Link className="primary-button" href="/">
        Balik sa mga kainan →
      </Link>
    </main>
  );
}
