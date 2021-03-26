<template>
  <p class="line typing-animation">
    Todes merecem uma bebida onde, como e quando quiserem!
  </p>
</template>

<script>
export default {}
</script>

<style scoped>
p {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}
.line {
  border-right: 2px solid #3c2946;
  color: #ffd571;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
}

@media only screen and (max-width: 478px) {
  .line {
    display: none;
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
