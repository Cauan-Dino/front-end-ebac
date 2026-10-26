import { useTodoActions, useTodos } from '../context/TodoContext';
const filters = [
  { id: 'all', label: 'Todas', count: 'total' },
  { id: 'pending', label: 'Pendentes', count: 'pending' },
  { id: 'completed', label: 'Concluídas', count: 'completed' },
];
export default function TodoFilters() {
  const { filter, stats } = useTodos();
  const { setFilter } = useTodoActions();
  return (
    <div className="filters" role="group" aria-label="Filtrar tarefas">
      {filters.map(({ id, label, count }) => (
        <button
          key={id}
          type="button"
          aria-pressed={filter === id}
          className={filter === id ? 'filter active' : 'filter'}
          onClick={() => setFilter(id)}
        >
          {label}
          <span aria-hidden="true">{stats[count]}</span>
        </button>
      ))}
    </div>
  );
}
