var timerId = null; // variavel que armazena a chamada da funcao timeout
function iniciaJogo(){
	var url = window.location.search;
	var nivel_jogo = url.replace('?', '')
	var tempo_segundos = 0;
	if (nivel_jogo == 1) { // 1 Fácil 120 segundos
		tempo_segundos = 120;
	}
	if (nivel_jogo == 2) { // 2 Normal 60 segundos
		tempo_segundos = 60;
	}
	if (nivel_jogo == 3) { // 3 Dificil 30 segundos
		tempo_segundos = 30;
	}
	// inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;
	// quantidade de baloes
	var qtde_baloes = 10;
	cria_baloes(qtde_baloes);
	// imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	// imprimir qtde baloes estourados
	document.getElementById('baloes_estourados').innerHTML = 0;
	contagem_tempo(tempo_segundos + 1);
}

function  contagem_tempo(segundos){
	// (funcao, milisegundos) executa tal funcao a cada milisegundos
	segundos = segundos - 1;
	if (segundos == -1){
		clearTimeout(timerId); // para a execucao da funcao do setTimeout
		game_over();
		return false;
	}
	setTimeout('contagem_tempo('+segundos+')', 1000);
	document.getElementById('cronometro').innerHTML = segundos;
}

function game_over(){
	alert('Fim de Jogo!')
}

function cria_baloes(qtde_baloes){
	for(var i = 1; i <= qtde_baloes; i++){
		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '12px';
		balao.id = 'balao' + i;
		balao.onclick = function(){ estourar(this)}
		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(balao){
	var id_balao = balao.id;
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);
	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
	if (baloes_inteiros == 0){
		alert('Parabens!! Voce Conseguiu!')
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}