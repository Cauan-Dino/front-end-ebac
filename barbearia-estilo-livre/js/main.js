// Validação do formulário de contato (sem envio real — fora do escopo do exercício)
const form = document.getElementById('formContato');
const sucesso = document.getElementById('sucesso');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  sucesso.classList.add('d-none');

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  sucesso.classList.remove('d-none');
  form.reset();
  form.classList.remove('was-validated');
});

// Fecha o menu no celular ao clicar em um link
document.querySelectorAll('#menuPrincipal .nav-link, #menuPrincipal .btn').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('menuPrincipal');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
