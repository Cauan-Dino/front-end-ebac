import styled, { css } from 'styled-components';

// Cores exigidas pelo exercício, centralizadas para não ficarem "mágicas" no CSS.
const CORES_BOTAO = {
  adicionado: '#198754',
  naoAdicionado: '#6c757d',
};

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #d5dce1;
  border-radius: 12px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #9aa8b1;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const CardNome = styled.h2`
  font-size: 1.125rem;
  font-weight: 800;
  line-height: 1.3;
  color: #1f2a30;
`;

export const CardDescricao = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #5a6870;
`;

export const CardPreco = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #1f2a30;
`;

// O "$" torna a prop transitória: o styled-components a usa no CSS,
// mas não a repassa para o <button> do DOM (evita warning do React).
export const CardBotao = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease, filter 0.2s ease;

  background-color: ${({ $adicionado }) =>
    $adicionado ? CORES_BOTAO.adicionado : CORES_BOTAO.naoAdicionado};

  ${({ $adicionado }) =>
    $adicionado &&
    css`
      box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
    `}

  &:hover {
    filter: brightness(0.92);
  }

  &:focus-visible {
    outline: 3px solid #1f2a30;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
