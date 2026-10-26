import { ArrowUpLeft, CheckCheck, ListTodo } from 'lucide-react';
import { useTodos } from '../context/TodoContext';
import TodoFilters from './TodoFilters';
import TodoItem from './TodoItem';
export default function TodoList() {
  const { visibleTodos, filter, stats } = useTodos();
  const emptyCopy =
    stats.total === 0
      ? [
          'Um novo começo cabe aqui.',
          'Adicione sua primeira tarefa e dê espaço para o que importa.',
        ]
      : filter === 'pending'
        ? [
            'Tudo em dia. Respire!',
            'Você concluiu todas as suas tarefas. Aproveite essa sensação.',
          ]
        : [
            'As pequenas vitórias vêm aí.',
            'Suas tarefas concluídas vão aparecer por aqui.',
          ];
  return (
    <section className="tasks-section" aria-labelledby="tasks-title">
      <div className="tasks-heading">
        <h2 id="tasks-title">
          Sua lista<span>.</span>
        </h2>
        <span className="list-caption">
          <ListTodo size={15} /> No seu ritmo
        </span>
      </div>
      <TodoFilters />
      <p className="sr-only" role="status">
        {visibleTodos.length}{' '}
        {visibleTodos.length === 1 ? 'tarefa visível' : 'tarefas visíveis'}.
      </p>
      {visibleTodos.length ? (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className="empty-art">
            <CheckCheck size={38} strokeWidth={1.5} />
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✦</span>
          </div>
          <h3>{emptyCopy[0]}</h3>
          <p>{emptyCopy[1]}</p>
          {stats.total === 0 && (
            <a
              href="#new-task"
              onClick={() => document.getElementById('new-task')?.focus()}
            >
              <ArrowUpLeft size={16} /> Comece com algo simples
            </a>
          )}
        </div>
      )}
      <div className="list-footer">
        <span className="live-dot" />{' '}
        {stats.pending === 1
          ? '1 tarefa pendente'
          : `${stats.pending} tarefas pendentes`}
        <span className="footer-note">Pequenos passos, grandes avanços.</span>
      </div>
    </section>
  );
}
