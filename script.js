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
			resolve({url: leitor.result, nome: arquivo.name});
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
       try{
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

inputTags.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		const tagTexto = inputTags.value.trim();

		if (tagTexto !== '') {
			const tagNova = document.createElement("li");
			tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class= "remova-tag">`
			listaTags.appendChild(tagNova);
			tagsInput.value = '';
		}
	}
})