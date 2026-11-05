// Status como union type: o compilador rejeita qualquer valor fora desses dois.
export type BookStatus = 'Lido' | 'Não lido';

export const BOOK_STATUSES: readonly BookStatus[] = ['Não lido', 'Lido'];

// Livro como existe na API (o crudcrud gera o _id).
export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

// Livro antes de ser salvo: mesmo formato, sem o _id.
export type NewBook = Omit<Book, '_id'>;

// Estado do formulário: idêntico a NewBook, nomeado pelo papel que cumpre.
export type BookFormData = NewBook;

// Eventos usados no formulário.
export type BookFormFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type BookFormSubmitEvent = React.FormEvent<HTMLFormElement>;
