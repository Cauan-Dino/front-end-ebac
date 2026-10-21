import './ProdutoCard.css'

// Formata número como moeda brasileira (ex.: 42.9 -> R$ 42,90)
const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Componente reutilizável: tudo que ele mostra chega via props.
function ProdutoCard({ nome, preco, imagem, descricao, novo = false }) {
  return (
    <article className={`produto-card${novo ? ' produto-card--novo' : ''}`}>
      <div className="produto-card__imagem">
        {imagem ? (
          <img src={imagem} alt={nome} loading="lazy" />
        ) : (
          <span className="produto-card__sem-imagem" aria-hidden="true">
            {nome.charAt(0)}
          </span>
        )}
      </div>

      <div className="produto-card__corpo">
        <h3 className="produto-card__nome">{nome}</h3>
        <p className="produto-card__descricao">{descricao}</p>
        <p className="produto-card__preco">{formatarPreco(preco)}</p>
      </div>
    </article>
  )
}

export default ProdutoCard
