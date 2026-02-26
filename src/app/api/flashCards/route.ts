import prismaClient from "@/lib/prismaClient";
import { successResponse, errorResponse } from "@/lib/apiResponse";
import { error } from "console";

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
        const { collectionId, question, answer  } = body; 
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

export async function PUT( request : Request) {
    try {
        const body = await request.json();
        const { id, question, answer } = body
        
        if (!id) return errorResponse("Id de FlashCard Inválido")

        await prismaClient.flashcard.update({
            where : {id : id},
            data : {
                question,
                answer,
            }
        });
    }
    catch(error) {
        console.error(error)
        return errorResponse("Erro ao Editar FlashCard")
    }
    
}

export async function DELETE ( request : Request) {
    try {
        const body = await request.json()
        const { id } = body
        if (!id) return errorResponse("Id inválido", 400)

        await prismaClient.flashcard.delete( {where: { id:  id}} )
        return successResponse("FlashCard Deletado!")
    }
    catch (error) {
        console.error(error);
        return errorResponse("Erro ao deletar coleção", 500);
    }

}