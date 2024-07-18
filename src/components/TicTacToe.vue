<template>
  <div class="jogo">
    <div class="topo">
      <span class="material-symbols-outlined" alt="Menu" @mouseover="mostrarAba = true">
        menu
      </span>
    </div>
    <AbaLateral :mostrarAba="mostrarAba" @fechar="mostrarAba = false" />
    <div>
      <h1 class="anton-sc-regular">TicTacToe</h1>
    </div>
    <div class="tabuleiro-container">
      <div v-if="!modoSelecionado" class="optionsGame">
        <button @click="jogarVsCPU" class="botao-reiniciar" style="margin-right: 55px;">1vCPU</button>
        <button @click="jogar1v1" class="botao-reiniciar">1v1</button>
      </div>
      <div v-else class="tabuleiro">
        <div
          v-for="(celula, indice) in tabuleiro"
          :key="indice"
          class="celula"
          @click="fazerJogada(indice)"
          :class="{'celula-x': celula === 'X', 'celula-o': celula === 'O'}"
        >
          {{ celula }}
        </div>
      </div>
      <div v-if="modoSelecionado" class="bebas-neue-regular">{{ mensagemStatus }}</div>
      <button v-if="modoSelecionado" @click="reiniciarJogo" class="botao-reiniciar">Reiniciar Jogo</button>
    </div>
  </div>
</template>

<script>
import AbaLateral from './AbaLateral.vue';
import { state } from '../state.js'; // Importe o estado global

export default {
  components: {
    AbaLateral
  },
  data() {
    return {
      tabuleiro: Array(9).fill(null),
      jogadorAtual: 'X',
      vencedor: null,
      modoSelecionado: false,
      jogarContraCpu: false,
      mostrarAba: false
    };
  },
  computed: {
    mensagemStatus() {
      return this.vencedor
        ? `Vencedor: ${this.vencedor}`
        : this.tabuleiro.includes(null)
        ? `Próximo jogador: ${this.jogadorAtual}`
        : 'Empate!';
    }
  },
  methods: {
    fazerJogada(indice) {
      if (this.tabuleiro[indice] === null && !this.vencedor) {
        this.tabuleiro[indice] = this.jogadorAtual; // Atualização direta sem usar $set
        if (this.verificarVencedor()) {
          this.vencedor = this.jogadorAtual;
          if (this.jogarContraCpu) {
            state.partidasJogadas1vsCPU += 1;
            this.jogadorAtual === 'X' ? state.partidasGanhas += 1 : state.partidasPerdidas += 1;
          } else {
            state.partidasJogadas1vs1 += 1;
            state.partidasGanhas += 1;
          }
        } else if (!this.tabuleiro.includes(null)) {
          state.partidasEmpates += 1;
          this.jogarContraCpu ? state.partidasJogadas1vsCPU += 1 : state.partidasJogadas1vs1 += 1;
        } else {
          this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
          if (this.jogarContraCpu && this.jogadorAtual === 'O' && !this.vencedor) {
            this.jogadaCpu();
          }
        }
      }
    },
    verificarVencedor() {
      const combinacoesVencedoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      return combinacoesVencedoras.some(combinacao => {
        const [a, b, c] = combinacao;
        return (
          this.tabuleiro[a] &&
          this.tabuleiro[a] === this.tabuleiro[b] &&
          this.tabuleiro[a] === this.tabuleiro[c]
        );
      });
    },
    reiniciarJogo() {
      if (this.vencedor === 'O' && this.jogarContraCpu) {
        state.partidasPerdidas += 1;
      }
      this.tabuleiro = Array(9).fill(null);
      this.jogadorAtual = 'X';
      this.vencedor = null;
      this.modoSelecionado = false;
      this.jogarContraCpu = false;
    },
    jogar1v1() {
      this.modoSelecionado = true;
      this.jogarContraCpu = false;
    },
    jogarVsCPU() {
      this.modoSelecionado = true;
      this.jogarContraCpu = true;
    },
    jogadaCpu() {
      const melhorJogada = this.minimax(this.tabuleiro, 'O').indice;
      setTimeout(() => {
        this.fazerJogada(melhorJogada);
      }, 500);
    },
    minimax(tabuleiro, jogador) {
      const oponente = jogador === 'O' ? 'X' : 'O';

      // Verificar se há um vencedor
      if (this.verificarVencedorMinimax(tabuleiro, 'O')) return { pontuacao: 1 };
      if (this.verificarVencedorMinimax(tabuleiro, 'X')) return { pontuacao: -1 };
      if (!tabuleiro.includes(null)) return { pontuacao: 0 };

      const jogadasPossiveis = [];
      for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === null) {
          const jogada = {};
          jogada.indice = i;
          tabuleiro[i] = jogador;

          const resultado = this.minimax(tabuleiro, oponente);
          jogada.pontuacao = resultado.pontuacao;

          tabuleiro[i] = null;
          jogadasPossiveis.push(jogada);
        }
      }

      let melhorJogada;
      if (jogador === 'O') {
        let melhorPontuacao = -Infinity;
        for (let i = 0; i < jogadasPossiveis.length; i++) {
          if (jogadasPossiveis[i].pontuacao > melhorPontuacao) {
            melhorPontuacao = jogadasPossiveis[i].pontuacao;
            melhorJogada = jogadasPossiveis[i];
          }
        }
      } else {
        let melhorPontuacao = Infinity;
        for (let i = 0; i < jogadasPossiveis.length; i++) {
          if (jogadasPossiveis[i].pontuacao < melhorPontuacao) {
            melhorPontuacao = jogadasPossiveis[i].pontuacao;
            melhorJogada = jogadasPossiveis[i];
          }
        }
      }

      return melhorJogada;
    },
    verificarVencedorMinimax(tabuleiro, jogador) {
      const combinacoesVencedoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      return combinacoesVencedoras.some(combinacao => {
        const [a, b, c] = combinacao;
        return tabuleiro[a] === jogador && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c];
      });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&display=swap');

.anton-sc-regular {
  font-family: "Anton SC", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 100px;
  margin-top: 1px;
  color: blue;
}
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 35px;
  margin-top: 10px;
}

body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f0f0f0;
}

.jogo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95vw;
  height: 88vh;
  padding: 40px;
  border-radius: 10px;
  position: relative;
}

.topo {
  position: absolute;
  top: 10px;
  left: 20px;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
}

.topo img {
  height: 50px;
}

.tabuleiro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabuleiro {
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
  gap: 10px;
  margin-bottom: 20px;
}

.celula {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border: 2px solid #444;
  font-size: 3rem;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s;
}

.celula:hover {
  background-color: #f9f9f9;
}

.celula-x {
  color: #ff6347;
}

.celula-o {
  color: #4682b4;
}

.botao-reiniciar {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  transition: background-color 0.3s;
}

.botao-reiniciar:hover {
  background-color: rgb(0, 0, 80);
}

.optionsGame {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.material-symbols-outlined {
  color: black;
  font-size: 40px;
  cursor: pointer;
}

.material-symbols-outlined:hover {
  color: white;
  transition: 0.2s;
}
</style>
