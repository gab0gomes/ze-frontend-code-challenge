<template>
  <header>
    <nav>
      <div class="logo-container">
        <logo class="logo" />
        <span>Frontend Challenge</span>
      </div>
      <p class="address">
        {{ fancyAddress }}
      </p>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '@/core/components/LogoComponent'

export default {
  components: {
    Logo
  },
  computed: {
    ...mapState('address', {
      fancyAddress: (state) => state.fancyAddress
    })
  }
}
</script>

<style scoped>
header {
  background-color: #3c2946;
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
}

header nav {
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 960px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header nav .logo-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

header nav .logo {
  height: 2rem;
}

header nav .logo-container span {
  margin-left: 1rem;
  color: #ffd571;
}

header nav .address {
  margin: 0;
  max-width: 20rem;
  color: #ffd571;
  font-size: 0.75rem;
}

@media only screen and (max-width: 560px) {
  header {
    height: auto;
  }

  header nav {
    flex-direction: column;
    justify-content: center;
  }

  header nav .logo-container {
    flex-direction: column;
    justify-content: center;
  }

  header nav .logo-container span {
    margin-left: 0;
    margin-top: 0.5rem;
  }

  header nav .address {
    margin-top: 0.5rem;
  }
}
</style>
