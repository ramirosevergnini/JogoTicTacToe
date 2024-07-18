<template>
    <div class="estatisticas-container">
      <div class="status-container">
        <h2 class="bebas-neue-regular">Estatísticas</h2>
        <div class="information-container">
            <p>Partidas jogadas 1vsCPU: {{ state.partidasJogadas1vsCPU }}</p>
            <p>Vitórias: {{ state.partidasGanhas }}</p>
            <p>Derrotas: {{ state.partidasPerdidas }}</p>
            <p>Empates: {{ state.partidasEmpates }}</p>
            <p>Partidas jogadas 1v1: {{ state.partidasJogadas1vs1 }}</p>
        </div>
        <router-link to="TicTacToe" class="bebas-neue-regular3" @click="voltarAoJogo">Voltar</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { state } from '../state.js';
  
  export default {
    computed: {
      state() {
        return state;
      }
    }
  };
  </script>

<style scoped>
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 35px;
  margin-top: 25px;
}
.bebas-neue-regular2 {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
}
.bebas-neue-regular3 {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 19px;
  cursor: pointer;
}
.estatisticas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.status-container {
  text-align: center;
  padding: 20px;
  border: 1px solid black;
  width: 550px;
}

.information-container{
    width: 400px;
    margin-left: 170px;
}

.information-container p{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 20px;
    text-align: left;
}
</style>
