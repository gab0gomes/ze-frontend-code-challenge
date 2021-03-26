<template>
  <header>
    <nav>
      <logo class="logo" />
      <span>Frontend Challenge</span>
    </nav>
  </header>
</template>

<script>
import Logo from '@/core/components/LogoComponent'

export default {
  components: {
    Logo
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
}

header nav {
  padding: 0.5rem;
  width: 100%;
  max-width: 960px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

nav .logo {
  height: 2rem;
}

nav span {
  margin-left: 1rem;
  color: #ffd571;
}

@media only screen and (max-width: 560px) {
  header {
    height: 4.5rem;
  }

  header nav {
    flex-direction: column;
    justify-content: center;
  }

  nav span {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>
