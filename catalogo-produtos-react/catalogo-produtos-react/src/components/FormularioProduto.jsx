import { useState } from 'react'
import './FormularioProduto.css'

const formularioVazio = {
  nome: '',
  preco: '',
  descricao: '',
  imagem: '',
}

// Formulário controlado: o valor de cada campo vem do state
// e toda digitação passa pelo handleChange.
function FormularioProduto({ onCadastrar, desabilitado = false }) {
  const [dados, setDados] = useState(formularioVazio)
  const [erros, setErros] = useState({})
  const [mensagem, setMensagem] = useState('')

  function handleChange(evento) {
    const { name, value } = evento.target
    setDados((anteriores) => ({ ...anteriores, [name]: value }))
    setErros((anteriores) => ({ ...anteriores, [name]: '' }))
    setMensagem('')
  }

  function validar() {
    const novosErros = {}
    const preco = Number(dados.preco.replace(',', '.'))

    if (!dados.nome.trim()) novosErros.nome = 'Informe o nome do produto.'
    if (!dados.preco.trim()) novosErros.preco = 'Informe o preço.'
    else if (Number.isNaN(preco) || preco <= 0)
      novosErros.preco = 'Use um valor maior que zero, por exemplo 39,90.'
    if (!dados.descricao.trim())
      novosErros.descricao = 'Escreva uma descrição curta do produto.'

    return novosErros
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    onCadastrar({
      nome: dados.nome.trim(),
      preco: Number(dados.preco.replace(',', '.')),
      descricao: dados.descricao.trim(),
      imagem: dados.imagem.trim(),
    })

    setMensagem(`“${dados.nome.trim()}” foi adicionado ao catálogo.`)
    setDados(formularioVazio)
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <h2 className="formulario__titulo">Cadastrar produto</h2>

      <div className="campo">
        <label htmlFor="nome">Nome *</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={dados.nome}
          onChange={handleChange}
          placeholder="Ex.: Sul de Minas 500 g"
          required
          aria-invalid={Boolean(erros.nome)}
          aria-describedby={erros.nome ? 'erro-nome' : undefined}
        />
        {erros.nome && <p id="erro-nome" className="campo__erro">{erros.nome}</p>}
      </div>

      <div className="campo">
        <label htmlFor="preco">Preço (R$) *</label>
        <input
          id="preco"
          name="preco"
          type="text"
          inputMode="decimal"
          value={dados.preco}
          onChange={handleChange}
          placeholder="39,90"
          required
          aria-invalid={Boolean(erros.preco)}
          aria-describedby={erros.preco ? 'erro-preco' : undefined}
        />
        {erros.preco && <p id="erro-preco" className="campo__erro">{erros.preco}</p>}
      </div>

      <div className="campo">
        <label htmlFor="descricao">Descrição *</label>
        <textarea
          id="descricao"
          name="descricao"
          rows="4"
          value={dados.descricao}
          onChange={handleChange}
          placeholder="Torra, notas sensoriais, método indicado..."
          required
          aria-invalid={Boolean(erros.descricao)}
          aria-describedby={erros.descricao ? 'erro-descricao' : undefined}
        />
        {erros.descricao && (
          <p id="erro-descricao" className="campo__erro">{erros.descricao}</p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="imagem">URL da imagem (opcional)</label>
        <input
          id="imagem"
          name="imagem"
          type="url"
          value={dados.imagem}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <button type="submit" className="formulario__botao" disabled={desabilitado}>
        Cadastrar produto
      </button>

      {desabilitado && (
        <p className="formulario__aviso">Aguarde o catálogo carregar para cadastrar.</p>
      )}
      {mensagem && (
        <p className="formulario__sucesso" role="status">
          {mensagem}
        </p>
      )}
    </form>
  )
}

export default FormularioProduto
