/**
 * classes.js
 * Definição de todas as classes da aplicação (regras de negócio + interface).
 * A lógica de cálculo puro (arredondamento, formatação) fica em utils.js;
 * aqui ficam apenas o modelo de dados e o comportamento orientado a objetos.
 */

import { arredondarParaCentavos, formatarMoeda, criarLinhaTabelaHTML } from './utils.js';

/**
 * Representa uma faixa de preço/tempo do estacionamento.
 * Ex: pagando entre R$2,00 e R$3,99, o cliente tem direito a 60 minutos.
 */
export class FaixaEstacionamento {
    constructor(valorMinimo, valorMaximo, minutos, descricaoTempo) {
        this.valorMinimo = valorMinimo;
        this.valorMaximo = valorMaximo; // Infinity para a última faixa
        this.minutos = minutos;
        this.descricaoTempo = descricaoTempo;
    }

    /**
     * Verifica se um valor pago se encaixa nesta faixa.
     */
    contemplaValor(valor) {
        return valor >= this.valorMinimo && valor <= this.valorMaximo;
    }
}

/**
 * Resultado do cálculo: encapsula tudo que a interface precisa exibir.
 */
export class ResultadoCalculo {
    constructor({ sucesso, mensagem, minutos = null, troco = null }) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.minutos = minutos;
        this.troco = troco;
    }
}

/**
 * Classe principal: contém a tabela de faixas e a lógica de cálculo.
 * Encapsula as regras de negócio do estacionamento.
 */
export class Estacionamento {
    constructor() {
        this.VALOR_MINIMO_ACEITO = 1.00;

        // Tabela de faixas. Fácil de ajustar/estender aqui.
        this.faixas = [
            new FaixaEstacionamento(1.00, 1.99, 30, '30 minutos'),
            new FaixaEstacionamento(2.00, 3.99, 60, '1 hora'),
            new FaixaEstacionamento(4.00, 5.99, 90, '1h30'),
            new FaixaEstacionamento(6.00, 7.99, 120, '2 horas'),
            new FaixaEstacionamento(8.00, 9.99, 150, '2h30'),
            new FaixaEstacionamento(10.00, Infinity, 180, '3 horas'),
        ];
    }

    /**
     * Retorna a tabela de faixas (usada para renderizar a tabela de preços na tela).
     */
    getTabelaFaixas() {
        return this.faixas;
    }

    /**
     * Calcula o tempo liberado e o troco a partir do valor pago.
     * @param {number} valorInserido
     * @returns {ResultadoCalculo}
     */
    calcular(valorInserido) {
        if (typeof valorInserido !== 'number' || Number.isNaN(valorInserido)) {
            return new ResultadoCalculo({
                sucesso: false,
                mensagem: 'Informe um valor numérico válido.',
            });
        }

        if (valorInserido < this.VALOR_MINIMO_ACEITO) {
            return new ResultadoCalculo({
                sucesso: false,
                mensagem: 'Valor insuficiente. O mínimo aceito é R$ 1,00.',
            });
        }

        // find(): percorre as faixas e devolve a primeira que contempla o valor pago.
        const faixaEncontrada = this.faixas.find((faixa) => faixa.contemplaValor(valorInserido));

        // Segurança extra: como a última faixa vai até Infinity, isso não deveria
        // acontecer, mas evita que o app quebre caso a tabela seja alterada no futuro.
        if (!faixaEncontrada) {
            return new ResultadoCalculo({
                sucesso: false,
                mensagem: 'Não foi possível calcular o tempo para esse valor.',
            });
        }

        const troco = arredondarParaCentavos(valorInserido - faixaEncontrada.valorMinimo);

        return new ResultadoCalculo({
            sucesso: true,
            mensagem: `Tempo liberado: ${faixaEncontrada.descricaoTempo}`,
            minutos: faixaEncontrada.minutos,
            troco,
        });
    }
}

/**
 * Classe responsável por toda a interação com o DOM.
 * Mantém a lógica de negócio (Estacionamento) separada da lógica de interface.
 */
export class InterfaceEstacionamento {
    constructor(estacionamento) {
        this.estacionamento = estacionamento;

        this.form = document.getElementById('form-estacionamento');
        this.inputValor = document.getElementById('valor');
        this.divResultado = document.getElementById('resultado');
        this.tabelaFaixasBody = document.querySelector('#tabela-faixas tbody');

        this._registrarEventos();
        this._renderizarTabelaFaixas();
    }

    /**
     * Todos os eventos são registrados via addEventListener (nenhum
     * atributo inline como onsubmit/onclick é usado no HTML).
     */
    _registrarEventos() {
        this.form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            this._processarCalculo();
        });
    }

    _processarCalculo() {
        const valorDigitado = parseFloat(this.inputValor.value);
        const resultado = this.estacionamento.calcular(valorDigitado);

        this._exibirResultado(resultado);
    }

    /**
     * Atualiza a interface dinamicamente, sem recarregar a página.
     */
    _exibirResultado(resultado) {
        this.divResultado.hidden = false;
        this.divResultado.classList.remove('sucesso', 'erro');

        if (!resultado.sucesso) {
            this.divResultado.classList.add('erro');
            this.divResultado.innerHTML = `<strong>⚠️ ${resultado.mensagem}</strong>`;
            return;
        }

        this.divResultado.classList.add('sucesso');
        this.divResultado.innerHTML = `
            <strong>✅ ${resultado.mensagem}</strong>
            Troco: ${formatarMoeda(resultado.troco)}
        `;
    }

    /**
     * Monta a tabela de faixas usando reduce(): cada faixa é transformada
     * em uma linha HTML (função pura criarLinhaTabelaHTML) e concatenada
     * ao acumulador, resultando na string final da tabela.
     */
    _renderizarTabelaFaixas() {
        const linhas = this.estacionamento
            .getTabelaFaixas()
            .reduce((html, faixa) => html + criarLinhaTabelaHTML(faixa), '');

        this.tabelaFaixasBody.innerHTML = linhas;
    }
}
