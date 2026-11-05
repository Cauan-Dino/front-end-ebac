import { selector } from 'recoil';
import { tarefasAtom } from '../atoms/tarefasAtom';

// Seletor extra: contagens derivadas da mesma lista.
export const resumoTarefasSelector = selector({
  key: 'resumoTarefasSelector',
  get: ({ get }) => {
    const tarefas = get(tarefasAtom);
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

    return {
      total: tarefas.length,
      concluidas,
      pendentes: tarefas.length - concluidas,
    };
  },
});
