"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { getFlashcards } from "@/services/flashcardService";
import { ResponseFlashCard } from "@/types/flashcards/ResponseFlashCards";
import CreateFlashCards from "@/components/forms/createFlashCards";
import Link from "next/link";
import FlashCardItem from "@/components/base/flashcardItem";

export default function Page() {
  const params = useParams();
  const colectionId = Number(params.id);

  const [flashCards, setFlashCards] = useState<ResponseFlashCard[]>([]);
  // UseCallback evita recriação desnecessária da função em cada render
  const loadFlashCards = useCallback(async () => {
    if (!colectionId || isNaN(colectionId)) return;
    
    try {
      const response = await getFlashcards(colectionId);
      setFlashCards(response.data ?? []);
    } catch (error) {
      console.error("Erro ao carregar flashcards:", error);
    }
  }, [colectionId]);

  useEffect(() => {
    loadFlashCards();
  }, [loadFlashCards]);

  return (
    <div className="flex justify-start items-start flex-col w-full h-full max-h-screen">
      {flashCards.length > 0 && (
        <Link
          href={`/flashcards/${colectionId}/revisar`}
          className="text-white font-medium rounded-3xl shadow-lg bg-linear-to-tl h-10 from-primary to-primary-hover w-full flex justify-center mb-4 p-2 items-center"
        >
          Revisar coleção
        </Link>
      )}

      {/* O componente filho chama o loadFlashCards do pai via onSuccess */}
      <CreateFlashCards onSuccess={loadFlashCards} />

      <div className="w-full flex flex-1 overflow-auto gap-4 flex-col mt-6 no-scrollbar pb-10">
        {flashCards.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Nenhum flashcard encontrado. Crie o seu primeiro!</p>
        ) : (
          flashCards.map((flashCard) => (
            <FlashCardItem 
              key={flashCard.id} 
              flashCard={flashCard} 
              onUptadeComponent={loadFlashCards} 
            />
          ))
        )}
      </div>
    </div>
  );
}