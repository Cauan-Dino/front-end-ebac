import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';
import { STORAGE_KEY } from '../context/TodoContext';

async function addTask(user, text) {
  await user.type(screen.getByRole('textbox', { name: 'Nova tarefa' }), text);
  await user.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));
}

const savedTask = (id, text, completed = false) => ({ id, text, completed });

describe('Todo List', () => {
  it('adiciona com Enter, limpa o input e rejeita texto em branco', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Nova tarefa' });
    expect(
      screen.getByRole('button', { name: 'Adicionar tarefa' }),
    ).toBeDisabled();
    await user.type(input, '   ');
    expect(
      screen.getByRole('button', { name: 'Adicionar tarefa' }),
    ).toBeDisabled();
    await user.clear(input);
    await user.type(input, '  Estudar Context API  {Enter}');
    expect(screen.getByText('Estudar Context API')).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))[0].text).toBe(
      'Estudar Context API',
    );
  });

  it('conclui, reabre, filtra e remove tarefas', async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, 'Estudar hooks');
    await addTask(user, 'Revisar contexto');
    await user.click(
      screen.getByRole('checkbox', { name: 'Concluir: Estudar hooks' }),
    );
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '50',
    );
    await user.click(screen.getByRole('button', { name: 'Concluídas' }));
    expect(screen.getByText('Estudar hooks')).toBeInTheDocument();
    expect(screen.queryByText('Revisar contexto')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Pendentes' }));
    expect(screen.getByText('Revisar contexto')).toBeInTheDocument();
    expect(screen.queryByText('Estudar hooks')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Todas' }));
    await user.click(
      screen.getByRole('checkbox', { name: 'Concluir: Estudar hooks' }),
    );
    expect(
      screen.getByRole('checkbox', { name: 'Concluir: Estudar hooks' }),
    ).not.toBeChecked();
    await user.click(
      screen.getByRole('button', { name: 'Remover: Revisar contexto' }),
    );
    expect(screen.queryByText('Revisar contexto')).not.toBeInTheDocument();
    expect(
      within(screen.getByRole('list')).getAllByRole('listitem'),
    ).toHaveLength(1);
  });

  it('recupera tarefas e conclusão depois de remontar a aplicação', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await addTask(user, 'Persistir dados');
    await user.click(
      screen.getByRole('checkbox', { name: 'Concluir: Persistir dados' }),
    );
    unmount();
    render(<App />);
    expect(
      screen.getByRole('checkbox', { name: 'Concluir: Persistir dados' }),
    ).toBeChecked();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
  });

  it.each([
    '{json inválido',
    '{}',
    '[null]',
    '[{"id":"1","text":"","completed":false}]',
  ])('tolera armazenamento inválido: %s', (raw) => {
    localStorage.setItem(STORAGE_KEY, raw);
    render(<App />);
    expect(screen.getByText('Um novo começo cabe aqui.')).toBeInTheDocument();
  });

  it('continua funcionando quando o navegador bloqueia o salvamento', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Bloqueado');
    });
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível salvar',
    );
    await addTask(user, 'Continuar em memória');
    expect(screen.getByText('Continuar em memória')).toBeInTheDocument();
  });

  it('não renderiza novamente itens inalterados ao digitar, adicionar ou concluir outro item', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([savedTask('a', 'Tarefa A'), savedTask('b', 'Tarefa B')]),
    );
    const counter = vi.spyOn(console, 'count').mockImplementation(() => {});
    render(<App />);
    counter.mockClear();
    await addTask(user, 'Tarefa C');
    expect(counter).not.toHaveBeenCalledWith('TodoItem render: a');
    expect(counter).not.toHaveBeenCalledWith('TodoItem render: b');
    counter.mockClear();
    await user.click(
      screen.getByRole('checkbox', { name: 'Concluir: Tarefa B' }),
    );
    expect(counter).toHaveBeenCalledWith('TodoItem render: b');
    expect(counter).not.toHaveBeenCalledWith('TodoItem render: a');
  });
});
