/**
 * utils.js
 * Funções auxiliares e puras, sem estado e sem efeitos colaterais.
 * Todas recebem argumentos e devolvem um resultado, sem depender
 * de nada externo (DOM, variáveis globais, etc.) — por isso podem
 * ser testadas isoladamente com um simples console.log().
 */

/**
 * Arredonda um valor monetário para duas casas decimais,
 * evitando problemas de ponto flutuante (ex: 0.1 + 0.2 !== 0.3).
 * Função pura.
 *
 * @param {number} valor
 * @returns {number}
 */
export function arredondarParaCentavos(valor) {
    return Math.round(valor * 100) / 100;
}

/**
 * Formata um número como moeda brasileira (ex: 5 -> "R$ 5,00").
 * Função pura.
 *
 * @param {number} valor
 * @returns {string}
 */
export function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Monta o texto de uma faixa de valores para exibição na tabela
 * (ex: "R$ 2,00 a R$ 3,99" ou "A partir de R$ 10,00" quando não
 * há limite superior). Função pura: depende só dos dados da faixa.
 *
 * @param {{ valorMinimo: number, valorMaximo: number }} faixa
 * @returns {string}
 */
export function formatarFaixaValor(faixa) {
    return faixa.valorMaximo === Infinity
        ? `A partir de ${formatarMoeda(faixa.valorMinimo)}`
        : `${formatarMoeda(faixa.valorMinimo)} a ${formatarMoeda(faixa.valorMaximo)}`;
}

/**
 * Monta o HTML de uma linha <tr> da tabela de faixas a partir de
 * uma faixa. Função pura: não toca no DOM, apenas devolve uma string.
 *
 * @param {{ valorMinimo: number, valorMaximo: number, descricaoTempo: string }} faixa
 * @returns {string}
 */
export function criarLinhaTabelaHTML(faixa) {
    return `
        <tr>
            <td>${formatarFaixaValor(faixa)}</td>
            <td>${faixa.descricaoTempo}</td>
        </tr>
    `;
}
