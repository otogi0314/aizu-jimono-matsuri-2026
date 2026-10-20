"use client";

import { useEffect, useState } from "react";

const menuItems = [
  { href: "#top", label: "トップ" },
  { href: "#about", label: "祭りについて" },
  { href: "#recruit", label: "各種募集" },
  { href: "#experience", label: "コンセプト" },
  { href: "#sticker-rally", label: "シールラリー" },
  { href: "#sponsors", label: "協賛企業" },
  { href: "#access", label: "開催情報・アクセス" },
  { href: "#faq", label: "よくある質問" },
  { href: "#news", label: "お知らせ" },
];

export default function MenuHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <button
        className={`menu-toggle${open ? " is-open" : ""}`}
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="site-menu" className={open ? "is-open" : ""} aria-label="メインナビゲーション">
        <p>MENU</p>
        {menuItems.map((item, index) => (
          <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            {item.label}
          </a>
        ))}
      </nav>
      {open && <button className="menu-backdrop" type="button" aria-label="メニューを閉じる" onClick={() => setOpen(false)} />}
    </header>
  );
}
