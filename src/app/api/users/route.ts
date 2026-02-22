import prismaClient from "@/lib/prismaClient";
import { NextResponse } from "next/server";

/**
 * GET → lista todos os usuários
 */
export async function GET() {
  try {
    const users = await prismaClient.user.findMany({
      include: { collections: true },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

/**
 * POST → cria um novo usuário
 * Body: { email: string, name?: string, password: string }
 */
export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !password)
      return NextResponse.json({ error: "email e password são obrigatórios" }, { status: 400 });

    // evita duplicados
    const existing = await prismaClient.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });

    const user = await prismaClient.user.create({
      data: { email, name, password },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
