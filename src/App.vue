<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => (route.meta.layout || 'default') + '-layout')
    }
  }
}
</script>
