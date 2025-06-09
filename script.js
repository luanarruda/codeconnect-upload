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

// Adiciona o FileReader ao input de upload
inputUpload.addEventListener('change', (event) => {
    const arquivoSelecionado = event.target.files[0];

    if (arquivoSelecionado) {
        lerConteudoDoArquivo(arquivoSelecionado)
            .then(resultado => {
                // --- AQUI ESTÃO AS MUDANÇAS ---

                // 1. Encontra a tag <img> principal para o preview
                const previewElement = document.querySelector('.main-imagem');

                // 2. Encontra o container e o parágrafo para o nome do arquivo
                const containerNome = document.querySelector('.container-imagem-nome');
                const pNomeArquivo = containerNome.querySelector('p');

                // 3. Atualiza a imagem com a pré-visualização
                previewElement.src = resultado.url;

                // 4. Atualiza o texto do parágrafo com o nome do arquivo
                pNomeArquivo.textContent = resultado.nome;
                
                // 5. Torna o container com o nome do arquivo visível
                // (Usando 'display: flex' se você quiser o nome e o 'x' lado a lado)
                containerNome.style.display = 'flex'; 
            })
            .catch(erro => {
                console.error('Ocorreu um erro ao ler o arquivo:', erro);
                alert('Não foi possível carregar a pré-visualização da imagem.');
            });
    }
});