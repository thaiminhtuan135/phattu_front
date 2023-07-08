<script setup>
import avatar from "../../assets/image/avatar.png"
const props = defineProps(["urlImg","urlProfile"])
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar" />

      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="props.urlImg" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              John Doe
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <VListItem link :to="props.urlProfile">
            <template #prepend>
              <v-icon class="me-2" icon="mdi mdi-account"></v-icon>
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

<!--          <VListItem link>-->
<!--            <template #prepend>-->
<!--              <VIcon-->
<!--                class="me-2"-->
<!--                icon="mdi mdi-cog"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>Settings</VListItemTitle>-->
<!--          </VListItem>-->

<!--          <VListItem link>-->
<!--            <template #prepend>-->
<!--              <VIcon-->
<!--                class="me-2"-->
<!--                icon="mdi mdi-currency-usd"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>Pricing</VListItemTitle>-->
<!--          </VListItem>-->

<!--          <VListItem link="">-->
<!--            <template #prepend>-->
<!--              <VIcon-->
<!--                class="me-2"-->
<!--                icon="mdi mdi-help-circle-outline"-->
<!--                size="22"-->
<!--              />-->
<!--            </template>-->

<!--            <VListItemTitle>FAQ</VListItemTitle>-->
<!--          </VListItem>-->

          <!-- Divider -->
          <VDivider class="my-2" />

          <VListItem to="/login">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi mdi-logout-variant"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>


<style scoped>

</style>
