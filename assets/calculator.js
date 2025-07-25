const display = document.getElementById("display");
const botoes = document.querySelectorAll(".botoes button");

display.value = "";

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;

        if (valor === "Limpar") {
            display.value = "";
            return;
        }

        if (valor === "=") {
            try {
                const resultado = calcular(display.value);
                display.value = resultado;
            } catch {
                display.value = "Erro";
            }
            return;
        }

        display.value += valor;
    });
});

function calcular(expressao) {
    let operador;
    if (expressao.includes("+")) operador = "+";
    else if (expressao.includes("-")) operador = "-";
    else if (expressao.includes("X")) operador = "X";
    else if (expressao.includes("/")) operador = "/";
    else throw new Error("Operador inválido");

    const partes = expressao.split(operador);

    const num1 = parseFloat(partes[0].replace(/\./g, '').replace(',', '.'));
    const num2 = parseFloat(partes[1].replace(/\./g, '').replace(',', '.'));

    if (isNaN(num1) || isNaN(num2)) throw new Error("Número inválido");

    let resultado;
    switch (operador) {
        case "+": resultado = num1 + num2; break;
        case "-": resultado = num1 - num2; break;
        case "X": resultado = num1 * num2; break;
        case "/":
            if (num2 === 0) throw new Error("Divisão por zero");
            resultado = num1 / num2;
            break;
    };

    return resultado.toLocaleString('pt-BR');
};