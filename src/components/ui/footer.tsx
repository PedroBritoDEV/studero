"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(0);

  const items = [
    { name: "Início", icon: "house", route: "/" },
    { name: "Cards", icon: "book", route: "/flashcards" },
    { name: "Mapas", icon: "map", route: "/maps" },
    { name: "Pefil", icon: "user", route: "/profile" },
  ];

  return (
    <footer className="order-2 bg-surface/70 text-body font-medium h-22 flex items-center justify-center rounded-3xl py-2 px-5 m-2">
      <ul className="flex justify-around w-full">
        {items.map((item, index) => (
          <li key={item.name}>
            <Link href={item.route}>
              <button
                onClick={() => setActive(index)}
                className={`flex items-center justify-center gap-2 w-18 h-16 p-4 rounded-2xl transition-all duration-300  ${
                  active === index
                    ? "bg-white/60 text-body shadow-2xl"
                    : "text-body hover:text-white/50"
                }`}
              >
                <div className="flex flex-col justify-center items-center">
                  <i className={`fa-duotone fa-solid fa-${item.icon}`}></i>
                  <span>{item.name}</span>
                </div>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
