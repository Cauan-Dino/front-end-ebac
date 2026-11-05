# Estante — catálogo de livros

Aplicação em **React + TypeScript** que lista, cadastra, remove e atualiza livros em uma API REST do [crudcrud.com](https://crudcrud.com), usando **axios**.

## Como rodar

1. Gere uma URL em https://crudcrud.com (ela vale por 24 h ou 100 requisições).
2. Copie `.env.example` para `.env` e cole a URL, sem barra no final:

   ```
   VITE_API_URL=https://crudcrud.com/api/SEU_ID_AQUI
   ```

3. Instale e rode:

   ```bash
   npm install
   npm run dev
   ```

`npm run typecheck` roda apenas o compilador TypeScript.

## Estrutura

```
src/
├── types/book.ts              # Book, NewBook, BookStatus, BookFormData e tipos de evento
├── services/bookService.ts    # GET, POST, DELETE e PUT tipados + tratamento de erro
├── components/
│   ├── BookList/              # busca os livros (useEffect) e mantém a lista
│   ├── BookForm/              # formulário controlado + POST
│   └── BookItem/              # exibe um livro + DELETE e PUT (status)
├── App.tsx
└── main.tsx
```

## Tipagem

- `BookStatus = 'Lido' | 'Não lido'`: union type, então qualquer outro valor é erro de compilação.
- `Book` representa o livro vindo da API; `NewBook = Omit<Book, '_id'>` representa o livro antes de ser salvo.
- Props de cada componente em interfaces exportadas (`BookFormProps`, `BookItemProps`).
- Eventos do formulário tipados: `React.ChangeEvent<HTMLInputElement | HTMLSelectElement>` e `React.FormEvent<HTMLFormElement>`.
- Funções do serviço com retorno explícito (`Promise<Book[]>`, `Promise<Book>`, `Promise<void>`) e axios com genéricos (`api.get<Book[]>`).

## Funcionalidades

- Listar livros (GET)
- Adicionar livro (POST)
- Remover livro (DELETE)
- Alternar status Lido / Não lido clicando no selo (PUT, opcional do exercício)
- Mensagens de carregamento, lista vazia e erro, com `try/catch` em todas as requisições
