import { SubmitHandler, useForm } from "react-hook-form";
import { Collection } from "@prisma/client";
import { getCollections, postCollection } from "@/services/collectionService";
import { get } from "http";

type CreateCollectionProps = {
  onSuccess: () => void;
};

export default function CreateCollection({ onSuccess }: CreateCollectionProps) {
  const { register, handleSubmit } = useForm<CreateCollectionForm>();

  type CreateCollectionForm = {
    userId: number;
    name: string;
  };

  const createCollection: SubmitHandler<CreateCollectionForm> = async (data) => {
    try { 
        const response = await postCollection(data.name, 1);
        if(response.success) {
            onSuccess(); 
            console.log("Coleção criada com sucesso:", response.data);
        }
    }
    catch (error) {
      console.error("Erro ao criar coleção:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(createCollection)} className="form flex w-full relative">
      <input
        type="text"
        placeholder="Nome da coleção"
        className="bg-gray-200 text-body h-11 font-medium w-full max-w-3xl py-3 px-5 rounded-3xl" 
        {...register("name")}
      />
      <button className="absolute right-0 h-11 shadow-lg bg-linear-to-tl from-primary to-primary-hover text-white font-semibold py-2 px-6 rounded-3xl">
        Criar
      </button>
    </form>
  );
}
function userForm() {
  throw new Error("Function not implemented.");
}
