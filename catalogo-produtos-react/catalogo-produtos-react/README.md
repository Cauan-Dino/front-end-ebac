# Torra Lenta — Catálogo de produtos em React

Exercício EBAC: catálogo de produtos feito com React + Vite, usando componentes, props, state, formulário controlado e `useEffect`.

## Como rodar

```bash
cd catalogo-produtos-react
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (geralmente http://localhost:5173).

## Estrutura

```
src/
├── assets/                  ilustrações SVG dos produtos
├── components/
│   ├── Carregando.jsx       mensagem exibida durante o carregamento
│   ├── FormularioProduto.jsx  formulário controlado de cadastro
│   └── ProdutoCard.jsx      card reutilizável (nome, preço, imagem, descrição via props)
├── data/
│   └── produtosIniciais.js  lista que simula a resposta de uma API
├── pages/
│   └── Catalogo.jsx         página principal com o state da lista
├── App.jsx
├── main.jsx
└── index.css                variáveis de cor e fonte
```

## O que foi aplicado

- **Componente com props**: `ProdutoCard` recebe `nome`, `preco`, `imagem` e `descricao` e não guarda nenhum estado próprio.
- **State e `.map()`**: a lista fica em `useState` na página `Catalogo` e cada item vira um `ProdutoCard`.
- **`useEffect` + `setTimeout`**: ao montar a página, um timer de 2 segundos simula a busca dos produtos. Enquanto isso aparece "Carregando...". O timer é cancelado no retorno do efeito.
- **Formulário controlado**: cada campo lê seu valor do state e atualiza via `onChange`. Nome, preço e descrição são obrigatórios; a imagem é opcional (sem ela, o card mostra a inicial do nome).
- **Cadastro**: ao enviar, o produto é validado, entra no início da lista e o formulário é limpo.
