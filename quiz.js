function getGame() { //funcao de execucao do jogo

  var cont = 0; //contador de numero de questoes
  var test; //variavel para testar se a resposta esta correta
  var id; //variavel que armazena a alternativa escolhida

  //chamada assincrona da api opentrivia
  (async() => {
   var data = await getData();
   updateQuestionN();
   getInfo(data,cont);
   getQuestions(data,cont);
   $(".button").click(function () { //evento de clicar uma alternativa
     id = $(this).attr('value');
     if(data.results[cont].correct_answer == id ) test = 0;
     updateScore(test);
     test= 1;
     cont++;
     if(cont == data.results.length){ //se o numero de questoes acabou terminar o jogo
       showResult();
     }
     else{ //continuacao do jogo caso ainda houver questoes
       updateQuestionN();
       getInfo(data,cont);
       updateQuestions(data,cont);
     }
     });
})()
}

//funcao assincrona para chamar a api opentriva e devolver uma variavel contendo um json
async function getData() {
   const response = await fetch('https://opentdb.com/api.php?amount=10')

     const obj = await response.json()

     return obj;
}

// funcao que atualiza as informacoes da pergunta
function getInfo(game,cont){
  document.getElementById("category").innerHTML =game.results[cont].category;
  document.getElementById("question").innerHTML =game.results[cont].question;
  var difficulty = capitalizeFirstLetter(game.results[cont].difficulty);
  document.getElementById("difficulty").innerHTML = difficulty;
}

//funcao para formatar o texto
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function clearQuestions(){
    for(var i = 1; i<=4; i++)$("#answer"+i).remove();
    $("#question").remove()
}

//funcao que constroe o quiz na primeira questao
function getQuestions(game,cont) {
  var arr = [1,2,3,4];
  var i;

  for ( i = 1; i <= 4; i++) {
    $('<div/>', {
        id: 'answer' + i,
        "class": 'choice',
    }).appendTo('#quiz');
  }

  if(game.results[cont].incorrect_answers.length==1){

      arr = [1,2];
      shuffle(arr);

      var $input = $('<input type="button" value="Alternativa" class = button id = button/>');
      $input.attr('value',  game.results[cont].correct_answer);
      $input.appendTo($('#answer'+ arr[0]));

      $input = $('<input type="button" value="Alternativa" class = button id = button/>');
      $input.attr('value',  game.results[cont].incorrect_answers[0]);
      $input.appendTo($('#answer'+ arr[1]));

      $input = $('<input type="button" value="Alternativa" class = button id = button3/>');
      $input.appendTo($('#answer'+ 3));

      $input = $('<input type="button" value="Alternativa" class = button id = button4/>');
      $input.appendTo($('#answer'+ 4));

     $('#answer3').hide();
     $('#answer4').hide();
  }
  else{
    shuffle(arr);

    var $input = $('<input type="button" value="Alternativa" class = button id = button/>');
    $input.attr('value',  game.results[cont].correct_answer);
    $input.appendTo($('#answer'+ arr[0]));

    $input = $('<input type="button" value="Alternativa" class = button id = button/>');
    $input.attr('value',  game.results[cont].incorrect_answers[0]);
    $input.appendTo($('#answer'+ arr[1]));

    $input = $('<input type="button" value="Alternativa" class = button id = button/>');
    $input.attr('value',  game.results[cont].incorrect_answers[1]);
    $input.appendTo($('#answer'+ arr[2]));

    $input = $('<input type="button" value="Alternativa" class = button id = button/>');
    $input.attr('value',  game.results[cont].incorrect_answers[2]);
    $input.appendTo($('#answer'+ arr[3]));
  }

}

//funcao que atualiza o quiz a partir da segunda questao

function updateQuestions(game,cont){
  var arr = [1,2,3,4];
  shuffle(arr);

  if(game.results[cont-1].incorrect_answers.length == 1 && game.results[cont].incorrect_answers.length > 1){
    $('#answer3').show();
    $('#answer4').show();
    document.getElementById('answer'+arr[0]).firstChild.value=game.results[cont].correct_answer;
    document.getElementById('answer'+arr[1]).firstChild.value=game.results[cont].incorrect_answers[0];
    document.getElementById('answer'+arr[2]).firstChild.value=game.results[cont].incorrect_answers[1];
    document.getElementById('answer'+arr[3]).firstChild.value=game.results[cont].incorrect_answers[2];

  }
  else if(game.results[cont-1].incorrect_answers.length > 1 && game.results[cont].incorrect_answers.length == 1 ){
    arr = [1,2];
    shuffle(arr);
    $('#answer3').hide();
    $('#answer4').hide();
    document.getElementById('answer'+arr[0]).firstChild.value=game.results[cont].correct_answer;
    document.getElementById('answer'+arr[1]).firstChild.value=game.results[cont].incorrect_answers[0];
  }
  else if(game.results[cont-1].incorrect_answers.length > 1 && game.results[cont].incorrect_answers.length > 1 ){
    document.getElementById('answer'+arr[0]).firstChild.value=game.results[cont].correct_answer;
    document.getElementById('answer'+arr[1]).firstChild.value=game.results[cont].incorrect_answers[0];
    document.getElementById('answer'+arr[2]).firstChild.value=game.results[cont].incorrect_answers[1];
    document.getElementById('answer'+arr[3]).firstChild.value=game.results[cont].incorrect_answers[2];

  }

}

//funcao que finaliza o quiz e deixa disponivel apertar um botao para jogar novamente
function showResult(){
  clearQuestions();
  var $input = $('<input type="button" value="Jogar novamente?" class = button id = exit />');
  $input.appendTo($('#quiz'));
  document.querySelector("#exit").addEventListener("click", function (){
  location.reload();
})
}

//funcao para sortear aleatoriamente os valores em um vetor, usado para sortear as posicoes das alternativas das questoes
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
