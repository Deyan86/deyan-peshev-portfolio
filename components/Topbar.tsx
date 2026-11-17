"use client";

import { useState } from "react";
import { Download, Menu, X } from "lucide-react";

const links = [
  ["About", "#about"], ["Projects", "#projects"], ["Benchmarks", "/benchmarks"],
  ["Experience", "#experience"], ["Skills", "#skills"], ["GitHub", "#github"],
  ["Contact", "#contact"],
] as const;

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
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
          <a key={label} href={href} onClick={close}>{label}</a>
        ))}
        <a className="nav-cta" href="/Deyan_Peshev_CV.pdf" target="_blank">
          Download CV <Download size={15} />
        </a>
      </nav>
    </header>
  );
}
