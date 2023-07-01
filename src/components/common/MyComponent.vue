<script setup>
import {defineProps, ref, useAttrs} from "vue";
const attrs = useAttrs();
console.log(attrs.id);
console.log(attrs.label);
console.log(attrs.title)
const emit = defineEmits(["displayData", 'submit'])
const handClickButton = () => {
  emit('submit')
}

const sender = () => {
}
</script>
<template>

  <div>
    <button @click="$emit('increaseBy',1)">
      InCrease 1
    </button>
    <button @click="sender">Emit</button>
  </div>
</template>
