<script setup>
import AdminLayout from "@/components/Admin/AdminLayout.vue";
import Chart from 'chart.js/auto'
import {onMounted, ref} from "vue";
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-dragdata';
import thongKeService from "@/service/thongKe";
import DaoTrangService from "@/service/daoTrang";
import PhatTuService from "@/service/phattu";
import moment from "moment";
import {VDataTable} from 'vuetify/labs/VDataTable'
import AddEditPhatTu from "@/components/dialog/AddEditPhatTu.vue";
import CustomSelect from "@/components/common/form-elements/CustomSelect.vue";

const tableConfigDaoTrang = ref({
  headers: [
    {title: "Id", key: "id"},
    {title: "Nơi tổ chức", key: "noiToChuc"},
    {title: "Tên", key: "ten"},
    {title: "Thành viên tham gia", key: "soThanhVienThamGia"},
    {title: "Thời gian tổ chức", key: "thoiGianToChuc"},
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
let paramsDaoTrang = {
  pageNo: tableConfigDaoTrang.value.pagination.pageNo,
  pageSize: tableConfigDaoTrang.value.pagination.pageSize,
  daKetThuc: null,
  ten: null,
}
const daKetThuc = ref([
  {title: 'Kết thúc', value: "0"},
  {title: 'Chưa kết thúc', value: "1"},
]);
const handleChangeDaKetThuc = (item) => {
  paramsDaoTrang.daKetThuc = item;
  loadData();
}
const searchByName = () => {
  loadData();
}


const tableConfigPhatTu = ref({
  headers: [
    {title: "Id", key: "id"},
    {title: "Email", key: "email"},
    {title: "Tên", key: "ten"},
    {title: "Giới tính", key: "gioiTinh"},
    {title: "Pháp Danh", key: "phapDanh"},
    {title: "Số điện thoại", key: "soDienThoai"},
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
let paramsPhatTu = {
  pageNo: tableConfigPhatTu.value.pagination.pageNo,
  pageSize: tableConfigPhatTu.value.pagination.pageSize,
  daHoanTuc: null,
  gioiTinh: null,
  ten: null,
}
const filter = ref({
  byName: [
    {title: 'Đã hoàn tục', value: true},
    {title: 'Chưa hoàn tục', value: false},
  ],
  byGioiTinh: [
    {title: 'Nam', value: "Nam"},
    {title: 'Nu', value: "Nu"},
    {title: 'Khac', value: "Khac"},
  ]
})
const handleChangeHoanTuc = (e) => {
  paramsPhatTu.daHoanTuc = e;
  handleClickShowDetail(arg.value.daoTrangId, arg.value.tenDaoTrang, arg.value.time);
}
const handleChangeGioiTinh = (e) => {
  paramsPhatTu.gioiTinh = e;
  handleClickShowDetail(arg.value.daoTrangId, arg.value.tenDaoTrang, arg.value.time);
}
const searchByNamePhatTu = () => {
  handleClickShowDetail(arg.value.daoTrangId, arg.value.tenDaoTrang, arg.value.time);
}
const loading = ref(false)
const loadingPhatTu = ref(false)
const table = ref('table')
const tablePhatTu = ref('tablePhatTu')


let labels = [];
let resData = [];
let resDataHDDT = [];
let labelsHDDT = [];
const loadData = async () => {
  // 👉 chart thong ke phat tu
  const res = await thongKeService.thongKePhatTu();
  if (res) {
    for (let i = 0; i < res[0].length; i++) {
      labels.push(res[0][i]);
    }
    for (let i = 0; i < res[1].length; i++) {
      resData.push(res[1][i]);
    }
  }
  // 👉 chart thong ke hoat dong dao trang
  const resHDDT = await DaoTrangService.getAll(paramsDaoTrang);

  for (let i = 0; i < resHDDT.content.length; i++) {
    labelsHDDT.push(moment(resHDDT.content[i].thoiGianToChuc).format('YYYY MMM DD, HH:mm'))
    resDataHDDT.push(resHDDT.content[i].soThanhVienThamGia);
  }
  // 👉 table dao trang
  if (resHDDT) {
    tableConfigDaoTrang.value.data = resHDDT.content;
    tableConfigDaoTrang.value.pagination = {
      ...tableConfigDaoTrang.value.pagination,
      pageNo: resHDDT.number,
      pageSize: resHDDT.size,
      totalItems: resHDDT.totalElements,
      totalPages: resHDDT.totalPages,
    };
  }
}
//phat tu
let arrDialog = ref([]);
const show = ref(false);
const kieuThanhVien = ref([]);
const chuas = ref([]);
const ten = ref("");
const timeDaotrang = ref("");
const arg = ref({
  daoTrangId: null,
  tenDaoTrang: null,
  time: null,
});

const handleClickShowDetail = async (daoTrangId,tenDaoTrang,time) => {
  arg.value.daoTrangId = daoTrangId;
  arg.value.tenDaoTrang = tenDaoTrang;
  arg.value.time = time;

  loadingPhatTu.value = true;
  const res = await PhatTuService.getPhatTuByDaoTrangId(daoTrangId,paramsPhatTu);
  if (res) {
    tableConfigPhatTu.value.data = res.data.content;
    tableConfigPhatTu.value.pagination = {
      ...tableConfigPhatTu.value.pagination,
      pageNo: res.number,
      pageSize: res.size,
      totalItems: res.totalElements,
      totalPages: res.totalPages,
    };
    show.value = true;
  }
  for (const item of res.data.content) {
    arrDialog.value[item.id] = false;
  }
  const resKieuThanhVien = await PhatTuService.getAllKieuThanhVien();
  const resChua = await PhatTuService.getAllChua();
  if (resKieuThanhVien) kieuThanhVien.value = resKieuThanhVien.data;
  if (resChua) chuas.value = resChua.data;
  ten.value = tenDaoTrang;
  timeDaotrang.value = time;
  loadingPhatTu.value = false;
}


// Biểu đồ thông kê số lần tham gia hoạt động đạo tràng
const myChartCanvas = ref(null);
const dataThongKePhatTu = {
  labels: labels,
  datasets: [
    {
      label: 'Số lần phật tử tham gia hoạt động',
      backgroundColor: 'rgb(187,79,18)',
      borderColor: 'rgb(187,79,18)',
      data: resData,
      pointStyle: 'circle',
      pointRadius: 7,
      pointHoverRadius: 15,
      borderWidth: 2,
    },
  ]
}

const config = {
  type: 'line',
  data: dataThongKePhatTu,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title'
      }
    },
    aspectRatio: 5,
    scales: {
      x: {
        offset: true,
        grid: {
          drawBorder: false,
          color: 'rgb(187,79,18)',
        },

      },
      y: {
        beginAtZero: true,
        max: 20,
        grid: {
          drawBorder: false,
          color: 'rgb(187,79,18)',
        },
        ticks: {
          stepSize: 5,
          color: 'rgb(187,79,18)',
        },
      }
    },
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
      }
    },
    hoverRadius: 12,
    hoverBackgroundColor: 'yellow',
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
  }
}
// Biểu đồ thống kê hoạt động đạo tràng
const myChartCanvas2 = ref(null);
const dataThongKeSoLuong = {
  labels: labelsHDDT,
  datasets: [
    {
      label: 'Số lượng',
      backgroundColor: 'rgb(147,135,140)',
      borderColor: 'rgb(147,135,140)',
      data: resDataHDDT,
      pointStyle: 'circle',
      pointRadius: 7,
      pointHoverRadius: 15,
      borderWidth: 2,
    },
  ]
}

const configThongKeSoLuong = {
  type: 'bar',
  data: dataThongKeSoLuong,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Biểu đồ thống kê số lượng'
      }
    },
    aspectRatio: 7,
    scales: {
      x: {
        offset: true,
        grid: {
          drawBorder: false,
          color: 'rgb(89,10,98)',
        },
        title: {
          color: 'red',
          display: true,
          text: 'Ngày tháng năm'
        }
      },
      y: {
        beginAtZero: true,
        max: 14000,
        grid: {
          drawBorder: false,
          color: 'rgb(89,10,98)',
        },
        ticks: {
          stepSize: 2000,
          color: 'rgb(89,10,98)',
        },
        title: {
          color: 'red',
          display: true,
          text: 'Số lượng phật tử'
        }
      },

    },
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
      }
    },
    hoverRadius: 12,
    hoverBackgroundColor: 'orange',
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
  }
}
onMounted(async () => {
  await loadData();
  new Chart(myChartCanvas.value, config);
  new Chart(myChartCanvas2.value, configThongKeSoLuong);
})

