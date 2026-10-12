# Agência Criativa Web — versão SASS

Projeto convertido de CSS puro (BEM) para SASS modular.

## Estrutura

```
├── index.html          → referencia css/estilos.css
├── css/
│   └── estilos.css     → CSS final compilado (não editar à mão)
└── scss/
    ├── estilos.scss    → arquivo principal (só @use)
    ├── _variaveis.scss → cores, fontes, espaçamentos, breakpoints
    ├── _mixins.scss    → botao, espacamento-secao, flex-centro, a-partir-de
    ├── _base.scss      → reset e elementos HTML
    ├── _layout.scss    → container, cabeçalho, hero, seções, grade, rodapé
    └── _componentes.scss → menu, botão, cartão, formulário
```

## Como compilar

```bash
npm install          # instala o sass (uma vez)
npm run sass         # compila scss/estilos.scss → css/estilos.css
npm run sass:watch   # recompila a cada alteração
npm run build        # versão minificada
```
