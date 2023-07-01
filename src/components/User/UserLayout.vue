<template>
  <NavsBar/>
  <HeaderUser/>
  <div id="user-body">
        <slot></slot>
  </div>

</template>

<script>
import NavsBar from "@/components/Admin/NavsBar.vue";
import HeaderUser from "@/components/User/HeaderUser.vue";

export default {
  name: "UserLayout",
  components: {HeaderUser, NavsBar}
}
</script>

<style scoped>
#user-body {
  margin-left: 18.75%;
  width: 80%;
  margin-top: 104px;
  min-height: 100vh;
}
</style>
