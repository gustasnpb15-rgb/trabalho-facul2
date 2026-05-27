// Dados iniciais para o sistema não iniciar totalmente vazio
const usuariosIniciais = [
  { id: "u1", nome: "Carlos Silva", email: "carlos@email.com", login: "carlos", senha: "123", endereco: "Rua A, 123" },
  { id: "u2", nome: "Beatriz Ribeiro", email: "bia@email.com", login: "biar", senha: "123", endereco: "Av B, 456" }
];

const petsIniciais = [
  { 
    id: "p1", 
    nome: "Thor", 
    raca: "Rottweiler", 
    cor: "Preto e Canela", 
    idade: 3, 
    peso: 42.5, 
    dono: "u1", 
    foto: "https://images.unsplash.com/photo-1567787799532-6644d658cf4d?w=400" 
  },
  { 
    id: "p2", 
    nome: "Luna", 
    raca: "Vira-lata (SRD)", 
    cor: "Caramelo", 
    idade: 2, 
    peso: 12.0, 
    dono: "u2", 
    foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400" 
  }
];

// Inicializa o LocalStorage com os exemplos se for a primeira vez rodando
if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(usuariosIniciais));
}
if (!localStorage.getItem("pets")) {
  localStorage.setItem("pets", JSON.stringify(petsIniciais));
}

// Funções auxiliares para exportar
export const Storage = {
  getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  },
  salvarUsuario(usuario) {
    const usuarios = this.getUsuarios();
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  },
  getPets() {
    return JSON.parse(localStorage.getItem("pets")) || [];
  },
  salvarPet(pet) {
    const pets = this.getPets();
    pets.push(pet);
    localStorage.setItem("pets", JSON.stringify(pets));
  },
  getPetPorId(id) {
    return this.getPets().find(pet => pet.id === id);
  },
  getUsuarioPorId(id) {
    return this.getUsuarios().find(u => u.id === id);
  }
};