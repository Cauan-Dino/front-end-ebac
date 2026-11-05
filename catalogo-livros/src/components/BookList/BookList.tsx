import { useEffect, useState } from 'react';
import type { Book } from '../../types/book';
import { getBooks, getErrorMessage } from '../../services/bookService';
import BookForm from '../BookForm/BookForm';
import BookItem from '../BookItem/BookItem';
import styles from './BookList.module.css';

// Responsabilidade: buscar os livros e manter a lista em estado.
// Cadastro e remoção ficam com BookForm e BookItem, que avisam a lista por callbacks.
function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchBooks = async (): Promise<void> => {
      try {
        const data = await getBooks();
        if (isActive) setBooks(data);
      } catch (err) {
        if (isActive) setError(getErrorMessage(err));
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchBooks();

    // Evita atualizar estado se o componente desmontar antes da resposta.
    return () => {
      isActive = false;
    };
  }, []);

  const handleBookCreated = (book: Book): void => {
    setBooks((current) => [...current, book]);
  };

  const handleBookDeleted = (id: string): void => {
    setBooks((current) => current.filter((book) => book._id !== id));
  };

  const handleBookUpdated = (updated: Book): void => {
    setBooks((current) => current.map((book) => (book._id === updated._id ? updated : book)));
  };

  const readCount = books.filter((book) => book.status === 'Lido').length;

  return (
    <section className={styles.secao}>
      <BookForm onBookCreated={handleBookCreated} />

      <div className={styles.cabecalhoLista}>
        <h2 className={styles.tituloLista}>Livros</h2>
        {books.length > 0 && (
          <p className={styles.contagem}>
            {readCount} de {books.length} lidos
          </p>
        )}
      </div>

      {isLoading && <p className={styles.aviso}>Carregando livros…</p>}

      {error && (
        <p className={styles.erro} role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && books.length === 0 && (
        <p className={styles.aviso}>Nenhum livro cadastrado. Use o formulário acima para adicionar o primeiro.</p>
      )}

      {books.length > 0 && (
        <ul className={styles.lista}>
          {books.map((book) => (
            <BookItem
              key={book._id}
              book={book}
              onBookDeleted={handleBookDeleted}
              onBookUpdated={handleBookUpdated}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default BookList;
