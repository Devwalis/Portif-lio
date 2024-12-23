const carrosel = document.querySelector('#carrosel-img-projetos');
const btnProx = document.querySelector('#btn-prox');
const btnAnte = document.querySelector('#btn-ante');


const dadosPersonalizados = [
  {
    
    id: 868161423, 
    titulo: 'Ame Como Uma Criança',
    svg: 'LogoAmeComo.png', 
    descricao:'O projeto web desenvolvido no curso CDD4.0 tem como objetivo causar impacto na mídia social e internet, documentando fotos. Trabalhado em grupo, promove \n colaboração socioemocional, sem fins lucrativos e com foco em ações sociais."', 
    link: 'https://ame-uma-crian-a-cdd.vercel.app/',
    link2: 'https://github.com/Devwalis/AmeUmaCrian-aCDD' 
  },
  {
    id: 891493600,
    titulo: 'Raizes da Educação',
    svg: 'RaizesEdu.png',
    descricao:'O projeto desenvolvido no SENAC, com Python, HTML, CSS e JavaScript, busca impactar a educação, oferecendo alfabetização gratuita e de qualidade para idosos. Uma ação social que conecta professores, alunos e instituições para melhorar o ensino.',
    link: 'https://s8m-industrious-cavendish.circumeo-apps.net ',
    link2:'https://github.com/meloim/raizes-edu'
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
        titulo:dadosRepo ? dadosRepo.titulo : repo.name,
        descricao: dadosRepo ? dadosRepo.descricao : repo.description || 'Descrição não disponível',
        link: dadosRepo ? dadosRepo.link : repo.html_url,
        link2: dadosRepo ? dadosRepo.link2 : repo.html_url,
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
        <div class="butons">
        <button><a href="${imagem.link}" target="_blank">Acessar projeto</a></button>
        <button><a href="${imagem.link2}" target="_blank">Acessar repositório</a></button>
        </div>
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