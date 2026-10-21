import cafeCerrado from '../assets/cafe-cerrado.svg'
import cafeMantiqueira from '../assets/cafe-mantiqueira.svg'
import cafeChapada from '../assets/cafe-chapada.svg'
import moedorManual from '../assets/moedor-manual.svg'

// Lista que simula a resposta de uma API.
// É carregada pelo useEffect da página Catalogo após um setTimeout.
const produtosIniciais = [
  {
    id: 1,
    nome: 'Cerrado Mineiro 250 g',
    preco: 42.9,
    imagem: cafeCerrado,
    descricao:
      'Torra média, notas de chocolate ao leite e castanha. Bom para coado e prensa francesa.',
  },
  {
    id: 2,
    nome: 'Mantiqueira de Minas 250 g',
    preco: 54.5,
    imagem: cafeMantiqueira,
    descricao:
      'Café de altitude com acidez cítrica e final adocicado. Torra clara, ideal para métodos filtrados.',
  },
  {
    id: 3,
    nome: 'Chapada Diamantina 250 g',
    preco: 61.0,
    imagem: cafeChapada,
    descricao:
      'Fermentação natural, notas de frutas vermelhas e mel. Lote pequeno, colheita 2026.',
  },
  {
    id: 4,
    nome: 'Moedor manual de cerâmica',
    preco: 189.9,
    imagem: moedorManual,
    descricao:
      'Mós de cerâmica com regulagem de moagem, do espresso à prensa francesa. Corpo em aço inox.',
  },
]

export default produtosIniciais
