const carrosel = document.querySelector('#carrosel-img-projetos');
const btnProx = document.querySelector('#btn-prox');
const btnAnte = document.querySelector('#btn-ante');


const dadosPersonalizados = [
  {
    id: 868161423, 
    svg: 'LogoAmeComo.png', 
    descricao: 'Ame Como uma criança, um projeto', 
    link: 'https://ame-uma-crian-a-cdd.vercel.app/', 
  },
  {
    id: 891493600, 
    svg: 'RaizesEdu.svg',
    descricao: 'Projeto criado no cruso de programador de sistemas no senac',
    link: 'https://s8m-industrious-cavendish.circumeo-apps.net/',
  },
  
];


async function getProjetos() {
  const urlGitHub = 'https://api.github.com/users/Devwalis/repos';

  try {
    const response = await fetch(urlGitHub);
    if (!response.ok) throw new Error('Erro ao buscar projetos do GitHub');

    const data = await response.json();
    return data.filter(repo => dadosPersonalizados.some(dado => dado.id === repo.id)).map(repo => {
      
      const dadosRepo = dadosPersonalizados.find(dado => dado.id === repo.id);
      return {
        id: repo.id,
        svg: dadosRepo ? dadosRepo.svg : 'default-image.svg', 
        titulo: repo.name,
        descricao: dadosRepo ? dadosRepo.descricao : repo.description || 'Descrição não disponível',
        link: dadosRepo ? dadosRepo.link : repo.html_url,
      };
    });

  } catch (error) {
    console.error(error);
    return [];
  }
}


async function inicializarCarrosel() {
  const imagens = await getProjetos();
  criarCarrosel(imagens);
  trocarImagem(imagens); 

 
  btnProx.addEventListener('click', () => proximo(imagens));
  btnAnte.addEventListener('click', () => anterior(imagens));
}


function criarCarrosel(imagens) {
  const carroselHTML = imagens.map(imagem => {
    return `
      <div class="carrosel-img-projetos">
        <img src="imagem/${imagem.svg}" alt="${imagem.titulo}">
        <h3>${imagem.titulo}</h3>
        <p>${imagem.descricao}</p>
        <a href="${imagem.link}" target="_blank">Acessar projeto</a>
      </div>`;
  }).join('');
  carrosel.innerHTML = carroselHTML;
}


function trocarImagem(imagens) {
  const imagensCarrosel = carrosel.querySelectorAll('.carrosel-img-projetos');
  imagensCarrosel.forEach((imagem, index) => {
    if (index === posicaoAtual) {
      imagem.style.display = 'block'; 
    } else {
      imagem.style.display = 'none'; 
    }
  });
}


let posicaoAtual = 0;


function proximo(imagens) {
  posicaoAtual = (posicaoAtual + 1) % imagens.length; 
  trocarImagem(imagens); 
}


function anterior(imagens) {
  posicaoAtual = (posicaoAtual - 1 + imagens.length) % imagens.length; 
  trocarImagem(imagens); 
}


inicializarCarrosel();