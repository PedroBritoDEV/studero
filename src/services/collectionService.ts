import { api } from "@/lib/api";

export async function getCollections() {
    const response = await api.get("/collections");   
    return response.data;
}

export async function postCollection(name: string, userId: number) {
    const response = await api.post("/collections", { name, userId });
    return response.data;
}

export async function deleteCollection(id: number) {
    const response = await api.delete("/collections", { data: { id } });
    return response.data;
}