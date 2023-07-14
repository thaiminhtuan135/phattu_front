<script setup>
import {defineProps, ref, onBeforeMount} from "vue";
import InputCustom from "@/components/common/form-elements/InputCustom.vue";
import {validate} from "@/util/validate";
import CustomSelect from "@/components/common/form-elements/CustomSelect.vue";
import Loader from "@/components/common/Loader.vue";
import Notyf from "@/components/common/Notyf.vue";
import DaoTrangService from "@/service/daoTrang";
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  daoTrang: {
    type: Object,
    required: false,
  },
  trangThai : {
    type: Array,
    required: false,
  },
  nguoiChuTri: {
    type: Array,
    required: false,
  },
  isUpdate: {
    type: Boolean,
    required: false
  },
  icon: {
    type: String,
    required: true,
  },
  title : {
    type: String,
    required: true,
  }
})
const form = ref(false);
const updateSuccess = ref(false);
const flagShow = ref(false);
const message = ref({
  message: "",
  mode: "",
})
let daoTrang = ref({
  noiToChuc: "",
  ten: "",
  thoiGianToChuc: null,
  noiDung: null,
  daKetThuc: null,
  nguoiChuTriId: null,
});
const emit = defineEmits(["isDialogVisible", "loadData"])
const onSubmit = async () => {

  const data = {
    noiToChuc: daoTrang.value.noiToChuc,
    thoiGianToChuc: moment(daoTrang.value.thoiGianToChuc).format("YYYY-MM-DDTHH:mm:ss"),
    noiDung: daoTrang.value.noiDung,
    daKetThuc: daoTrang.value.daKetThuc,
    nguoiChuTriId: daoTrang.value.nguoiChuTriId,
  };
  if (props.isUpdate) {
    const res = await DaoTrangService.update(daoTrang.value.id, data);
    if (res) {
      setTimeout(() => (flagShow.value = false), 500);
      message.value.message = "Update successfully";
      updateSuccess.value = true;
      emit('loadData');
      emit('isDialogVisible', false)
    }
  }
  else {
    daoTrang.value.thoiGianToChuc = moment(daoTrang.value.thoiGianToChuc).format("YYYY-MM-DDTHH:mm:ss")
    const res = await DaoTrangService.create(daoTrang.value);
    if (res) {
      setTimeout(() => (flagShow.value = false), 500);
      message.value.message = "Tạo thành công";
      updateSuccess.value = true;
      emit('loadData');
      emit('isDialogVisible', false)
    }
  }
  if (!form.value) return;
  flagShow.value = true;
};

onBeforeMount(() => {
  if (props.isUpdate) {
    daoTrang.value = props.daoTrang;
  }
})
const handleChange = (e) => {
  console.log(e)
}
const handleChangeNguoiChuTri = (e) => {
  console.log(e)
}
</script>
<template>
  <v-row justify="center">
    <v-dialog
      :model-value="props.dialog"
      @update:model-value="val => $emit('isDialogVisible', val)"
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" icon size="40" v-if="isUpdate">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <v-btn v-bind="props" v-else>
          <v-icon>{{ icon }}</v-icon>Thêm Mới
        </v-btn>
      </template>
      <v-card>
        <v-form v-model="form">
          <v-card-title>
            <span class="text-h5">{{ title }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <InputCustom
                    label="Nơi tổ chức"
                    variant="outlined"
                    type="text"
                    v-model="daoTrang.noiToChuc"
                    class="max-with"
                    :rule="[validate.required(daoTrang.noiToChuc,'Nơi tổ chức')]"
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
                    v-model="daoTrang.ten"
                    class="max-with"
                    :rule="[validate.required(daoTrang.ten,'Tên')]"
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
                    v-model="daoTrang.noiDung"
                    class="max-with"
                    :rule="[validate.required(daoTrang.noiDung,'Nội dung')]"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="mt-7"
                >
                  <div class="position-relative">
                    <VueCtkDateTimePicker
                      label="Thời gian tổ chức"
                      v-model="daoTrang.thoiGianToChuc"
                      format="YYYY-MM-DD HH:mm:ss"
                      @update:model-value="handleChange"
                      style="height: 50px"
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
                    label="Đã kết thúc"
                    class="border-0"
                    v-model="daoTrang.daKetThuc"
                    :items="trangThai"
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
                    label="Người chủ trì"
                    class="border-0"
                    v-model="daoTrang.nguoiChuTriId"
                    :items="nguoiChuTri"
                    @@update:model-value="handleChangeNguoiChuTri"
                  />
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
</template>

<style scoped>
</style>
