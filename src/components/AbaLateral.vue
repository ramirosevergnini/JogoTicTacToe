<template>
    <div class="aba-lateral" :class="{ 'aba-lateral-visivel': mostrarAba }" @mouseleave="fecharAba">
      <ul>
        <li><router-link class="linkMenu" to="/perfil">Perfil</router-link></li>
        <li><router-link class="linkMenu" to="/amigos">Amigos</router-link></li>
      </ul>
    </div>
</template>
  
<script>
export default {
props: {
    mostrarAba: {
    type: Boolean,
    required: true
    }
},
methods: {
    fecharAba() {
    this.$emit('fechar');
    }
}
};
</script>

<style scoped>
.linkMenu{
    text-decoration: none;
    color: #333;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    transition: 0.2s;
}
.linkMenu:hover{
    color: #555;
    font-size: 25px;
}
.aba-lateral {
    position: fixed;
    top: 0;
    left: -450px;
    width: 250px;
    height: 100%;
    background-color: #fff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.37);
    transition: left 0.3s ease;
    z-index: 1000;
    padding: 20px;
}
.aba-lateral-visivel {
left: 0;
}

.aba-lateral ul {
list-style-type: none;
padding: 0;
margin: 0;
}

.aba-lateral ul li {
margin: 20px 0;
}
</style>
  