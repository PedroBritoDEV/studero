"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(0);

  const items = [
    { name: "Início", icon: "house", route: "/" },
    { name: "FlashCards", icon: "book", route: "/flashcards" },
    { name: "Mapas", icon: "map", route: "/maps" },
    { name: "Pefil", icon: "user", route: "/perfil" },
  ];

  return (
    <header className="order-2 bg-primary text-white h-16 flex items-center justify-center">
      <ul className="flex gap-6">
        {items.map((item, index) => (
          <li key={item.name}>
            <Link href={item.route}>
              <button
                onClick={() => setActive(index)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-300 ${
                  active === index
                    ? "bg-white text-blue-600"
                    : "text-white/70 hover:text-white"
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
    </header>
  );
}
