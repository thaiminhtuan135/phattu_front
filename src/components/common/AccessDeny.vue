<template>
  <div class="access-deny">
    <img class="image-access-deny" src="../../assets/image/access-deny.jpg" alt="">
  </div>
</template>

<style scoped>
.access-deny {
  margin-top: 10%;
  backdrop-filter: hue-rotate(360deg);
  text-align: center;
  animation: animteBg 5s linear infinite;
}
.image-access-deny{
  border-radius: 20px;
}
@keyframes animteBg {
  100% {
    filter: hue-rotate(60deg);
  }
}
</style>
