"use client";
import { useState } from "react";
import { RequestColections } from "@/types/colections/RequestCollection";

export default function Flashcards() {
  
  const [colections, setColection] = useState<RequestColections[]>([]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <button className="border-2 border-primary text-primary w-full max-w-3xl font-bold py-2 px-4 rounded">Cadastrar nova Coleção</button>

      <div className="flex items-center w-full max-w-3xl">
        <hr className="flex-1 border-t border-body/30" />
        <span className="px-4 text-center text-body font-bold">Coleções</span>
        <hr className="flex-1 border-t border-body/30" />
      </div>

      <div>
        
      </div>
    </div>
  );
}
