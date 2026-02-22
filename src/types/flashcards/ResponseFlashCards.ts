import { RequestFlashCard } from "./RequestFlashCard";

export interface ResponseFlashCard extends RequestFlashCard {
    id: number;
    collectionId: number;
}