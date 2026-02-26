"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFlashcards } from "@/services/flashcardService";
import { ResponseFlashCard } from "@/types/flashcards/ResponseFlashCards";
import CreateFlashCards from "@/components/forms/createFlashCards";

export default function Page() {
  const params = useParams();
  const colectionId = Number(params.id);

  const [flashCards, setFlashCards] = useState<ResponseFlashCard[]>([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  async function loadFlashCards() {
    if (!colectionId) return;
    const response = await getFlashcards(colectionId);
    setFlashCards(response.data ?? []);
  }

  useEffect(() => {
    loadFlashCards();
  }, [colectionId]);

  useEffect(() => {
    setIsFlipped(false);
    x.set(0); // reseta posição ao trocar de card
  }, [index]);

  function handleDragEnd(_: any, info: any) {
    if (Math.abs(info.offset.x) > 150) {
      // anima saída
      animate(x, info.offset.x > 0 ? 500 : -500, {
        duration: 0.3,
        onComplete: () => {
          setIndex((prev) => prev + 1);
        },
      });
    } else {
      // volta pro centro se não passou do limite
      animate(x, 0);
    }
  }

  if (!flashCards[index]) {
    return <p className="text-center mt-10">Acabaram os flashcards 🎉</p>;
  }

  const current = flashCards[index];

  return (
    <div className="flex flex-col h-full w-full p-4">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate }}
        onDragEnd={handleDragEnd}
        className="cursor-grab w-full h-1/2"
>
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-full"
          style={{ perspective: 1000 }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Frente */}
            <div
              className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-6"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-lg font-semibold text-center">
                {current.question}
              </p>
            </div>

            {/* Verso */}
            <div
              className="absolute inset-0 bg-white rounded-xl shadow-xl flex items-center justify-center p-6"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <p className="text-lg text-center">{current.answer}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="flex justify-between w-full mt-4">
        <p className="text-error font-medium"> Difícil (primeiras) </p>
        <p className="text-success font-medium"> Fácil (últimas) </p>
      </div>
    </div>
  );
}