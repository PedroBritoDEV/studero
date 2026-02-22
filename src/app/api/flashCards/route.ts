import prismaClient from "@/lib/prismaClient";
import { successResponse, errorResponse } from "@/lib/apiResponse";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const collectionId = Number(url.searchParams.get("collectionId"));
        if (!collectionId) {
            return errorResponse("collectionId é obrigatório", 400);
        }

        const collection = await prismaClient.collection.findUnique({
            where: { id: collectionId },
            include: { flashcards: true },
        });

        // Retorna apenas os flashcards da coleção
        return successResponse(collection?.flashcards ?? []);
    } catch (error) {
        console.error(error);
        return errorResponse("Erro ao buscar coleção", 500);
    }
}

export async function POST (request: Request) {
    try {
        const body = await request.json();
        const { question, answer, collectionId } = body; 
        if (!question || !answer) {
            return errorResponse("questão e reposta são obrigatórios", 400);
        }
        const newFlashcard = await prismaClient.flashcard.create({
            data: { question, answer, collectionId },
        });
        return successResponse(newFlashcard);
    }   catch (error) {
        console.error(error);       
        return errorResponse("Erro ao criar flashcard", 500);
    }
}   