import { useState } from 'react';
import type { Book, BookStatus } from '../../types/book';
import { deleteBook, getErrorMessage, updateBook } from '../../services/bookService';
import styles from './BookItem.module.css';

export interface BookItemProps {
  book: Book;
  onBookDeleted: (id: string) => void;
  onBookUpdated: (book: Book) => void;
}

// Responsabilidade: exibir um livro e executar as ações sobre ele (DELETE e PUT).
function BookItem({ book, onBookDeleted, onBookUpdated }: BookItemProps) {
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (): Promise<void> => {
    setIsBusy(true);
    setError(null);
    try {
      await deleteBook(book._id);
      onBookDeleted(book._id);
    } catch (err) {
      setError(getErrorMessage(err));
      setIsBusy(false);
    }
  };

  // Opcional do exercício: alternar o status via PUT.
  const handleToggleStatus = async (): Promise<void> => {
    const nextStatus: BookStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
    const updated: Book = { ...book, status: nextStatus };

    setIsBusy(true);
    setError(null);
    try {
      await updateBook(updated);
      onBookUpdated(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsBusy(false);
    }
  };

  const isRead = book.status === 'Lido';

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <h3 className={styles.titulo}>{book.title}</h3>
        <p className={styles.autor}>{book.author}</p>
        {error && (
          <p className={styles.erro} role="alert">
            {error}
          </p>
        )}
      </div>

      <div className={styles.acoes}>
        <button
          type="button"
          className={`${styles.status} ${isRead ? styles.lido : styles.naoLido}`}
          onClick={handleToggleStatus}
          disabled={isBusy}
          aria-label={`Status: ${book.status}. Clique para marcar como ${isRead ? 'não lido' : 'lido'}.`}
        >
          {book.status}
        </button>
        <button
          type="button"
          className={styles.remover}
          onClick={handleDelete}
          disabled={isBusy}
          aria-label={`Remover ${book.title}`}
        >
          Remover
        </button>
      </div>
    </li>
  );
}

export default BookItem;
