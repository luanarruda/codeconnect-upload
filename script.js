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