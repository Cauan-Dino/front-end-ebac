// Mensagem exibida enquanto o useEffect simula a busca dos produtos.
function Carregando() {
  return (
    <div className="carregando" role="status" aria-live="polite">
      <span className="carregando__grao" aria-hidden="true" />
      <p>Carregando...</p>
    </div>
  )
}

export default Carregando
