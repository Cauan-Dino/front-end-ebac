# CardProduto com Styled Components

Exercício de CSS-in-JS: um componente `CardProduto` (nome, preço e botão "Adicionar ao carrinho") estilizado inteiramente com **Styled Components**, com o botão mudando de cor conforme a prop `adicionado`.

| `adicionado` | Cor do botão |
|---|---|
| `true`  | `#198754` (verde) |
| `false` | `#6c757d` (cinza) |

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├── components/
│   └── CardProduto/
│       ├── CardProduto.jsx         # marcação e comportamento
│       ├── CardProduto.styles.js   # estilos (styled-components)
│       └── index.js
├── data/produtos.js                # dados estáticos
├── styles/GlobalStyle.js           # reset e fonte base
├── App.jsx                         # grade responsiva de cards
└── main.jsx
```

## Decisões

- **Prop transitória `$adicionado`**: o componente recebe `adicionado`, mas repassa ao botão estilizado como `$adicionado`, para que o atributo não vá para o DOM.
- **Nomes com prefixo `Card`**: todos os styled components do card começam com `Card`, deixando claro a quem pertencem.
- **Responsividade**: a grade usa `repeat(auto-fill, minmax(260px, 1fr))`, então se adapta do celular ao desktop sem media queries.
- **Clique no botão**: alterna o estado apenas visualmente; não há lógica real de carrinho, que está fora do escopo.
