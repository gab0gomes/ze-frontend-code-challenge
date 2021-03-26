<template>
  <footer>
    <div class="container">
      <div class="logo-container">
        <logo class="logo" />
        <span>Frontend Challenge</span>
      </div>
      <div class="company-address">
        <p>ZX COMMERCE COMERCIO DE BEBIDAS LTDA - CNPJ: 37.657.197/0001-46</p>
        <p>Rua Fradique Coutinho, 1632 - CEP: 05.416-002</p>
        <p>Pinheiros - São Paulo/SP</p>
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from '../LogoComponent'

export default {
  components: {
    Logo
  }
}
</script>

<style scoped>
footer {
  background-color: #3c2946;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
}

footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container,
.company-address {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-right: 1rem;
}

.company-address p {
  margin-bottom: 0;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #fff;
  text-align: center;
}

.company-address p:first-of-type {
  margin-top: 0;
}

.logo-container span {
  color: #ffd571;
  margin-top: 0.5rem;
}

.logo {
  height: 4rem;
}

@media only screen and (max-width: 560px) {
  footer .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .company-address p:first-of-type {
    margin-top: 1.25rem;
  }
}
</style>
