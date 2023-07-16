<script setup>
import ManagerLayout from "@/components/Manager/ManagerLayout.vue";
import {onBeforeMount, ref} from "vue";
import {VDataTable} from 'vuetify/labs/VDataTable'
import DonDangKyService from "@/service/manager/donDangKy";
import ComboBoxCustom from "@/components/common/form-elements/ComboBoxCustom.vue";
import moment from "moment";
import DuyetDonDangKy from "@/components/dialog/DuyetDonDangKy.vue";
const loading = ref(false)
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
let arrDialog = ref([]);
const loadData = async () => {
  loading.value = true;
  const res = await DonDangKyService.getAllDaoTrang();
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
  for (const item of res.data.content) {
    arrDialog.value[item.id] = false;
  }
  loading.value = false;
};

onBeforeMount(async () => {
  await loadData();
})
</script>

<template>
  <ManagerLayout>
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
                        <v-btn icon color="warning" size="40">
                          <DuyetDonDangKy
                            @isDialogVisible="n => {arrDialog[item.selectable.id] = n}"
                            icon="mdi-pencil"
                            :dialog="arrDialog[item.selectable.id]"
                            :title="item.selectable.ten"
                            :dao-trang-id="item.selectable.id"
                          />
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
  </ManagerLayout>
</template>
<style scoped>

</style>
