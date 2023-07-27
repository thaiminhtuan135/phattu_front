<script setup>
import moment from "moment";
import Loader from "@/components/common/Loader.vue";
import {defineProps, onBeforeMount, ref} from "vue";
import DonDangKyService from "@/service/manager/donDangKy";
import ComboBoxCustom from "@/components/common/form-elements/ComboBoxCustom.vue";
import {VDataTable} from 'vuetify/labs/VDataTable'
import {User} from "@/auth/User";
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  daoTrangId: {
    type: Number,
    required: true,
  }
});
const loading = ref(false)
const tableConfig = ref({
  headers: [
    {title: "Id", key: "phatTuId"},
    {title: "Email", key: "email"},
    {title: "Tên", key: "ten"},
    {title: "Ngày gửi đơn", key: "ngayGuiDon"},
    {title: "Action"},
  ],
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    totalPages: 1,
    totalItems: 1
  },
})
let dataCheck = [];
let params = {
  pageNo: tableConfig.value.pagination.pageNo,
  pageSize: tableConfig.value.pagination.pageSize,
  ten : null
}
const searchByName = () => {
  handleGetDonDangKyByDaoTrangId();
}
const handleGetDonDangKyByDaoTrangId = async () => {
  loading.value = true;
  const res = await DonDangKyService.getAllByDaoTrangId(props.daoTrangId,params);
  if (res) {
    console.log(res.data)
    tableConfig.value.data = res.data;
    tableConfig.value.pagination = {
      ...tableConfig.value.pagination,
      pageNo: res.number,
      pageSize: res.size,
      totalItems: res.totalElements,
      totalPages: res.totalPages,
    };
    for (const item of res.data) {
      dataCheck[item.phatTuId] = item;
    }
    loading.value = false;
  }
}
const handleDuyetDon =async (donDangKyId,trangThaiDon) => {
  const {getUserId} = User();
  const data = {
    "nguoiSuLyId": getUserId(),
    "trangThaiDon" : trangThaiDon
  }
  const res = await DonDangKyService.update(data,donDangKyId)
  if (res) {
    console.log(res)
    await handleGetDonDangKyByDaoTrangId();
  }
}
// onBeforeMount(async () => {
//   await loadData();
// })
</script>
<template>
  <v-row justify="center">
    <v-dialog
      :model-value="props.dialog"
      @update:model-value="val => $emit('isDialogVisible', val)"
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn @click="handleGetDonDangKyByDaoTrangId" color="primary" v-bind="props" icon size="40">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Thành viên đăng ký tham gia {{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-text>
                    <VDataTable
                      ref="table"
                      :loading="loading"
                      :headers="tableConfig.headers"
                      :items="tableConfig.data"
                      :itemPerPage="tableConfig.pagination.pageSize"
                      :itemPerPageOption="tableConfig.pagination.pageSizeOptions"
                      :sortable="false"
                    >
                      <template #top>
                        <v-container>
                          <v-row
                            justify="start"
                            align="center"
                          >
                            <v-col cols="2">
                              <ComboBoxCustom
                                v-model="tableConfig.pagination.pageSize"
                                :items="tableConfig.pagination.pageSizeOptions"
                              />
                            </v-col>
                            <v-col cols="5"></v-col>
                            <v-col cols="4">
                              <v-text-field
                                density="compact"
                                variant="solo"
                                v-model="params.ten"
                                label="Tìm kiếm tên phật tử"
                                append-inner-icon="mdi-magnify"
                                single-line
                                hide-details
                                @click:append-inner="searchByName"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </template>
                      <template #item="{ item }">
                        <tr>
                          <td>{{ item.selectable.phatTuId }}</td>
                          <td>{{ item.selectable.email }}</td>
                          <td>{{ item.selectable.ten }}</td>
                          <td>{{ moment(item.selectable.ngayGuiDon).format("YYYY-MM-DD HH:mm:ss") }}</td>
                          <td class="d-flex">
                            <v-btn color="warning" v-if="dataCheck[item.selectable.phatTuId].trangThaiDon === 0" class="ml-3">
                              Chờ phê duyệt
                            </v-btn>
                            <v-btn @click="handleDuyetDon(item.selectable.donDangKyId,1)" :color="dataCheck[item.selectable.phatTuId].trangThaiDon === 1 ? 'success' : ''" class="ml-3">
                              Đồng ý
                            </v-btn>
                            <v-btn @click="handleDuyetDon(item.selectable.donDangKyId,2)" :color="dataCheck[item.selectable.phatTuId].trangThaiDon === 2 ? 'error' : ''" class="ml-3">
                              Từ chối
                            </v-btn>
                          </td>
                        </tr>
                      </template>
                    </VDataTable>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="$emit('isDialogVisible', false)"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!--  <Loader :flag-show="flagShow"/>-->
  <!--  <Notyf v-if="updateSuccess" :data="message"/>-->
</template>


<style scoped>

</style>
