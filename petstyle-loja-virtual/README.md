# Pet&Style — Loja Virtual

Página inicial de uma loja fictícia de produtos para pets, feita com **Tailwind CSS via CDN** como exercício de front-end da EBAC.

## Seções

- **Header**: logotipo e menu com Flexbox, que vira menu "hambúrguer" no celular
- **Hero**: chamada principal, botões e imagem de destaque
- **Produtos**: 4 cards organizados com Grid (`grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-4`)
- **Depoimentos**: 3 frases de clientes fictícios (`md:grid-cols-3`)
- **Contato**: e-mail, telefone e formulário simples (sem envio real)

## Responsividade (mobile-first)

As classes sem prefixo valem para o celular, e os breakpoints vão adicionando ajustes:

| Breakpoint | Exemplos |
|---|---|
| base | uma coluna, menu escondido, botões ocupando a largura |
| `sm:` (640px) | produtos em 2 colunas, botões lado a lado, campos do formulário em 2 colunas |
| `md:` (768px) | menu horizontal, hero em 2 colunas, depoimentos em 3 colunas |
| `lg:` (1024px) | produtos em 4 colunas, contato em 5 colunas (2 + 3), títulos maiores |

## Estrutura

```
index.html
imagens/    ilustrações (SVG) usadas na página
```

## Como abrir

Abra o `index.html` no navegador. O Tailwind é carregado pelo CDN.
