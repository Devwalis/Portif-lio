const carrosel = document.querySelector('#carrosel-img-projetos');
const btnProx = document.querySelector('#btn-prox');
const btnAnte = document.querySelector('#btn-ante');

// Cria um array com as imagens do carrosel
const imagens = [
  {
    id: '1',
    svg: 'application-programming-interface-animate.svg',
    titulo: 'Ecommerce',
    descricao: 'Construído com Java e Spring Boot com arquitetura de microsserviços',
  },
  {
    id: '2',
    svg: 'brain-sides-animate(1).svg',
    titulo: 'E-commerce',
    descricao: 'Construído com Java e Spring Boot com arquitetura de mic'
  }
  // Adicione mais imagens aqui...
];

// Função para criar o carrosel
function criarCarrosel() {
  const carroselHTML = imagens.map((imagem) => {
    return `
      <div class="carrosel-img-projetos">
        <img src="imagem/${imagem.svg}">
        <h3>${imagem.titulo}</h3>
        <p>${imagem.descricao}</p>
      </div>
    `;
  }).join('');

  carrosel.innerHTML = carroselHTML;
}

criarCarrosel();

// Variável para controlar a posição atual do carrosel
let posicaoAtual = 0;

// Função para trocar a imagem do carrosel
function trocarImagem() {
  const imagensCarrosel = carrosel.querySelectorAll('.carrosel-img-projetos');
  imagensCarrosel.forEach((imagem, index) => {
    if (index === posicaoAtual) {
      imagem.style.display = 'block';
    } else {
      imagem.style.display = 'none';
    }
  });
}

// Função para avançar para a próxima imagem
function proximo() {
  posicaoAtual = (posicaoAtual + 1) % imagens.length;
  trocarImagem();
}

// Função para voltar para a imagem anterior
function anterior() {
  posicaoAtual = (posicaoAtual - 1 + imagens.length) % imagens.length;
  trocarImagem();
}

// Adiciona eventos aos botões
btnProx.addEventListener('click', proximo);
btnAnte.addEventListener('click', anterior);

// Inicializa o carrosel com a primeira imagem
trocarImagem();
