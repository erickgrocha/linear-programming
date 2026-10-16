

console.log("===SIMPLEX===");


//Importa o readline para facilitar a entrada de dados.
const leia = require('readline-sync');
let qtd_variaveis = leia.questionInt("Digite a quantidade de variaveis de decisao: ");

//Cria o array que vai guardar os coeficientes das variáveis.
let coef = [];

for(let i=0; i< qtd_variaveis; i++){
    coef.push(leia.questionFloat("Digite o valor do coef x"+(i+1)+": "));
}

//Cria o array principal das restrições
console.log("===Restrições===");
let qtd_Restricoes = leia.questionInt("Digite a quantidade de restricoes: ");

let matriz_restricoes = [];
let sinais = [];
let valor = [];

for(let i = 0; i<qtd_Restricoes; i++){
      let matriz_linha = [];
      console.log("Dados da Restrição "+(i+1)+" :");
    for(let j = 0; j<qtd_variaveis; j++){
       matriz_linha.push(leia.questionFloat("Digite o coef de x" + (j + 1) + " na restricao " + (i + 1) + ": "))
    }
    sinais.push(leia.question("Digite o SINAL dessa restricao: "));
    valor.push(leia.questionInt("Digite o VALOR da restricao: "))
      matriz_restricoes.push(matriz_linha);
    
}



