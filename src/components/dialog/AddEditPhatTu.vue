<script setup>
import {defineProps, onBeforeMount, ref} from "vue";
import {validate} from "@/util/validate";
import InputCustom from "@/components/common/form-elements/InputCustom.vue";
import Datepicker from "vuejs3-datepicker";
import CustomSelect from "@/components/common/form-elements/CustomSelect.vue";
import moment from "moment/moment";
import Loader from "@/components/common/Loader.vue";
import Notyf from "@/components/common/Notyf.vue";
import axios from "axios";
import {AppStorage} from "@/auth/AppStorage";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  phatTu: {
    type: Object,
    required: false,
  },
  kieuThanhVien: {
    type: Array,
    required: true,
  },
  isUpdate: {
    type: Boolean,
    required: false
  },
})
const isUpdateImg = ref(false);
const flagShow = ref(false);
const message = ref({
  message: "",
  mode: "",
})
const updateSuccess = ref(false);
const form = ref(false);
let phatTu = ref({
  id: null,
  ho: '',
  tenDem: '',
  anhChup: null,
  ten: '',
  phapDanh: '',
  soDienThoai: '',
  email: '',
  ngaySinh: '',
  ngayXuatGia: '',
  ngayHoanTuc: '',
  gioiTinh: '',
  kieu_thanh_vien_id: null,
  daHoanTuc: false,
});
const filePreview = ref("");
const fileInput = ref(null);
onBeforeMount(async () => {
  phatTu.value = props.phatTu;
  if (phatTu.value.anhChup) {
    filePreview.value = "http://localhost:8084/" + phatTu.value.anhChup;
  }
})
const emit = defineEmits(["isDialogVisible", "loadData"])

const items = [
  {title: 'Nam', value: 'Nam'},
  {title: 'Nu', value: 'Nu'},
  {title: 'Khac', value: 'Khac'},
];
const onSubmit = async () => {
  const {getToken} = AppStorage();
  if (!form.value) return;
  flagShow.value = true;
  // const params = {
  //   ho: phatTu.value.ho,
  //   tenDem: phatTu.value.tenDem,
  //   ten: phatTu.value.ten,
  //   phapDanh: phatTu.value.phapDanh,
  //   soDienThoai: phatTu.value.soDienThoai,
  //   email: phatTu.value.email,
  //   ngaySinh: phatTu.value.ngaySinh ? moment(phatTu.value.ngaySinh).format('YYYY-MM-DD') : '',
  //   ngayXuatGia: phatTu.value.ngayXuatGia ? moment(phatTu.value.ngayXuatGia).format('YYYY-MM-DD') : '',
  //   ngayHoanTuc: phatTu.value.ngayHoanTuc ? moment(phatTu.value.ngayHoanTuc).format('YYYY-MM-DD') : '',
  //   gioiTinh: phatTu.value.gioiTinh,
  //   daHoanTuc: phatTu.value.daHoanTuc,
  //   anhChup: phatTu.value.anhChup,
  //   isUpdateImg: phatTu.value.isUpdateImg,
  // }
  const formData = new FormData();
  formData.append("isUpdateImg", isUpdateImg.value);
  formData.append("ho", phatTu.value.ho);
  formData.append("tenDem", phatTu.value.tenDem);
  formData.append("ten", phatTu.value.ten);
  formData.append("phapDanh", phatTu.value.phapDanh);
  formData.append("soDienThoai", phatTu.value.soDienThoai);
  formData.append("email", phatTu.value.email);
  formData.append("anhChup", phatTu.value.anhChup);
  formData.append("ngaySinh", moment(phatTu.value.ngaySinh).format('YYYY-MM-DD'));
  formData.append("ngayXuatGia", moment(phatTu.value.ngayXuatGia).format('YYYY-MM-DD'));
  formData.append("ngayHoanTuc", moment(phatTu.value.ngayHoanTuc).format('YYYY-MM-DD'));
  formData.append("gioiTinh", phatTu.value.gioiTinh);
  formData.append("daHoanTuc", phatTu.value.daHoanTuc);
  formData.append("kieuThanhVien", phatTu.value.kieu_thanh_vien_id);

  // const res = await PhatTuService.updateById(phatTu.value.id, formData);
  axios
    .put(`http://localhost:8084/api/v1/user/${phatTu.value.id}/edit`, formData, {
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "multipart/form-data",
      }
    })
    .then(() => {
      setTimeout(() => (flagShow.value = false), 500);
      message.value.message = "Update successfully";
      updateSuccess.value = true;
      emit('loadData');
      emit('isDialogVisible', false)
    }).catch((err) => {
    console.log(err)
  });

  // if (res) {
  //   setTimeout(() => (flagShow.value = false), 500);
  //   message.value.message = "Update successfully";
  //   updateSuccess.value = true;
  //   emit('loadData');
  //   emit('isDialogVisible', false)
  // }
}
const chooseImage = () => {
  fileInput.value.click();
}
const clearImagePreview = () => {
  filePreview.value = "";
  isUpdateImg.value = true;
}
const onChangeImg = (e) => {
  isUpdateImg.value = true;
  phatTu.value.anhChup = e.target.files[0];
  let file = fileInput.value;
  let imgFile = file.files;
  if (imgFile && imgFile[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      filePreview.value = e.target.result;
    };
    reader.readAsDataURL(imgFile[0]);
  }
}
</script>

