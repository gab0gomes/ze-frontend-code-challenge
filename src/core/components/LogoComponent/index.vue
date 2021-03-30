<template>
  <router-link
    to="/"
    tag="img"
    :src="logo"
    alt="Logotipo do Zé Delivery, possui uma ilustração de um rosto masculino a esqueda em preto com fundo amarelo e a direita está escrito Zé em branco"
  />
</template>

<script>
import logo from '../../../../static/images/logo.png'

export default {
  data() {
    return {
      logo
    }
  }
}
</script>

<style></style>
