"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const close = () => {
    setOpen(false);
    button.current?.focus();
  };
  return (
    <header
      className="site-header container"
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <Link
        className="brand"
        href="/"
        onClick={() => setOpen(false)}
        aria-label="Saan Tayo? Home"
      >
        <span className="wordmark">SAAN TAYO?</span>
        <span className="brand-location">
          BALANGA, BATAAN<span>FOOD DIRECTORY</span>
        </span>
      </Link>
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? (
          <X size={22} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
        )}
      </button>
      <nav
        id="main-nav"
        aria-label="Main navigation"
        className={open ? "main-nav is-open" : "main-nav"}
      >
        {[
          ["/", "Home"],
          ["/#restaurants", "Restaurants"],
          ["/about", "About"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (label === "Home" && path === "/") ||
              (label === "About" && path === "/about")
                ? "page"
                : undefined
            }
            onClick={() => {
              if (open) close();
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
