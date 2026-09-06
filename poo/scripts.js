'use strict';

/**
 * Representa uma faixa de preço/tempo do estacionamento.
 * Ex: pagando entre R$2,00 e R$3,99, o cliente tem direito a 60 minutos.
 */
class FaixaEstacionamento {
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
class ResultadoCalculo {
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
class Estacionamento {
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

        const faixaEncontrada = this.faixas.find((faixa) => faixa.contemplaValor(valorInserido));

        // Segurança extra: como a última faixa vai até Infinity, isso não deveria
        // acontecer, mas evita que o app quebre caso a tabela seja alterada no futuro.
        if (!faixaEncontrada) {
            return new ResultadoCalculo({
                sucesso: false,
                mensagem: 'Não foi possível calcular o tempo para esse valor.',
            });
        }

        const troco = this._arredondar(valorInserido - faixaEncontrada.valorMinimo);

        return new ResultadoCalculo({
            sucesso: true,
            mensagem: `Tempo liberado: ${faixaEncontrada.descricaoTempo}`,
            minutos: faixaEncontrada.minutos,
            troco,
        });
    }

    /**
     * Evita problemas de ponto flutuante (ex: 0.1 + 0.2 !== 0.3) ao lidar com dinheiro.
     */
    _arredondar(valor) {
        return Math.round(valor * 100) / 100;
    }
}

/**
 * Classe responsável por toda a interação com o DOM.
 * Mantém a lógica de negócio (Estacionamento) separada da lógica de interface.
 */
class InterfaceEstacionamento {
    constructor(estacionamento) {
        this.estacionamento = estacionamento;

        this.form = document.getElementById('form-estacionamento');
        this.inputValor = document.getElementById('valor');
        this.divResultado = document.getElementById('resultado');
        this.tabelaFaixasBody = document.querySelector('#tabela-faixas tbody');

        this._registrarEventos();
        this._renderizarTabelaFaixas();
    }

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
            Troco: ${this._formatarMoeda(resultado.troco)}
        `;
    }

    _renderizarTabelaFaixas() {
        const linhas = this.estacionamento.getTabelaFaixas().map((faixa) => {
            const faixaTexto = faixa.valorMaximo === Infinity
                ? `A partir de ${this._formatarMoeda(faixa.valorMinimo)}`
                : `${this._formatarMoeda(faixa.valorMinimo)} a ${this._formatarMoeda(faixa.valorMaximo)}`;

            return `
                <tr>
                    <td>${faixaTexto}</td>
                    <td>${faixa.descricaoTempo}</td>
                </tr>
            `;
        }).join('');

        this.tabelaFaixasBody.innerHTML = linhas;
    }

    _formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

// Ponto de entrada da aplicação
document.addEventListener('DOMContentLoaded', () => {
    const estacionamento = new Estacionamento();
    new InterfaceEstacionamento(estacionamento);
});
