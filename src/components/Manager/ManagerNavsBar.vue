<template>
  <v-card
    style="
      border-radius: unset;
      height: 100vh;
      position: fixed;
      z-index: 2;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      min-width: 17.5%;
      max-width: 17.5%;
      top: 0;
    "
  >
    <div
      style="
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
<!--      <img-->
<!--        :src="`data:image/png;base64,` + getAdminLogo"-->
<!--        alt="Hình ảnh"-->
<!--        style="height: 60px"-->
<!--      />-->
    </div>
    <div style="color: white; margin-top: 20px">
      <v-list v-for="item in navs" :key="item">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              append-icon=""
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
              :to="item.to"
            ></v-list-item>
          </template>
          <router-link
            :to="sub.to"
            style="text-decoration: none; color: black"
            v-for="sub in item.subnav"
            :key="sub"
          >
            <v-list-group
              :prepend-icon="sub.icon"
              :title="sub.title"
              style="overflow: hidden; width: 100%; padding-left: 40px"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  append-icon=""
                  v-bind="props"
                  :prepend-icon="sub.icon"
                  :title="sub.title"
                ></v-list-item>
              </template>
            </v-list-group>
          </router-link>
        </v-list-group>
      </v-list>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "NavsBar",
  data() {
    return {
      navs: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          subnav: [],
          to: "/manager/dashboard",
        },
        {
          icon: "mdi mdi-bookshelf",
          title: "Đơn đăng ký",
          to: "/manager/don-dang-ky",
        },
        {
          icon: "mdi mdi-face-agent",
          title: "Tư vấn học",
          subnav: [
            {
              icon: "mdi mdi-note-multiple-outline",
              title: "Danh sách yêu cầu",
              to: "/admin/blog",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
.v-list-group--prepend {
  --parent-padding: unset;
}
</style>
