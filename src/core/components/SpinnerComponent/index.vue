<template>
  <section class="spinner-container">
    <div class="spinner"></div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.spinner-container {
  height: 100vh;
  background-color: rgba(60, 41, 70, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
}

.spinner {
  border: 8px solid #56556e;
  border-top: 8px solid #ffd571;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  border-radius: 50%;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
