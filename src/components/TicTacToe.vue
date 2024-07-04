<template>
  <div class="jogo">
    <div class="topo">
      <router-link to="/perfil" class="link-editar-conta"><img src="../assets/default-profile.png" alt="Imagem default perfil"></router-link>
    </div>
    <div class="tabuleiro-container">
      <div class="tabuleiro">
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
      <div class="status">{{ mensagemStatus }}</div>
      <button @click="reiniciarJogo" class="botao-reiniciar">Reiniciar Jogo</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabuleiro: Array(9).fill(null),
      jogadorAtual: 'X',
      vencedor: null
    };
  },
  computed: {
    mensagemStatus() {
      return this.vencedor
        ? `Vencedor: ${this.vencedor}`
        : `Próximo jogador: ${this.jogadorAtual}`;
    }
  },
  methods: {
    fazerJogada(indice) {
      if (this.tabuleiro[indice] === null && !this.vencedor) {
        this.tabuleiro.splice(indice, 1, this.jogadorAtual);
        if (this.verificarVencedor()) {
          this.vencedor = this.jogadorAtual;
        } else {
          this.jogadorAtual = this.jogadorAtual === 'X' ? 'O' : 'X';
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
      this.tabuleiro = Array(9).fill(null);
      this.jogadorAtual = 'X';
      this.vencedor = null;
    }
  }
};
</script>

<style scoped>
body, html {
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
  left: 10px;
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

.status {
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.botao-reiniciar {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  transition: background-color 0.3s;
}

.botao-reiniciar:hover {
  background-color: #218838;
}
</style>