<script setup>
import { defineProps } from 'vue';

defineProps({
  flagShow: {
    type: Boolean,
  },
});
</script>
<template>
  <div class="loading-div" v-if="flagShow">
    <div class="loader-img"></div>
  </div>
</template>

<style>
.loader-img {
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0)
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg)
  }
  100% {
    -webkit-transform: rotate(360deg)
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
.loading-div {
  display: block;
  background: rgba(0, 0, 0, .5);
  opacity: .8;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999
}
.loading-div .loader-img {
  margin: 0 auto;
  position: fixed;
  top: 50%;
  margin-top: -50px;
  left: 0;
  right: 0
}
@-webkit-keyframes load5 {
  0%, 100% {
    box-shadow: 0em -2.6em 0em 0em #a9dcfe, 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .5), -1.8em -1.8em 0 0em rgba(169, 220, 254, .7)
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .7), 1.8em -1.8em 0 0em #a9dcfe, 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .5)
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .5), 1.8em -1.8em 0 0em rgba(169, 220, 254, .7), 2.5em 0em 0 0em #a9dcfe, 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .5), 2.5em 0em 0 0em rgba(169, 220, 254, .7), 1.75em 1.75em 0 0em #a9dcfe, 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .5), 1.75em 1.75em 0 0em rgba(169, 220, 254, .7), 0em 2.5em 0 0em #a9dcfe, -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .5), 0em 2.5em 0 0em rgba(169, 220, 254, .7), -1.8em 1.8em 0 0em #a9dcfe, -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .5), -1.8em 1.8em 0 0em rgba(169, 220, 254, .7), -2.6em 0em 0 0em #a9dcfe, -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .5), -2.6em 0em 0 0em rgba(169, 220, 254, .7), -1.8em -1.8em 0 0em #a9dcfe
  }
}
@keyframes load5 {
  0%, 100% {
    box-shadow: 0em -2.6em 0em 0em #a9dcfe, 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .5), -1.8em -1.8em 0 0em rgba(169, 220, 254, .7)
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .7), 1.8em -1.8em 0 0em #a9dcfe, 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .5)
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .5), 1.8em -1.8em 0 0em rgba(169, 220, 254, .7), 2.5em 0em 0 0em #a9dcfe, 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .5), 2.5em 0em 0 0em rgba(169, 220, 254, .7), 1.75em 1.75em 0 0em #a9dcfe, 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .5), 1.75em 1.75em 0 0em rgba(169, 220, 254, .7), 0em 2.5em 0 0em #a9dcfe, -1.8em 1.8em 0 0em rgba(169, 220, 254, .2), -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .5), 0em 2.5em 0 0em rgba(169, 220, 254, .7), -1.8em 1.8em 0 0em #a9dcfe, -2.6em 0em 0 0em rgba(169, 220, 254, .2), -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .5), -1.8em 1.8em 0 0em rgba(169, 220, 254, .7), -2.6em 0em 0 0em #a9dcfe, -1.8em -1.8em 0 0em rgba(169, 220, 254, .2)
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(169, 220, 254, .2), 1.8em -1.8em 0 0em rgba(169, 220, 254, .2), 2.5em 0em 0 0em rgba(169, 220, 254, .2), 1.75em 1.75em 0 0em rgba(169, 220, 254, .2), 0em 2.5em 0 0em rgba(169, 220, 254, .2), -1.8em 1.8em 0 0em rgba(169, 220, 254, .5), -2.6em 0em 0 0em rgba(169, 220, 254, .7), -1.8em -1.8em 0 0em #a9dcfe
  }
}
body.loading .loading-div {
  display: block;
  background: rgba(0, 0, 0, .5)
}

</style>
