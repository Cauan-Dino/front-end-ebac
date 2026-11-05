import { useState } from 'react';
import type {
  Book,
  BookFormData,
  BookFormFieldEvent,
  BookFormSubmitEvent,
  BookStatus,
} from '../../types/book';
import { BOOK_STATUSES } from '../../types/book';
import { createBook, getErrorMessage } from '../../services/bookService';
import styles from './BookForm.module.css';

export interface BookFormProps {
  onBookCreated: (book: Book) => void;
}

const INITIAL_FORM: BookFormData = {
  title: '',
  author: '',
  status: 'Não lido',
};

// Responsabilidade: coletar os dados e enviar o POST.
function BookForm({ onBookCreated }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Um único handler para os três campos, usando o atributo name.
  const handleChange = (event: BookFormFieldEvent): void => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === 'status' ? (value as BookStatus) : value,
    }));
  };

  const handleSubmit = async (event: BookFormSubmitEvent): Promise<void> => {
    event.preventDefault();

    const title = formData.title.trim();
    const author = formData.author.trim();
    if (!title || !author) {
      setError('Preencha o título e o autor.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const created = await createBook({ title, author, status: formData.status });
      onBookCreated(created);
      setFormData(INITIAL_FORM);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.titulo}>Adicionar livro</h2>

      <div className={styles.campos}>
        <div className={styles.campo}>
          <label htmlFor="title" className={styles.rotulo}>Título</label>
          <input
            id="title"
            name="title"
            type="text"
            className={styles.entrada}
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex.: Grande Sertão: Veredas"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="author" className={styles.rotulo}>Autor</label>
          <input
            id="author"
            name="author"
            type="text"
            className={styles.entrada}
            value={formData.author}
            onChange={handleChange}
            placeholder="Ex.: João Guimarães Rosa"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="status" className={styles.rotulo}>Status</label>
          <select
            id="status"
            name="status"
            className={styles.entrada}
            value={formData.status}
            onChange={handleChange}
          >
            {BOOK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className={styles.erro} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.botao} disabled={isSubmitting}>
        {isSubmitting ? 'Adicionando…' : 'Adicionar livro'}
      </button>
    </form>
  );
}

export default BookForm;
