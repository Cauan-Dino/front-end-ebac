import axios from 'axios';
import type { Book, NewBook } from '../types/book';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const RESOURCE = '/books';

export async function getBooks(): Promise<Book[]> {
  const { data } = await api.get<Book[]>(RESOURCE);
  return data;
}

export async function createBook(book: NewBook): Promise<Book> {
  const { data } = await api.post<Book>(RESOURCE, book);
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`${RESOURCE}/${id}`);
}

// O crudcrud recusa o _id no corpo do PUT, então ele é separado do resto.
export async function updateBook({ _id, ...rest }: Book): Promise<void> {
  await api.put(`${RESOURCE}/${_id}`, rest);
}

// Converte qualquer erro em uma mensagem legível para a interface.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!import.meta.env.VITE_API_URL) {
      return 'A URL da API não foi configurada. Crie o arquivo .env a partir do .env.example.';
    }
    if (error.response) {
      return `A API respondeu com erro ${error.response.status}. Se o endpoint do crudcrud expirou, gere um novo e atualize o .env.`;
    }
    return 'Não foi possível conectar à API. Verifique sua conexão e a URL no .env.';
  }
  return 'Ocorreu um erro inesperado.';
}
