/**
 * app.js
 * Ponto de entrada da aplicação. Importa as classes de classes.js
 * e inicializa o simulador quando o DOM estiver pronto.
 */

import { Estacionamento, InterfaceEstacionamento } from './classes.js';

document.addEventListener('DOMContentLoaded', () => {
    const estacionamento = new Estacionamento();

    // Testes rápidos no console, feitos durante o desenvolvimento
    // antes de integrar o método à interface (mantidos aqui como
    // documentação; podem ser removidos ou comentados livremente).
    console.log('Teste calcular(2.50):', estacionamento.calcular(2.50));
    console.log('Teste calcular(0.50):', estacionamento.calcular(0.50));

    new InterfaceEstacionamento(estacionamento);
});
