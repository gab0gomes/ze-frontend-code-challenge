<template>
  <div class="typing-container">
    <p class="line typing-animation">
      Todes merecem uma bebida onde, como e quando quiserem!
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
div.typing-container {
  position: absolute;
  bottom: 1rem;
  left: max(calc((100vw - 960px) / 2), 1rem);
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
  width: calc(100vw - 2rem);
}

.line {
  border-right: 2px solid #3c2946;
  color: #ffd571;
  font-size: 1rem;
  text-align: center;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}

@media only screen and (max-width: 478px) {
  .line {
    display: none;
  }
}

@media only screen and (max-width: 960px) {
  div.typing-container {
    padding: 0;
  }
}

.typing-animation {
  animation: blinkCursor 500ms steps(54) infinite normal,
    typing 4s steps(54) 1s normal both;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 440px;
  }
}

@keyframes blinkCursor {
  from {
    border-right-color: #ffd571;
  }
  to {
    border-right-color: transparent;
  }
}
</style>
