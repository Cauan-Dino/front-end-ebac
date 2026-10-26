import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { MAX_TODO_LENGTH, useTodoActions } from '../context/TodoContext';
export default function TodoForm() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoActions();
  function handleSubmit(event) {
    event.preventDefault();
    if (addTodo(text)) setText('');
  }
  return (
    <section className="composer" aria-labelledby="new-task-title">
      <div className="section-eyebrow" id="new-task-title">
        <Plus size={15} /> UM PASSO DE CADA VEZ
      </div>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="new-task">
          Nova tarefa
        </label>
        <input
          id="new-task"
          autoComplete="off"
          placeholder="O que você quer tirar do papel?"
          maxLength={MAX_TODO_LENGTH}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className="add-button" disabled={!text.trim()} type="submit">
          <span>Adicionar tarefa</span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </button>
      </form>
      <div className="input-hint">
        <span>
          Pressione <kbd>Enter</kbd> para adicionar
        </span>
        <span>
          {text.length}/{MAX_TODO_LENGTH}
        </span>
      </div>
    </section>
  );
}
