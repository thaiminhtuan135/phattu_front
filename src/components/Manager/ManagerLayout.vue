<script setup>
import NavsBarManager from "@/components/Manager/ManagerNavsBar.vue";
import HeaderUser from "@/components/User/HeaderUser.vue";
</script>
<template>
  <NavsBarManager/>
  <HeaderUser/>
  <div id="user-body">
        <slot></slot>
  </div>
</template>

<style scoped>
#user-body {
  margin-left: 18.75%;
  width: 80%;
  margin-top: 104px;
  min-height: 100vh;
}
</style>