<template>
  <div>
    <v-row justify="center">
      <v-dialog
        :model-value="props.dialog"
        @update:model-value="val => $emit('isDialogVisible', val)"
        width="1024"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            icon
            size="40"
          >
            <v-icon
            >
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-form v-model="form">
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row class="mb-4">
                  <div class="position-relative">
                    <v-avatar size="250" class="box-zoom-out mt-3 ml-6" @click="chooseImage">
                      <img :src="filePreview ? filePreview : 'http://localhost:8084/images/user.png'" alt="">
                    </v-avatar>
                    <span class="position-absolute" style="right: 0">
                      <v-icon size="50" icon="mdi mdi-delete-circle-outline" @click="clearImagePreview"/>
                    </span>
                  </div>
                  <v-file-input
                    @change="onChangeImg"
                    @click:clear="clearImagePreview()"
                    label="Image"
                    ref="fileInput"
                    style="display: none"
                  >
                  </v-file-input>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <InputCustom
                      label="Họ"
                      variant="outlined"
                      type="text"
                      v-model="phatTu.ho"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <InputCustom
                      label="Tên Đệm"
                      variant="outlined"
                      type="text"
                      v-model="phatTu.tenDem"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <InputCustom
                      label="Tên"
                      variant="outlined"
                      type="text"
                      v-model="phatTu.ten"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <InputCustom
                      label="Pháp Danh"
                      variant="outlined"
                      type="text"
                      v-model="phatTu.phapDanh"
                      class="max-with"
                      :rule="[validate.required(phatTu.phapDanh,'Pháp danh')]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <InputCustom
                      label="Số điện thoại"
                      variant="outlined"
                      type="text"
                      v-model="phatTu.soDienThoai"
                      class="max-with"
                      :rule="[validate.required(phatTu.soDienThoai,'Số điện thoại'), validate.telephone]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <InputCustom
                      label="Email"
                      variant="outlined"
                      type="text"
                      v-model="phatTu.email"
                      :rule="[validate.required(phatTu.email,'Email')]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <div class="position-relative">
                      <label class="px-1 position-absolute" :class="phatTu.ngaySinh ? 'label-date-time' : ''">Ngày
                        Sinh</label>
                      <datepicker
                        format="yyyy/MM/dd"
                        placeholder="Ngày sinh"
                        v-model="phatTu.ngaySinh"
                        style="z-index: 1"
                        clear-button
                      />
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <div class="position-relative">
                      <label class="px-1 position-absolute" :class="phatTu.ngayXuatGia ? 'label-date-time' : ''">Ngày
                        xuất
                        gia</label>
                      <datepicker
                        format="yyyy/MM/dd"
                        placeholder="Ngày xuất gia"
                        v-model="phatTu.ngayXuatGia"
                        style="z-index: 1"
                        clear-button
                      />
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <div class="position-relative">
                      <label class="px-1 position-absolute" :class="phatTu.ngayHoanTuc ? 'label-date-time' : ''">Ngày
                        hoàn
                        tục</label>
                      <datepicker
                        format="yyyy/MM/dd"
                        placeholder="Ngày hoàn tục"
                        v-model="phatTu.ngayHoanTuc"
                        style="z-index: 1"
                        clear-button
                      />
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <CustomSelect
                      item-title="title"
                      item-value="value"
                      label="Giới Tính"
                      class="border-0"
                      v-model="phatTu.gioiTinh"
                      :items="items"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <CustomSelect
                      item-title="title"
                      item-value="value"
                      label="Kiểu thành viên"
                      class="border-0"
                      v-model="phatTu.kieu_thanh_vien_id"
                      :items="kieuThanhVien"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <p style="align-items: center" class="mr-2">Đã hoàn tục</p>
                    <v-btn-toggle class="mt-2">
                      <v-btn
                        style="border: 2px solid grey;border-right: none"
                        :active="phatTu.daHoanTuc === true"
                        :class="{ 'active-btn': phatTu.daHoanTuc === true }"
                        @click="phatTu.daHoanTuc = true"
                      >
                        <p>Có</p>
                      </v-btn>

                      <v-btn
                        style="border: 2px solid grey"
                        :active="phatTu.daHoanTuc === false"
                        :class="{ 'active-btn': phatTu.daHoanTuc === false }"
                        @click="phatTu.daHoanTuc = false">
                        <p>không</p>
                      </v-btn>
                    </v-btn-toggle>
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
              <v-btn
                color="blue-darken-1"
                variant="text"
                :disabled="!form"
                @click="onSubmit"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <Loader :flag-show="flagShow"/>
    <Notyf v-if="updateSuccess" :data="message"/>
  </div>
</template>
<style>

.active-btn {
  background-color: rgba(22, 162, 22, 0.89);
  color: #fff;
}
</style>