</script>
<template>
  <AdminLayout>
    <h2>Biểu đồ thông kê số lần tham gia hoạt động đạo tràng</h2>
    <div class="chartWrapper">
      <div class="chartAreaWrapper">
        <div class="chartAreaWrapper2">
          <canvas ref="myChartCanvas"></canvas>
        </div>
      </div>
    </div>
    <h2>Biểu đồ thống kê số lượng</h2>
    <div class="chartWrapper">
      <div class="chartAreaWrapper">
        <div class="chartAreaWrapper2">
          <canvas ref="myChartCanvas2"></canvas>
        </div>
      </div>
    </div>

    <!--    table dao trang-->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="12">
                  <v-row class="px-3">
                    <v-col cols="6">
                      <CustomSelect
                        item-title="title"
                        item-value="value"
                        label="Tình trạng kết thúc"
                        class="border-0"
                        :items="daKetThuc"
                        @update:model-value="handleChangeDaKetThuc"
                      />
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-col cols="3" >
                <v-text-field
                  density="compact"
                  variant="solo"
                  v-model="paramsDaoTrang.ten"
                  label="Tìm kiếm tên đạo tràng"
                  append-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  @click:append-inner="searchByName"
                />
              </v-col>
              <v-col cols="1">
              </v-col>
            </v-row>
            <v-card-title>Đạo tràng</v-card-title>
            <v-card-text>
              <VDataTable
                ref="table"
                :loading="loading"
                :headers="tableConfigDaoTrang.headers"
                :items="tableConfigDaoTrang.data"
                :itemPerPage="tableConfigDaoTrang.pagination.pageSize"
                :itemPerPageOption="tableConfigDaoTrang.pagination.pageSizeOptions"
                :sortable="false"
              >
                <template #item="{ item }">
                  <tr>
                    <td>{{ item.selectable.id }}</td>
                    <td>{{ item.selectable.noiToChuc }}</td>
                    <td>{{ item.selectable.ten }}</td>
                    <td>{{ item.selectable.soThanhVienThamGia }}</td>
                    <td>{{ moment(item.selectable.thoiGianToChuc).format("YYYY-MM-DD HH:mm:ss") }}</td>
                    <td>
                      <v-btn rounded="rounded" :color=" item.selectable.daKetThuc === 0 ?  'error' : 'primary'">
                        {{ item.selectable.daKetThuc === 0 ? 'Kết thúc' : 'Chưa kết thúc' }}
                      </v-btn>
                    </td>
                    <td class="d-flex">
                      <v-btn
                        @click="handleClickShowDetail(item.selectable.id,item.selectable.ten,item.selectable.thoiGianToChuc)"
                        class="mt-1 mr-2"
                        size="40"
                        icon
                        color="primary">
                        <v-icon icon="mdi-eye-outline"></v-icon>
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

    <v-container v-if="show">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Thông tin phật tử buổi {{ten}} tổ chức vào {{moment(timeDaotrang).format("YYYY-MM-DD HH:mm:ss")}}</v-card-title>
            <v-row>
              <v-col cols="12">
                  <h2 class="py-1 px-2">Tìm kiếm phật tử</h2>
                  <v-row class="px-3">
                    <v-col cols="6">
                      <CustomSelect
                        item-title="title"
                        item-value="value"
                        label="Tình trạng hoàn tục"
                        class="border-0"
                        :items="filter.byName"
                        @update:model-value="handleChangeHoanTuc"
                      />
                    </v-col>
                    <v-col cols="6">
                      <CustomSelect
                        item-title="title"
                        item-value="value"
                        label="Giới Tính"
                        class="border-0"
                        :items="filter.byGioiTinh"
                        @update:model-value="handleChangeGioiTinh"
                      />
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-col cols="3" >
                <v-text-field
                  density="compact"
                  variant="solo"
                  v-model="paramsPhatTu.ten"
                  label="Tìm kiếm tên phật tử"
                  append-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  @click:append-inner="searchByNamePhatTu"
                />
              </v-col>
              <v-col cols="1">
              </v-col>
            </v-row>
            <v-card-text>
              <VDataTable
                ref="tablePhatTu"
                :loading="loadingPhatTu"
                :headers="tableConfigPhatTu.headers"
                :items="tableConfigPhatTu.data"
                :itemPerPage="tableConfigPhatTu.pagination.pageSize"
                :itemPerPageOption="tableConfigPhatTu.pagination.pageSizeOptions"
                :sortable="false"
              >
                <template #item="{ item }">
                  <tr>
                    <td>{{ item.selectable.id }}</td>
                    <td>{{ item.selectable.email }}</td>
                    <td>{{ item.selectable.ten }}</td>
                    <td>{{ item.selectable.gioiTinh }}</td>
                    <td>{{ (item.selectable.phapDanh) }}</td>
                    <td>{{ (item.selectable.soDienThoai) }}</td>
                    <td class="d-flex">
                      <AddEditPhatTu
                        class="mt-4"
                        @isDialogVisible="n => arrDialog[item.selectable.id] = n"
                        :dialog="arrDialog[item.selectable.id]"
                        :phat-tu="item.selectable"
                        :kieu-thanh-vien="kieuThanhVien"
                        :chuas="chuas"
                        :isUpdate="true"
                        :show-btn="true"
                        icon="mdi-eye-outline"
                      />
                    </td>
                  </tr>
                </template>
              </VDataTable>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--    <h2 class="mt-8">Biểu đồ thống kê hoạt động đạo tràng</h2>-->
  </AdminLayout>
</template>

<style scoped>
.chartWrapper {
  height: fit-content;
  width: 100%;
  overflow-x: auto;
}

.chartAreaWrapper2 {
  width: 3000px; /* Adjust the width to fit your data */
}
</style>
