import { api } from "@/lib/api";
import { RequestFlashCard } from "@/types/flashcards/RequestFlashCard";

export async function getFlashcards(collectionId: number) {
  const response = await api.get(`/flashCards?collectionId=${collectionId}`);
  return response.data;
}

export async function postFlashcard(data: RequestFlashCard) {
  const response = await api.post(`/flashCards`, data);
  return response.data;
}

export async function deleteFlashcard(id: number) {
  const response = await api.delete(`/flashCards`, { data: { id } });
  return response.data;
}
