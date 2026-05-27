import { Storage } from './storage.js';

export function inicializarCadastroPet(onPetCadastrado) {
  const form = document.getElementById('formPet'); // ID do seu HTML
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoPet = {
      id: document.getElementById('petId').value || 'pet_' + Date.now(),
      nome: document.getElementById('petName').value,
      raca: document.getElementById('petRace').value,
      cor: document.getElementById('petColor').value,
      idade: document.getElementById('petAge').value, // Mantido texto conforme placeholder "Ex: 2 anos"
      peso: parseFloat(document.getElementById('petWeight').value) || 0,
      dono: document.getElementById('petOwner').value, // ID do select corrigido
      foto: 'https://images.unsplash.com/photo-1567787799532-6644d658cf4d?w=400', // Exemplo estático ou capturado do arquivo
      obs: document.getElementById('petObs').value
    };

    Storage.salvarPet(novoPet);
    alert('Pet salvo com sucesso!');
    form.reset();
    
    if (onPetCadastrado) onPetCadastrado();
  });
}

export function renderizarHome() {
  const container = document.getElementById('petsGrid'); // ID do seu HTML (pets-grid)
  const emptyState = document.getElementById('emptyState');
  if (!container) return;

  const pets = Storage.getPets();
  container.innerHTML = '';

  if (pets.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  } else {
    if (emptyState) emptyState.style.display = 'none';
  }

  pets.forEach(pet => {
    const dono = Storage.getUsuarioPorId(pet.dono);
    const nomeDono = dono ? dono.nome : "Desconhecido";

    const card = document.createElement('div');
    card.className = 'pet-card'; // Mantém sua classe de estilo
    card.innerHTML = `
      <img src="${pet.foto}" alt="${pet.nome}" style="width:100%; border-radius:12px; max-height:200px; object-fit:cover;">
      <div class="pet-card-info" style="padding: 12px 0;">
        <h3 style="margin:0 0 8px 0;">${pet.nome}</h3>
        <p style="margin:4px 0;"><strong>Raça:</strong> ${pet.raca}</p>
        <p style="margin:4px 0;"><strong>Idade:</strong> ${pet.idade}</p>
        <p style="margin:4px 0;"><strong>Dono:</strong> ${nomeDono}</p>
      </div>
    `;

    card.addEventListener('click', () => exibirDetalhesPet(pet.id));
    container.appendChild(card);
  });
}

function exibirDetalhesPet(id) {
  const pet = Storage.getPetPorId(id);
  const dono = Storage.getUsuarioPorId(pet.dono);
  
  // Mapeado direto para os IDs da sua tela de Detalhes do HTML!
  document.getElementById('detailName').innerText = pet.nome;
  document.getElementById('detailRace').innerText = pet.raca;
  document.getElementById('detailColor').innerText = pet.cor || 'Não informada';
  document.getElementById('detailAge').innerText = pet.idade;
  document.getElementById('detailWeight').innerText = pet.peso ? `${pet.peso} kg` : 'Não informado';
  document.getElementById('detailOwner').innerText = dono ? dono.nome : 'Desconhecido';
  document.getElementById('detailPhoto').src = pet.foto;
  
  const obsSection = document.getElementById('detailObsSection');
  if (pet.obs) {
    document.getElementById('detailObs').innerText = pet.obs;
    if (obsSection) obsSection.style.display = 'block';
  } else {
    if (obsSection) obsSection.style.display = 'none';
  }

  // Alterna para a tela de detalhes (adicionando classe active e removendo das outras)
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screenPetDetail').classList.add('active');
}