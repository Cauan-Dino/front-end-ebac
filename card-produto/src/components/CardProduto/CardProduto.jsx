import { useState } from 'react';
import {
  CardContainer,
  CardInfo,
  CardNome,
  CardDescricao,
  CardPreco,
  CardBotao,
} from './CardProduto.styles';

const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function CardProduto({ nome, descricao, preco, adicionado = false }) {
  // Estado apenas visual, para demonstrar a troca de cor ao clicar.
  // Não há lógica real de carrinho (fora do escopo do exercício).
  const [estaAdicionado, setEstaAdicionado] = useState(adicionado);

  return (
    <CardContainer>
      <CardInfo>
        <CardNome>{nome}</CardNome>
        {descricao && <CardDescricao>{descricao}</CardDescricao>}
      </CardInfo>

      <CardPreco>{formatarPreco(preco)}</CardPreco>

      <CardBotao
        type="button"
        $adicionado={estaAdicionado}
        aria-pressed={estaAdicionado}
        onClick={() => setEstaAdicionado((atual) => !atual)}
      >
        {estaAdicionado ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'}
      </CardBotao>
    </CardContainer>
  );
}

export default CardProduto;
