<script setup>
import UserLayout from "@/components/User/UserLayout.vue";
import {onBeforeMount, ref} from "vue";
import DaoTrangService from "@/service/daoTrang";
import {VDataTable} from 'vuetify/labs/VDataTable'
import ComboBoxCustom from "@/components/common/form-elements/ComboBoxCustom.vue";
import moment from "moment";
import {User} from "@/auth/User";
import DangKyService from "@/service/dangKy";
import Loader from "@/components/common/Loader.vue";
import Notyf from "@/components/common/Notyf.vue";

const {getUserId} = User();
const updateSuccess = ref(false);
const flagShow = ref(false);
const message = ref({
  message: "",
  mode: "",
})
const tableConfig = ref({
  headers: [
    {title: "Id", key: "id"},
    {title: "Nơi tổ chức", key: "noiToChuc"},
    {title: "Tên", key: "ten"},
    {title: "Số thành viên tham gia", key: "soThanhVienThamGia"},
    {title: "Thời gian tổ chức", key: "thoiGianToChuc"},
    {title: "Nội dung", key: "noiDung"},
    {title: "Đã kết thúc", key: "daKetThuc"},
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
const loading = ref(false)
let dataCheck = [];
let params = {
  pageNo: tableConfig.value.pagination.pageNo,
  pageSize: tableConfig.value.pagination.pageSize,
  ten: null,
}
const loadData = async () => {
  loading.value = true;
  const res = await DaoTrangService.getAllByUser(params);
  if (res) {
    tableConfig.value.data = res.data.content;
    tableConfig.value.pagination = {
      ...tableConfig.value.pagination,
      pageNo: res.number,
      pageSize: res.size,
      totalItems: res.totalElements,
      totalPages: res.totalPages,
    };
  }

  const resGetAll = await DangKyService.getAllByPhatTuId(getUserId());
  if (resGetAll) {
    console.log(resGetAll);
    for (const item of resGetAll.data) {
      dataCheck[item.daoTrangid] = item;
    }
  }
  loading.value = false;
};
const searchByName = () => {
  loadData();
}
onBeforeMount(async () => {
  await loadData();
})
const handleDangKy = async (daoTrangId) => {
  const data = {
    "phatTuId" : getUserId(),
    "trangThaiDon" : 0,
    "daoTrangId" : daoTrangId
  }
  const res = await DangKyService.create(data)
  if (res) {
    setTimeout(() => (flagShow.value = false), 500);
    message.value.message = "Đăng ký thành công";
    updateSuccess.value = true;
    flagShow.value = true;
    await loadData();
  }
}
</script>
<template>
  <UserLayout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Danh sách đạo tràng</v-card-title>
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
                      <v-col cols="3"></v-col>
                      <v-col cols="3" offset="3">
                        <v-text-field
                          density="compact"
                          variant="solo"
                          v-model="params.ten"
                          label="Tìm kiếm tên đạo tràng"
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
                    <td>{{ item.selectable.id }}</td>
                    <td>{{ item.selectable.noiToChuc }}</td>
                    <td>{{ item.selectable.ten }}</td>
                    <td>{{ item.selectable.soThanhVienThamGia }}</td>
                    <td>{{ moment(item.selectable.thoiGianToChuc).format("YYYY-MM-DD HH:mm:ss") }}</td>
                    <td>{{ item.selectable.noiDung }}</td>
                    <td>
                      <v-btn rounded="rounded" :color=" item.selectable.daKetThuc === 0 ?  'error' : 'primary'">
                        {{ item.selectable.daKetThuc === 0 ? 'Kết thúc' : 'Chưa kết thúc' }}
                      </v-btn>
                    </td>
                    <td class="d-flex justify-space-between">
                      <v-row justify="center" class="mt-1">
                        <v-btn
                          :color="dataCheck[item.selectable.id].trangThaiDon === 0 ? '' :
                          (dataCheck[item.selectable.id].trangThaiDon === 1 ? 'success' : 'error')"
                          v-if="dataCheck[item.selectable.id]"
                          disabled
                        >
                          {{ dataCheck[item.selectable.id].trangThaiDon === 0 ? 'Chờ duyệt đơn' :
                          (dataCheck[item.selectable.id].trangThaiDon === 1 ? 'Chấp nhận' : 'Từ chối')
                          }}
                        </v-btn>
                        <v-btn v-else color="warning" @click="handleDangKy(item.selectable.id)">
                          Đăng ký
                        </v-btn>
                      </v-row>
                    </td>
                  </tr>
                </template>
              </VDataTable>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Loader :flag-show="flagShow"/>
    <Notyf v-if="updateSuccess" :data="message"/>
  </UserLayout>
</template>

<style scoped>
</style>
