import { memo } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useTodoActions } from '../context/TodoContext';
const TodoItem = memo(function TodoItem({ todo }) {
  const { toggleTodo, removeTodo } = useTodoActions();
  // Apenas em desenvolvimento: permite validar a memoization pelo console.
  if (import.meta.env.DEV) console.count(`TodoItem render: ${todo.id}`);
  return (
    <li className={`todo-item${todo.completed ? ' is-complete' : ''}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          aria-label={`Concluir: ${todo.text}`}
        />
        <span className="checkbox-visual" aria-hidden="true">
          {todo.completed && <Check size={15} strokeWidth={3} />}
        </span>
        <span className="todo-text">{todo.text}</span>
      </label>
      <span className={`status-tag${todo.completed ? ' done' : ''}`}>
        {todo.completed ? 'Concluída' : 'Pendente'}
      </span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Remover: ${todo.text}`}
        title="Remover tarefa"
        onClick={() => removeTodo(todo.id)}
      >
        <Trash2 size={17} aria-hidden="true" />
      </button>
    </li>
  );
});
export default TodoItem;
