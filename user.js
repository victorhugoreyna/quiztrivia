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
function updateScore(test){
    if(test==0){
      player.score = player.score+10;
      document.getElementById("score").innerHTML = player.score;
    }
}
function updateQuestionN(){
  player.questionN = player.questionN + 1;
  document.getElementById("number").innerHTML = player.questionN;

}
