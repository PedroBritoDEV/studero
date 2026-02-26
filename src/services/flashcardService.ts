import { api } from "@/lib/api";
import { RequestFlashCard } from "@/types/flashcards/RequestFlashCard";

export async function getFlashcards(collectionId: number) {
  const response = await api.get(`/flashCards?collectionId=${collectionId}`);
  return response.data;
}

export async function postFlashcard(collectionId: number, question: string, answer: string) {
  const response = await api.post(`/flashCards`, { question, answer, collectionId } as RequestFlashCard);
  return response.data;
}

export async function putFlashCard(id: number, question : string, answer : string) {
  const response  = await api.put(`/flashCards`, {id, question ,answer })
  return response.data
}

export async function deleteFlashCard(id: number) {
  const response = await api.delete(`/flashCards`, { data: { id } });
  return response.data;
}

