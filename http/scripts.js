// ATENÇÃO: troque o valor abaixo pelo endpoint gerado no seu painel do CrudCrud.
// 1. Acesse https://crudcrud.com/
// 2. Copie o endpoint exibido (algo como https://crudcrud.com/api/xxxxxxxx)
// 3. Cole aqui embaixo, adicionando o nome do recurso no final (ex: /clientes)
const API_URL = 'https://crudcrud.com/api/SEU_ENDPOINT_AQUI/clientes';

const form = document.getElementById('form-cliente');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const listaClientes = document.getElementById('lista-clientes');
const listaVazia = document.getElementById('lista-vazia');
const mensagem = document.getElementById('mensagem');
const btnAtualizar = document.getElementById('btn-atualizar');

// Mostra uma mensagem de feedback na tela e também loga no console, para depuração
function exibirMensagem(texto, tipo = 'info') {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  console.log(`[${tipo.toUpperCase()}] ${texto}`);
}

// GET - busca todos os clientes cadastrados na API e manda renderizar na tela
async function buscarClientes() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar clientes: ${resposta.status}`);
    }

    const clientes = await resposta.json();
    console.log('Clientes recebidos da API:', clientes);
    renderizarClientes(clientes);
  } catch (erro) {
    console.error('Falha ao buscar clientes:', erro);
    exibirMensagem('Não foi possível carregar a lista de clientes.', 'erro');
  }
}

// Renderiza a lista de clientes no DOM
function renderizarClientes(clientes) {
  listaClientes.innerHTML = '';

  if (!clientes || clientes.length === 0) {
    listaVazia.hidden = false;
    return;
  }

  listaVazia.hidden = true;

  clientes.forEach((cliente) => {
    const item = document.createElement('li');
    item.className = 'item-cliente';

    const info = document.createElement('div');
    info.className = 'item-info';

    const nomeEl = document.createElement('strong');
    nomeEl.textContent = cliente.nome;

    const emailEl = document.createElement('span');
    emailEl.textContent = cliente.email;

    info.appendChild(nomeEl);
    info.appendChild(emailEl);

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => excluirCliente(cliente._id));

    item.appendChild(info);
    item.appendChild(btnExcluir);
    listaClientes.appendChild(item);
  });
}

// POST - cadastra um novo cliente na API
async function cadastrarCliente(nome, email) {
  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email }),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao cadastrar cliente: ${resposta.status}`);
    }

    const clienteCriado = await resposta.json();
    console.log('Cliente cadastrado com sucesso:', clienteCriado);
    exibirMensagem('Cliente cadastrado com sucesso!', 'sucesso');
    form.reset();
    buscarClientes();
  } catch (erro) {
    console.error('Falha ao cadastrar cliente:', erro);
    exibirMensagem('Não foi possível cadastrar o cliente.', 'erro');
  }
}

// DELETE - remove um cliente da API a partir do seu id (_id gerado pelo CrudCrud)
async function excluirCliente(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao excluir cliente: ${resposta.status}`);
    }

    console.log('Cliente excluído com sucesso. ID:', id);
    exibirMensagem('Cliente removido.', 'sucesso');
    buscarClientes();
  } catch (erro) {
    console.error('Falha ao excluir cliente:', erro);
    exibirMensagem('Não foi possível excluir o cliente.', 'erro');
  }
}

// Evento de envio do formulário de cadastro
form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if (!nome || !email) {
    exibirMensagem('Preencha nome e e-mail antes de cadastrar.', 'erro');
    return;
  }

  cadastrarCliente(nome, email);
});

btnAtualizar.addEventListener('click', buscarClientes);

// Busca os clientes já cadastrados assim que a página carrega
document.addEventListener('DOMContentLoaded', buscarClientes);
