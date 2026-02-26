"use client";

import { useState } from "react";
import { ResponseFlashCard } from "@/types/flashcards/ResponseFlashCards";
import { deleteFlashCard, putFlashCard } from "@/services/flashcardService";

type Props = {
  onUptadeComponent : () => void,
  flashCard: ResponseFlashCard;
}

export default function FlashCardItem({ onUptadeComponent, flashCard }: Props) {
  const [visible, setVisible] = useState(false);

  function toggleAnswer() {
    setVisible((prev) => !prev);
  }
  async function deleteCard(flashCardId : number) {
    try {
      const response = await deleteFlashCard(flashCardId)
      if (response.success) {
        onUptadeComponent()
        return
      }
       
    } catch (error) {
      console.error(error)
      return
    }
  }

  return (
    <div>
      {/* Pergunta */}
      <div className="bg-white py-2 px-5 rounded-2xl rounded-b-none shadow-md flex items-center justify-between">
        <h2 className="font-medium text-body text-lg wrap-break-word">
          {flashCard.question}
        </h2>

        <div className="flex text-gray-500 shrink-0">
          <i onClick={() => deleteCard(flashCard.id)} className="fa-solid fa-trash p-1 text-sm cursor-pointer"></i>
          <i className="fa-solid fa-pen p-1 text-sm cursor-pointer"></i>
        </div>
      </div>

      {/* Resposta */}
      <div className="relative">
        <p className="bg-white border-t border-gray-100 py-3 px-5 rounded-b-2xl shadow-md pr-8 wrap-break-word">
          {visible ? flashCard.answer : "••••••••••"}
        </p>

        <i
          onClick={toggleAnswer}
          className={`fa-solid ${
            visible ? "fa-eye-slash" : "fa-eye"
          } absolute right-6 top-1/2 -translate-y-1/2 text-sm cursor-pointer text-gray-600 hover:text-primary transition`}
        ></i>
      </div>
    </div>
  );
}