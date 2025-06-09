const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
	inputUpload.click();
})

//Funcionalidade de leitura dos arquivos
function lerConteudoDoArquivo(arquivo) {
	return new Promise((resolve, reject) => {
		//responsavel por ler o arv q esta sendo recebido
		const leitor = new FileReader();
		leitor.onload = () => {
			resolve({ url: leitor.result, nome: arquivo.name });
		}
		leitor.onerror = () => {
			reject(new Error('Erro ao ler o arquivo ${arquivo.name}'));
		}

		//responsavel por ler o arquivo
		leitor.readAsDataURL(arquivo);
	})

}

const imagemPrincipal = document.querySelector('.main-imagem');
//muda o nome da imagem para o nome do arquivo
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

// Adiciona o FileReader ao input de upload
inputUpload.addEventListener('change', async (event) => {
	const arquivo = event.target.files[0];

	if (arquivo) {
		try {
			const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
			imagemPrincipal.src = conteudoDoArquivo.url;
			nomeDaImagem.textContent = conteudoDoArquivo.nome;
		} catch (erro) {
			console.error("erro ao ler o arquivo:");
		}
	}
});

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');



//remover tags
listaTags.addEventListener('click', (event) => {
	if (event.target.classList.contains('remova-tag')) {
		const tagParaRemover = event.target.parentElement;
		listaTags.removeChild(tagParaRemover);
	}
});

//definir possiveis tags
const tagsDisponiveis = ["Front-End", "Back-end", "Full-Stack", "JavaScript", "React", "Node.js", "HTML", "CSS", "Python", "Java", "C#", "PHP", "Swift", "TypeScript"];

async function verificaTagsDisponiveis(tagTexto) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(tagsDisponiveis.map(tag => tag.toLowerCase()).includes(tagTexto.toLowerCase()));
		}, 1000);
	});
}

//adicionar tags e validar
inputTags.addEventListener('keypress', async (event) => {
	if (event.key === 'Enter') {
	  event.preventDefault();
	  const tagTexto = inputTags.value.trim();
  
	  if (tagTexto !== '') {
		try {
		  const tagExiste = await verificaTagsDisponiveis(tagTexto);
  
		  if (tagExiste) {
			const tagOriginal = tagsDisponiveis.find(tag => tag.toLowerCase() === tagTexto.toLowerCase());
			const tagNova = document.createElement("li");
			tagNova.innerHTML = `<p>${tagOriginal}</p> <img src="./img/close-black.svg" class="remova-tag">`;
			listaTags.appendChild(tagNova);
			inputTags.value = '';
		  } else {
			alert("Tag não disponível. Por favor, escolha outra tag.");
		  }
  
		} catch (error) {
		  console.error("Erro ao verificar a tag:", error); // <-- Aqui você verá o erro real
		  alert("Erro ao verificar existência da tag. Verifique o console!");
		  return;
		}
	  }
	}
  });

  const botaoPublicar = document.querySelector('.botao-publicar');

  botaoPublicar.addEventListener('click', async(event) => {
	event.preventDefault();

	const nomeDoProjeto = document.getElementById("nome").value;
	const descricaoDoProjeto = document.getElementById("descricao").value;
	const tagsProjetos = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);

	console.log(nomeDoProjeto, descricaoDoProjeto, tagsProjetos);
  })

  

