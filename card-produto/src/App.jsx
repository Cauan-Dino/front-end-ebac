import styled from 'styled-components';
import CardProduto from './components/CardProduto';
import { produtos } from './data/produtos';

function App() {
  return (
    <Pagina>
      <Titulo>Cafés da semana</Titulo>
      <Grade>
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            nome={produto.nome}
            descricao={produto.origem}
            preco={produto.preco}
            adicionado={produto.adicionado}
          />
        ))}
      </Grade>
    </Pagina>
  );
}

const Pagina = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 20px;
`;

const Titulo = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
`;

// Grade responsiva: 1 coluna no celular, até 3 no desktop, sem media queries.
const Grade = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
`;

export default App;
