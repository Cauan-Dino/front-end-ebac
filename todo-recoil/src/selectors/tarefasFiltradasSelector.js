import { selector } from 'recoil';
import { tarefasAtom } from '../atoms/tarefasAtom';
import { filtroAtom, FILTROS } from '../atoms/filtroAtom';

// Seletor: estado derivado. Não guarda nada próprio; recalcula sempre que
// a lista ou o filtro mudam, e os componentes inscritos re-renderizam.
export const tarefasFiltradasSelector = selector({
  key: 'tarefasFiltradasSelector',
  get: ({ get }) => {
    const tarefas = get(tarefasAtom);
    const filtro = get(filtroAtom);

    switch (filtro) {
      case FILTROS.CONCLUIDAS:
        return tarefas.filter((tarefa) => tarefa.concluida);
      case FILTROS.PENDENTES:
        return tarefas.filter((tarefa) => !tarefa.concluida);
      default:
        return tarefas;
    }
  },
});
