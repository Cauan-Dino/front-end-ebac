// ---------------------------------------------------------------
// Cadastro de usuário — preenchimento de endereço via ViaCEP
// e persistência dos dados do formulário com localStorage.
// ---------------------------------------------------------------

const STORAGE_KEY = "cadastro-usuario:form-data";

const form = document.getElementById("cadastroForm");
const cepInput = document.getElementById("cep");
const cepStatus = document.getElementById("cepStatus");
const cepHint = document.getElementById("cepHint");
const statusLine = document.getElementById("statusLine");
const saveIndicator = document.getElementById("saveIndicator");
const clearBtn = document.getElementById("clearBtn");

const readonlyAddressFields = ["logradouro", "bairro", "cidade", "uf"];
const editableFields = ["nome", "email", "telefone", "cep", "numero", "complemento"];
const allPersistedFields = [...editableFields, ...readonlyAddressFields];

let cepDebounceTimer = null;
let saveIndicatorTimer = null;

// ---------------------------------------------------------------
// Persistência (Web Storage API)
// ---------------------------------------------------------------

function salvarNoStorage() {
  const dados = {};
  allPersistedFields.forEach((id) => {
    dados[id] = document.getElementById(id).value;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    mostrarIndicadorDeSalvamento();
  } catch (erro) {
    console.error("Não foi possível salvar no localStorage:", erro);
  }
}

function restaurarDoStorage() {
  let dadosSalvos;

  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    if (!bruto) return;
    dadosSalvos = JSON.parse(bruto);
  } catch (erro) {
    console.error("Não foi possível ler o localStorage:", erro);
    return;
  }

  allPersistedFields.forEach((id) => {
    if (dadosSalvos[id]) {
      document.getElementById(id).value = dadosSalvos[id];
    }
  });

  if (dadosSalvos.logradouro) {
    statusLine.textContent = "dados restaurados da última visita";
    statusLine.classList.add("is-active");
  }
}

function mostrarIndicadorDeSalvamento() {
  saveIndicator.textContent = "salvo neste dispositivo";
  saveIndicator.classList.add("is-visible");

  clearTimeout(saveIndicatorTimer);
  saveIndicatorTimer = setTimeout(() => {
    saveIndicator.classList.remove("is-visible");
  }, 1600);
}

function limparStorageEFormulario() {
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  limparCamposDeEndereco();
  cepStatus.textContent = "";
  cepStatus.className = "cep-input__status";
  cepHint.textContent = "Digite os 8 números — o resto preenchemos nós.";
  cepHint.classList.remove("error");
  statusLine.textContent = "ficha limpa";
  statusLine.classList.remove("is-active");
}

// ---------------------------------------------------------------
// Busca de endereço (Fetch API + ViaCEP)
// ---------------------------------------------------------------

function limparCamposDeEndereco() {
  readonlyAddressFields.forEach((id) => {
    document.getElementById(id).value = "";
  });
}

function formatarCep(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);
  if (numeros.length > 5) {
    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  }
  return numeros;
}

async function buscarEnderecoPorCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    return;
  }

  cepStatus.textContent = "…";
  cepStatus.className = "cep-input__status loading";
  cepHint.textContent = "Buscando endereço…";
  cepHint.classList.remove("error");

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (!resposta.ok) {
      throw new Error(`Falha na requisição (status ${resposta.status})`);
    }

    const dados = await resposta.json();

    if (dados.erro) {
      throw new Error("CEP não encontrado");
    }

    document.getElementById("logradouro").value = dados.logradouro || "";
    document.getElementById("bairro").value = dados.bairro || "";
    document.getElementById("cidade").value = dados.localidade || "";
    document.getElementById("uf").value = dados.uf || "";

    cepStatus.textContent = "✓";
    cepStatus.className = "cep-input__status ok";
    cepHint.textContent = "Endereço encontrado — revise antes de salvar.";
    cepHint.classList.remove("error");

    // Move o foco para o número da residência, já que o resto veio pronto.
    document.getElementById("numero").focus();

    salvarNoStorage();
  } catch (erro) {
    limparCamposDeEndereco();
    cepStatus.textContent = "!";
    cepStatus.className = "cep-input__status error";
    cepHint.textContent = "Não encontramos esse CEP. Confira os números e tente de novo.";
    cepHint.classList.add("error");
    console.error("Erro ao buscar CEP:", erro);
  }
}

// ---------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------

cepInput.addEventListener("input", (evento) => {
  evento.target.value = formatarCep(evento.target.value);

  clearTimeout(cepDebounceTimer);
  cepStatus.textContent = "";
  cepStatus.className = "cep-input__status";

  const numeros = evento.target.value.replace(/\D/g, "");
  if (numeros.length < 8) {
    limparCamposDeEndereco();
    cepHint.textContent = "Digite os 8 números — o resto preenchemos nós.";
    cepHint.classList.remove("error");
    return;
  }

  // Pequeno atraso para não disparar a requisição a cada tecla.
  cepDebounceTimer = setTimeout(() => {
    buscarEnderecoPorCep(evento.target.value);
  }, 400);
});

allPersistedFields.forEach((id) => {
  const campo = document.getElementById(id);
  campo.addEventListener("input", salvarNoStorage);
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  salvarNoStorage();

  statusLine.textContent = "cadastro salvo com sucesso";
  statusLine.classList.add("is-active");
});

clearBtn.addEventListener("click", limparStorageEFormulario);

// ---------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------

document.addEventListener("DOMContentLoaded", restaurarDoStorage);
