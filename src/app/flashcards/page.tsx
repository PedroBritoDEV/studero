"use client";
import CreateCollection from "@/components/forms/createCollection";
import SectionDivider from "@/components/ui/sectionDivider";
import { getCollections, deleteCollection } from "@/services/collectionService";
import { useEffect, useState } from "react";
import { ResponseCollections } from "@/types/colections/ResponseCollections";

export default function Flashcards() {
  const [collections, setCollections] = useState<ResponseCollections[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCollections() {
    try {
      const response = await getCollections();
      setCollections(response.data);
    } catch (error) {
      console.error("Erro ao buscar coleções:", error);
    } finally {
      setLoading(false);
    }
  }
  async function handleDeleteCollection(id: number) {
    try {
      await deleteCollection(id); 
      loadCollections();
    } catch (error) { 
      console.error("Erro ao deletar coleção:", error);
    }
  }

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-title">Criar Coleções</h2>
      <CreateCollection onSuccess={loadCollections}/>
      <SectionDivider title="Coleções Criadas" />

      <div className="w-full max-w-3xl flex flex-col gap-2">
        {loading && <p>Carregando...</p>}

        {!loading && collections.length === 0 && (
          <p>Nenhuma coleção cadastrada.</p>
        )}

        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-white/60 rounded-lg px-4 py-2 shadow-md  flex items-center justify-between"
          >
            <h2 className="font-medium text-body text-lg">
              {collection.name}
            </h2>
            <i onClick={() => handleDeleteCollection(collection.id)} className="fa-solid fa-trash p-3 text-sm bg-linear-to-tl from-primary to-primary-hover text-white rounded-full cursor-pointer"></i>
          </div>
        ))}
      </div>
    </div>
  );
}
