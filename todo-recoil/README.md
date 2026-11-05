# Lista de tarefas com Recoil

To-do list em React em que todo o estado compartilhado (lista de tarefas e filtro ativo) vive em átomos e seletores do **Recoil**. É possível adicionar, concluir, remover e filtrar tarefas entre todas, pendentes e concluídas.

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├── atoms/
│   ├── tarefasAtom.js               # lista de tarefas
│   └── filtroAtom.js                # filtro ativo + constantes FILTROS
├── selectors/
│   ├── tarefasFiltradasSelector.js  # lista já filtrada (lista + filtro)
│   └── resumoTarefasSelector.js     # contagem de pendentes/concluídas
├── components/
│   ├── FormTarefa/                  # adicionar tarefa
│   ├── FiltroTarefas/               # alternar filtro
│   ├── ListaTarefas/                # renderizar lista filtrada
│   ├── ItemTarefa/                  # concluir / remover
│   └── ResumoTarefas/               # contador no cabeçalho
├── App.jsx
└── main.jsx                         # RecoilRoot envolvendo a aplicação
```

## Hooks usados

| Componente | Hook | Por quê |
|---|---|---|
| FiltroTarefas | `useRecoilState(filtroAtom)` | lê e altera o filtro |
| ListaTarefas | `useRecoilValue(tarefasFiltradasSelector)` | só lê a lista derivada |
| ResumoTarefas | `useRecoilValue(resumoTarefasSelector)` | só lê as contagens |
| FormTarefa, ItemTarefa | `useSetRecoilState(tarefasAtom)` | só escrevem na lista |

## Observação sobre versões

O Recoil (0.7.7) não é compatível com o React 19, por isso o projeto fixa o **React 18.3.1**.
