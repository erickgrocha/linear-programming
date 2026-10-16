const highsLoader = require("highs"); //Carrega o que está dentro da pastar do  highs
//Importa o readline para facilitar a entrada de dados.
const leia = require('readline-sync');//Carrega a readline


//Inicia o Simplex
console.log("===SIMPLEX===");




//Identifica o tipo do problema (Maximizar ou Minimizar)
let tipoObjetivo;

let objetivo = leia.question("Deseja maximizar ou minimizar? (max/min): ").toLowerCase();

    if(objetivo === "max"){
    tipoObjetivo = "Maximize";
}
else if(objetivo === "min"){
    tipoObjetivo = "Minimize";
}
else{
  console.log("Formato Inválido, digite (max/min)");
  process.exit(1);
}



//Inicia o highs
async function rodarHiGHS(coef, matriz_restricoes, sinais, valor) {
  const highs = await highsLoader(); //Recebe uma instância da função highsLoader, esperando temrinar.

   //Monta a linha da Função Objetivo
  let funcaoObjetivo = coef.map((c, idx) => `${c} x${idx + 1}`).join(" + ");

  //Monta no formato de texto
 let problemaTexto = `${tipoObjetivo}
  obj: ${funcaoObjetivo}
Subject To
`;


 // Monta cada restrição
    for (let i = 0; i < matriz_restricoes.length; i++) {
        let expressao = matriz_restricoes[i]
            .map((c, idx) => `${c} x${idx + 1}`)
            .join(" + ");

        problemaTexto += ` r${i + 1}: ${expressao} ${sinais[i]} ${valor[i]}\n`;
    }



    // Define os limites das restriçoes para cada variável do problema
    problemaTexto += "Bounds\n";

    for (let i = 0; i < coef.length; i++) {
        problemaTexto += ` x${i + 1} >= 0\n`;
    }

    // Finaliza o modelo LP
    problemaTexto += "End\n";

    // Mostra o modelo gerado para conferir
    console.log("\nModelo enviado ao HiGHS:\n");
    console.log(problemaTexto);

    





// Executa o solver usando o modelo montado
const resultado = highs.solve(problemaTexto);

  
//Exibe o status e o valor ótimo
console.log("\n=== Resultado ===");
console.log("Status:", resultado.Status);
console.log("Valor ótimo:", resultado.ObjectiveValue);

//Exibe o valor de cada variável
for (const nome in resultado.Columns) {
    console.log(nome + " =", resultado.Columns[nome].Primal);
}

  }


//Preenche o modelo
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

rodarHiGHS(coef, matriz_restricoes, sinais, valor);
 