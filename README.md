# Todo React Avançado — Em dia

Aplicação de lista de tarefas desenvolvida para o exercício de React avançado da EBAC. A interface **Em dia** permite organizar o dia com um layout responsivo, começando por dispositivos móveis.

## Funcionalidades

- Adicionar tarefas pelo botão ou pela tecla Enter; espaços extras são removidos.
- Concluir e reabrir tarefas.
- Remover tarefas individualmente.
- Filtrar por todas, pendentes e concluídas, com contadores.
- Acompanhar a porcentagem de conclusão.
- Manter a lista no `localStorage` depois de atualizar a página.
- Continuar trabalhando em memória se o navegador bloquear o salvamento.
- Navegar por teclado, com rótulos acessíveis e foco visível.

## Tecnologias

React 19, JavaScript, Context API, Vite, CSS com abordagem Mobile First e Lucide React. Testes com Vitest, Testing Library e jsdom. Não exige backend, banco de dados ou credenciais.

## Como rodar localmente

Requisito: Node.js 22.12 ou superior, com npm.

```bash
git clone --branch todo-react-avancado --single-branch https://github.com/Cauan-Dino/front-end-ebac.git
cd front-end-ebac
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://127.0.0.1:5173`.

Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

Para executar os testes:

```bash
npm test
```

## Organização

```text
public/
  favicon.svg
src/
  components/
    ProgressCard.jsx
    TodoFilters.jsx
    TodoForm.jsx
    TodoItem.jsx
    TodoList.jsx
  context/
    TodoContext.jsx
  hooks/
    useLocalStorage.js
  test/
    App.test.jsx
    setup.js
  App.jsx
  main.jsx
  styles.css
index.html
package.json
package-lock.json
vite.config.js
```

## Decisões de implementação

**Estado global e Context API:** `TodoProvider` usa `useState` para a lista e o filtro. `useTodos` e `useTodoActions` acessam os contextos com `useContext`, e sinalizam um erro se usados fora do Provider. Formulário, filtros, lista e resumo compartilham o mesmo estado. O texto digitado permanece local ao `TodoForm`.

**Hook customizado e useEffect:** `useLocalStorage` encapsula a sincronização de qualquer valor serializável com o navegador. O efeito depende da chave e do valor, e informa falhas de escrita. `readStoredValue` lê o estado inicial de forma preguiçosa. Dados JSON inválidos, formatos incorretos e IDs duplicados são descartados com segurança. A lista inicial é vazia. Os dados ficam apenas no navegador atual e não são sincronizados entre dispositivos ou abas.

**Memoization:** `useMemo` calcula a lista filtrada, as estatísticas e os valores dos contextos. `useCallback` mantém estáveis as ações. `React.memo` em `TodoItem` permite que tarefas inalteradas evitem renderizações quando outra tarefa muda. As atualizações preservam a referência dos objetos que não foram alterados. O contexto de ações é separado do contexto de dados para não invalidar esse benefício.

## Como validar a memoization

1. Execute `npm run dev` e abra o console do navegador.
2. Adicione duas tarefas. Cada item registra `TodoItem render: <id>` somente em desenvolvimento.
3. Digite uma terceira tarefa: os itens existentes não registram novos renders.
4. Conclua uma tarefa: somente o item alterado registra render.
5. Também é possível inspecionar os commits pelo Profiler do React Developer Tools.

O `StrictMode` pode chamar o render duas vezes em desenvolvimento. Compare os incrementos por ação, não o valor absoluto. Trocar filtros pode desmontar e remontar itens; nesse caso, um novo render é esperado. Os testes automatizados verificam que itens inalterados não renderizam novamente ao adicionar ou concluir outro item. O exemplo demonstra redução de renders; não afirma ganho de tempo medido em uma lista pequena.

## Escopo da entrega

Este trabalho está na branch **`todo-react-avancado`** do repositório **`Cauan-Dino/front-end-ebac`**, conforme solicitado. Os arquivos da aplicação ficam na raiz dessa branch. A branch `main` e as demais branches não são alteradas.
