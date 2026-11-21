import type { Metadata } from "next";
import "@fontsource/archivo/800.css";
import "@fontsource/archivo/900.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = {
  title: {
    default: "Saan Tayo? | Discover menus in Balanga",
    template: "%s | Saan Tayo?",
  },
  description:
    "Anong gusto mo? Explore a demo of the Balanga restaurant menu directory. Browse fictional restaurants, sample dishes, and menus.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
