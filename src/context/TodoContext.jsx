import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { readStoredValue, useLocalStorage } from '../hooks/useLocalStorage';

export const STORAGE_KEY = 'em-dia:todos:v1';
export const MAX_TODO_LENGTH = 160;
const TodoContext = createContext(null);
const TodoActionsContext = createContext(null);

function isTodoList(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (todo) =>
        todo &&
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        todo.text.trim().length > 0 &&
        todo.text.length <= MAX_TODO_LENGTH &&
        typeof todo.completed === 'boolean',
    ) &&
    new Set(value.map((todo) => todo.id)).size === value.length
  );
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() =>
    readStoredValue(STORAGE_KEY, [], isTodoList),
  );
  const [filter, setFilter] = useState('all');
  const { storageError } = useLocalStorage(STORAGE_KEY, todos);
  const addTodo = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_TODO_LENGTH) return false;
    const todo = { id: crypto.randomUUID(), text: trimmed, completed: false };
    setTodos((current) => [todo, ...current]);
    return true;
  }, []);
  const toggleTodo = useCallback((id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);
  const removeTodo = useCallback((id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);
  const visibleTodos = useMemo(
    () =>
      todos.filter(
        (todo) =>
          filter === 'all' ||
          (filter === 'completed' ? todo.completed : !todo.completed),
      ),
    [todos, filter],
  );
  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    return {
      total: todos.length,
      completed,
      pending: todos.length - completed,
    };
  }, [todos]);
  // Consumir apenas ações evita atualizações de contexto nos itens memoizados.
  const actions = useMemo(
    () => ({ addTodo, toggleTodo, removeTodo, setFilter }),
    [addTodo, toggleTodo, removeTodo],
  );
  const state = useMemo(
    () => ({ todos, filter, visibleTodos, stats, storageError }),
    [todos, filter, visibleTodos, stats, storageError],
  );
  return (
    <TodoActionsContext.Provider value={actions}>
      <TodoContext.Provider value={state}>{children}</TodoContext.Provider>
    </TodoActionsContext.Provider>
  );
}
export function useTodos() {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error('useTodos precisa estar dentro de TodoProvider.');
  return context;
}
export function useTodoActions() {
  const context = useContext(TodoActionsContext);
  if (!context)
    throw new Error('useTodoActions precisa estar dentro de TodoProvider.');
  return context;
}
