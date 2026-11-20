"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, Menu, X } from "lucide-react";

const links = [
  ["About", "#about"], ["Projects", "#projects"], ["Benchmarks", "/benchmarks"],
  ["Experience", "#experience"], ["Skills", "#skills"], ["GitHub", "#github"],
  ["Contact", "#contact"],
] as const;

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  // The section ids live on the home route; on /benchmarks a bare "#projects" resolves to nothing.
  const to = (href: string) => (href.startsWith("#") && pathname !== "/" ? "/" + href : href);
  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const jump = () => document.getElementById(id)?.scrollIntoView();
    jump();
    // The hero keeps growing while fonts and the art settle, so the first jump lands short.
    window.addEventListener("load", jump);
    document.fonts?.ready.then(jump);
    return () => window.removeEventListener("load", jump);
  }, [pathname]);
  return (
    <header className="topbar">
      <a className="brand" href="#home" onClick={close}>
        <span className="brand-mark">DP</span>
        <span><b>Deyan Peshev</b><small>AI INFRASTRUCTURE &amp; CLOUD-NATIVE</small></span>
      </a>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? "nav nav-open" : "nav"}>
        {links.map(([label, href]) => (
          <a key={label} href={to(href)} onClick={e => {
            if (href.startsWith("#") && pathname !== "/") {
              // A hard navigation, so the browser itself scrolls to the section after the route swap.
              e.preventDefault();
              window.location.href = to(href);
              return;
            }
            close();
          }}>{label}</a>
        ))}
        <a className="nav-cta" href="mailto:deyan.peshev.cloud@gmail.com?subject=CV%20request">
          Request CV <Mail size={15} />
        </a>
      </nav>
    </header>
  );
}
