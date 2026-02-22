import { SubmitHandler, useForm } from "react-hook-form";

import { getFlashcards, postFlashcard } from "@/services/flashcardService";

type CreateFlashCardsProps = {
  onSuccess: () => void;
};

export function CreateFlashCards() {
  const { register, handleSubmit } = useForm<CreateFlashCardForm>();

  type CreateFlashCardForm = {
    question: string;
    answer: string;
  };
  return (
    <form
      onSubmit={handleCreate}
      className="w-full max-w-xl flex flex-col gap-2"
    >
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Pergunta"
        className="px-3 py-2 rounded border"
      />
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Resposta"
        className="px-3 py-2 rounded border"
      />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Adicionar flashcard
      </button>
    </form>
  );
}
