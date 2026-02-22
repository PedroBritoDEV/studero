"use client";

import { ResponseFlashCard } from "@/types/flashcards/ResponseFlashCards";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFlashcards } from "@/services/flashcardService";

export default function Page() {
  const params = useParams();
  const colectionId = Number(params.id);

  const [flashCards, setFlashCards] = useState<ResponseFlashCard[]>([]);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  async function loadFlashCards() {
    if (!colectionId) return;
    try {
      const response = await getFlashcards(colectionId);
      // a API retorna { success, status, message, data }
      setFlashCards(response.data ?? []);
    } catch (error) {
      console.error("Erro ao buscar flashcards:", error);
    }
  }

  useEffect(() => {
    loadFlashCards();
  }, [colectionId]);


  function toggleFlip(id: number) {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Coleção: {colectionId}</h1>

      

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {flashCards.length === 0 && <p>Nenhum flashcard nesta coleção.</p>}

        {flashCards.map((fc) => (
          <div
            key={fc.id}
            style={{ perspective: 1000 }}
            className="cursor-pointer"
            onClick={() => toggleFlip(fc.id)}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s",
                transform: flipped[fc.id] ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
              className="relative w-full h-40"
            >
              <div
                className="absolute inset-0 bg-white rounded-lg shadow-lg p-4 flex items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-lg font-medium">{fc.question}</p>
              </div>

              <div
                className="absolute inset-0 bg-white rounded-lg shadow-lg p-4 flex items-center justify-center"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <p className="text-lg">{fc.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
