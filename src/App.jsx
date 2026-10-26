import { Check, CircleHelp, LayoutList, LockKeyhole, Sun } from 'lucide-react';
import { TodoProvider, useTodos } from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ProgressCard from './components/ProgressCard';
function Workspace() {
  const { storageError, stats } = useTodos();
  const today = new Date();
  const date = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today);
  const dateTime = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#main" aria-label="Em dia, início">
          <span className="brand-mark">
            <Check size={23} strokeWidth={3} />
          </span>
          em dia<span className="brand-period">.</span>
        </a>
        <div className="sidebar-label">SEU ESPAÇO</div>
        <a className="nav-active" href="#tasks-title">
          <LayoutList size={19} /> Minhas tarefas<span>{stats.total}</span>
        </a>
        <div className="sidebar-bottom">
          <span className="small-sun">
            <Sun size={24} />
          </span>
          <p>
            Um pouco de organização.
            <br />
            Um dia mais leve.
          </p>
          <div className="sidebar-line" />
          <span className="sidebar-footnote">FEITO PARA O SEU DIA A DIA</span>
        </div>
      </aside>
      <main id="main" className="workspace">
        <div className="topbar">
          <span>
            <span className="live-dot" /> Seu espaço de clareza
          </span>
          <time dateTime={dateTime}>{date}</time>
        </div>
        <header className="page-header">
          <div className="welcome">
            <Sun size={16} /> VAMOS COM CALMA, VAMOS EM FRENTE
          </div>
          <h1>
            Organize o dia.
            <br />
            <span>Abra espaço para você.</span>
          </h1>
          <p>
            Tire as ideias da cabeça e transforme uma tarefa de cada vez em
            conquista.
          </p>
        </header>
        {storageError && (
          <p className="storage-warning" role="alert">
            Não foi possível salvar neste navegador. Suas tarefas continuam
            disponíveis enquanto esta página estiver aberta.
          </p>
        )}
        <div className="content-grid">
          <div className="main-column">
            <TodoForm />
            <TodoList />
          </div>
          <ProgressCard />
        </div>
        <footer className="page-footer">
          <span>
            <LockKeyhole size={13} />{' '}
            {storageError
              ? 'Salvamento local indisponível'
              : 'Suas tarefas ficam salvas neste navegador'}
          </span>
          <span>
            <CircleHelp size={14} /> Simples por escolha. Leve por natureza.
          </span>
        </footer>
      </main>
    </div>
  );
}
export default function App() {
  return (
    <TodoProvider>
      <Workspace />
    </TodoProvider>
  );
}
