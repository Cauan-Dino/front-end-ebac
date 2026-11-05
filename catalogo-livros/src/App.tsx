import BookList from './components/BookList/BookList';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.pagina}>
      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>Estante</h1>
        <p className={styles.subtitulo}>Os livros que você já leu e os que estão esperando a vez.</p>
      </header>
      <BookList />
    </main>
  );
}

export default App;
