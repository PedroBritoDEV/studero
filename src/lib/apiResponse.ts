import { ApiResponse } from "@/types/ApiResponse";

export function successResponse<T>(
  data: T,
  message = "Sucesso",
  status = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    status,
    message,
    data,
  };

  return Response.json(response, { status });
}

export function errorResponse(
  message = "Erro interno",
  status = 500
) {
  const response: ApiResponse<null> = {
    success: false,
    status,
    message,
    data: null,
  };

  return Response.json(response, { status });
}