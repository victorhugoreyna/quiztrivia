class User{
  constructor(score,questionN){
    this.score=score;
    this.questionN= questionN;
  }
}
player = new User(0,0);

function getScore() {
    return player.score;
}

function getQuestionN() {
    return player.questionN;
}

function updateScore(test){ //funcao para atualizar a pontuacao do jogador caso acertou a questao
    if(test==0){
      player.score = player.score+10;
      document.getElementById("score").innerHTML = player.score;
    }
}

function updateQuestionN(){ //atualizar o numero da questao atual
  player.questionN = player.questionN + 1;
  document.getElementById("number").innerHTML = player.questionN;

}
