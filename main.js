import './style.css';
import './script.js';
import { inicializarCadastroUsuario, atualizarSelectDonos } from './src/usuarios.js';
import { inicializarCadastroPet, renderizarHome } from './src/pets.js';
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa as lógicas de cadastro
  inicializarCadastroUsuario();
  
  // Inicializa o cadastro de pet e passa a função de atualizar a home como callback
  inicializarCadastroPet(() => {
    renderizarHome();
  });

  // Carrega os dados na tela pela primeira vez
  atualizarSelectDonos();
  renderizarHome();

  // Fecha o modal de detalhes quando clicar no botão 'X'
  const btnFecharModal = document.getElementById('fechar-modal');
  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', () => {
      document.getElementById('modal-detalhes').style.display = 'none';
    });
  }
});
