import { createGlobalStyle } from 'styled-components';

// Apenas reset e tipografia base. Todo o visual do card vive no próprio componente.
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
    background: #e9edf0;
    color: #1f2a30;
    -webkit-font-smoothing: antialiased;
  }
`;

export default GlobalStyle;
