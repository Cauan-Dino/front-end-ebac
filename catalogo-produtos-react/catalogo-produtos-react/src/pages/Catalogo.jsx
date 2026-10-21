import { useEffect, useState } from 'react'
import ProdutoCard from '../components/ProdutoCard'
import FormularioProduto from '../components/FormularioProduto'
import Carregando from '../components/Carregando'
import produtosIniciais from '../data/produtosIniciais'
import './Catalogo.css'

const TEMPO_DE_CARREGAMENTO = 2000 // ms

function Catalogo() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [ultimoCadastradoId, setUltimoCadastradoId] = useState(null)

  // Simula a busca dos produtos em uma API quando a página é montada.
  useEffect(() => {
    const timer = setTimeout(() => {
      setProdutos(produtosIniciais)
      setCarregando(false)
    }, TEMPO_DE_CARREGAMENTO)

    // Limpeza: cancela o timer se o componente for desmontado antes.
    return () => clearTimeout(timer)
  }, [])

  function adicionarProduto(produto) {
    const novoProduto = { ...produto, id: Date.now() }
    // Novos produtos entram no início da lista para aparecerem primeiro.
    setProdutos((atuais) => [novoProduto, ...atuais])
    setUltimoCadastradoId(novoProduto.id)
  }

  return (
    <div className="catalogo">
      <header className="catalogo__topo">
        <h1 className="catalogo__marca">Torra Lenta</h1>
        <p className="catalogo__sobre">
          Cafés especiais torrados em pequenos lotes e acessórios para preparar em casa.
        </p>
      </header>

      <main className="catalogo__conteudo">
        <section className="catalogo__lista" aria-labelledby="titulo-lista">
          <div className="catalogo__lista-topo">
            <h2 id="titulo-lista">Produtos</h2>
            {!carregando && (
              <p className="catalogo__contagem">
                {produtos.length} {produtos.length === 1 ? 'item' : 'itens'}
              </p>
            )}
          </div>

          {carregando ? (
            <Carregando />
          ) : produtos.length === 0 ? (
            <p className="catalogo__vazio">
              Nenhum produto ainda. Use o formulário para cadastrar o primeiro.
            </p>
          ) : (
            <div className="catalogo__grade">
              {produtos.map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  nome={produto.nome}
                  preco={produto.preco}
                  imagem={produto.imagem}
                  descricao={produto.descricao}
                  novo={produto.id === ultimoCadastradoId}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="catalogo__lateral">
          <FormularioProduto onCadastrar={adicionarProduto} desabilitado={carregando} />
        </aside>
      </main>

      <footer className="catalogo__rodape">
        <p>Exercício EBAC · React com Vite</p>
      </footer>
    </div>
  )
}

export default Catalogo
