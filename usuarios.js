import { Storage } from './storage.js';

export function inicializarCadastroUsuario() {
  const form = document.getElementById('formRegister'); // ID do seu HTML
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoUsuario = {
      id: 'user_' + Date.now(),
      nome: document.getElementById('regName').value,       // ID do seu HTML
      email: document.getElementById('regEmail').value,     // ID do seu HTML
      login: document.getElementById('regLogin').value,     // ID do seu HTML
      senha: document.getElementById('regPassword').value,  // ID do seu HTML
      endereco: document.getElementById('regAddress').value,// ID do seu HTML
    };

    Storage.salvarUsuario(novoUsuario);
    alert('Usuário cadastrado com sucesso!');
    form.reset();
    
    atualizarSelectDonos();
  });
}

export function atualizarSelectDonos() {
  const select = document.getElementById('petOwner'); // ID corrigido para o seu HTML
  if (!select) return;

  const usuarios = Storage.getUsuarios();
  select.innerHTML = '<option value="">Selecione o Dono</option>';
  
  usuarios.forEach(usuario => {
    select.innerHTML += `<option value="${usuario.id}">${usuario.nome}</option>`;
  });
}