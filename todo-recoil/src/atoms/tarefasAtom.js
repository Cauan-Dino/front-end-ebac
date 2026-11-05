import { atom } from 'recoil';

// Átomo: a lista de tarefas é a "fonte da verdade" compartilhada.
// Cada tarefa: { id: number, texto: string, concluida: boolean }
export const tarefasAtom = atom({
  key: 'tarefasAtom',
  default: [
    { id: 1, texto: 'Estudar átomos e seletores do Recoil', concluida: true },
    { id: 2, texto: 'Criar o componente de filtro', concluida: false },
    { id: 3, texto: 'Subir o projeto no GitHub', concluida: false },
  ],
});
