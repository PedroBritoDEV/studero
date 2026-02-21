import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismaClient";
import { successResponse, errorResponse } from "@/lib/apiResponse";


export async function GET() {
  try {
    const collections = await prismaClient.collection.findMany();
    return successResponse(collections);
  } catch (error) {
    console.error(error);
    return errorResponse("Erro ao buscar coleções", 500);
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, userId } = body;

    if (!name || !userId)
      return errorResponse("name e userId são obrigatórios", 400);

    const newCollection = await prismaClient.collection.create({
      data: { name, userId },
    });

    return successResponse(newCollection);
  } catch (error) {
    console.error(error);
    return errorResponse("Erro ao criar coleção", 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return errorResponse("id é obrigatório", 400);

    await prismaClient.collection.delete({ where: { id } });
    return successResponse({ message: "Coleção deletada com sucesso" });
  } catch (error) {
    console.error(error);
    return errorResponse("Erro ao deletar coleção", 500);
  }     
}