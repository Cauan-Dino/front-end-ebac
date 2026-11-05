import FormTarefa from './components/FormTarefa';
import FiltroTarefas from './components/FiltroTarefas';
import ListaTarefas from './components/ListaTarefas';
import ResumoTarefas from './components/ResumoTarefas';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.pagina}>
      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>Minhas tarefas</h1>
        <ResumoTarefas />
      </header>

      <FormTarefa />
      <FiltroTarefas />
      <ListaTarefas />
    </main>
  );
}

export default App;
