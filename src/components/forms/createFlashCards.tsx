import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Input from "../base/input";
import { postFlashcard } from "@/services/flashcardService";
import { useParams } from "next/navigation";

type CreateFlashCardsProps = {
  onSuccess: () => void;
};

type CreateFlashCardForm = {
  question: string;
  answer: string;
};

export default function CreateFlashCards({ onSuccess }: CreateFlashCardsProps) {
  const params = useParams();
  const colectionId = Number(params.id);

  const { control, handleSubmit, reset } = useForm<CreateFlashCardForm>({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit: SubmitHandler<CreateFlashCardForm> = async (data) => {
    try {
      const response = await postFlashcard(
        colectionId,
        data.question,
        data.answer
      );

      if (response.success) {
        reset({
          question: "",
          answer: "",
        });

        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao criar flashcard:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl flex flex-col gap-2 bg-white p-5 rounded-3xl shadow-md"
    >
      <Controller
        name="question"
        control={control}
        render={({ field }) => (
          <Input
            label="Pergunta"
            type="text"
            placeholder="Insira a pergunta:"
            {...field}
          />
        )}
      />

      <Controller
        name="answer"
        control={control}
        render={({ field }) => (
          <Input
            label="Resposta"
            type="text"
            placeholder="Insira a resposta:"
            {...field}
          />
        )}
      />

      <button
        type="submit"
        className="bg-linear-to-tl h-10 rounded-3xl from-success to-[#4d9980] mt-2 text-white font-semibold px-4 py-2"
      >
        Adicionar flashcard
      </button>
    </form>
  );
}