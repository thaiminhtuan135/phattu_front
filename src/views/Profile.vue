<template>
  <div class="px-4">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <h1>Cập nhật người dùng</h1>
      <v-row class="mb-4">
        <div class="position-relative">
          <v-avatar size="250" class="box-zoom-out mt-3 ml-6" @click="chooseImage">
            <img :src="filePreview ? filePreview : 'http://localhost:8084/images/user.png'" alt="">
          </v-avatar>
          <span class="position-absolute" style="right: 0px">
            <v-icon size="50" icon="mdi mdi-delete-circle-outline" @click="clearImagePreview"/>
          </span>
        </div>
        <v-file-input
          v-model="image"
          @change="onChange"
          @click:clear="clearImagePreview()"
          label="Image"
          ref="fileInput"
          style="display: none"
        >
        </v-file-input>
      </v-row>
      <v-btn @click="chooseImage">
        <v-icon icon="mdi mdi-camera"/>
        Chọn ảnh
      </v-btn>
      <v-row class="d-flex justify-space-between mt-5">
        <InputCustom
          label="Họ"
          variant="outlined"
          type="text"
          v-model="phattu.ho"
          class="max-with"
        />
        <InputCustom
          label="Tên Đệm"
          variant="outlined"
          type="text"
          v-model="phattu.tenDem"
          class="ml-5 max-with"
        />
        <InputCustom
          label="Tên"
          variant="outlined"
          type="text"
          v-model="phattu.ten"
          class="ml-5 max-with"
        />
      </v-row>
      <v-row class="d-flex justify-space-between t-5">
        <InputCustom
          label="Pháp Danh"
          variant="outlined"
          type="text"
          v-model="phattu.phapDanh"
          class="max-with"
          :rule="[validate.required(phattu.phapDanh,'Pháp danh')]"
        />
        <InputCustom
          label="Số điện thoại"
          variant="outlined"
          type="text"
          v-model="phattu.soDienThoai"
          class="ml-5 max-with"
          :rule="[validate.required(phattu.soDienThoai,'Số điện thoại') , validate.telephone]"
        />
        <InputCustom
          label="email"
          variant="outlined"
          type="text"
          v-model="phattu.email"
          class="ml-5 max-with"
          :rule="[validate.required(phattu.email,'Email')]"
        />
      </v-row>
      <v-row class="mb-4 d-flex justify-start mt-6" style="gap: 50px">
        <div class="position-relative">
          <label class="position-absolute px-1" :class="phattu.ngaySinh ? 'label-date-time' : ''">Ngày Sinh</label>
          <datepicker
            format="yyyy/MM/dd"
            placeholder="Ngày sinh"
            v-model="phattu.ngaySinh"
            style="z-index: 1"
            clear-button
          />
        </div>
        <div class="position-relative">
          <label class="position-absolute px-1" :class="phattu.ngayXuatGia ? 'label-date-time' : ''">Ngày xuất
            gia</label>
          <datepicker
            format="yyyy/MM/dd"
            placeholder="Ngày xuất gia"
            v-model="phattu.ngayXuatGia"
            style="z-index: 1;"
            clear-button
          />
        </div>
        <div class="position-relative">
          <label class="position-absolute px-1" :class="phattu.ngayHoanTuc ? 'label-date-time' : ''">Ngày hoàn
            tục</label>
          <datepicker
            format="yyyy/MM/dd"
            placeholder="Ngày hoàn tục"
            v-model="phattu.ngayHoanTuc"
            style="z-index: 1"
            clear-button
          />
        </div>
        <v-select
          v-model="phattu.gioiTinh"
          :items="items"
          item-title="title"
          item-value="value"
          label="Giới tính"
          @update:model-value="handleChangeGioitinh"
        ></v-select>
      </v-row>
      <v-row>
        <p style="align-items: center" class="mr-2">Đã hoàn tục</p>
        <v-btn-toggle>
          <v-btn style="border: 2px solid grey;border-right: none" color="success" :active="phattu.daHoanTuc === true"
                 @click="phattu.daHoanTuc = true">
            <p>Có</p>
          </v-btn>

          <v-btn style="border: 2px solid grey" color="success" :active="phattu.daHoanTuc === false" @click="phattu.daHoanTuc = false">
            <p>không</p>
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <div class="text-center mt-4">
        <v-btn
          :disabled="!form"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          style="border-radius: 100px;width: 50%;"
        >
          Edit
        </v-btn>
      </div>
    </v-form>
  </div>
  <Loader :flag-show="flagShow"/>
  <Notyf v-if="editSuccess" :data="messageSuccess"/>
</template>

<script>
import axios from "axios";
import {User} from "@/auth/User";
import {AppStorage} from "@/auth/AppStorage";
import InputCustom from "@/components/common/form-elements/InputCustom.vue";
import Datepicker from "vuejs3-datepicker";
import Loader from "@/components/common/Loader.vue";
import {validate} from "@/util/validate";
import moment from "moment";
import Notyf from "@/components/common/Notyf.vue";

export default {
  name: "Profile",
  components: {Notyf, Loader, InputCustom, Datepicker},
  created() {
    const {getToken} = AppStorage();
    const {getUserId} = User();
    axios
      .get(`http://localhost:8084/api/v1/user/${getUserId()}`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        }
      })
      .then((res) => {
        this.phattu = res.data;
        if (this.phattu.anhChup) {
          this.filePreview = "http://localhost:8084/" + this.phattu.anhChup;
        }
      }).catch((r) => console.log(r));
  },
  data() {
    return {
      validate: validate,
      phattu: null,
      filePreview: "",
      form: false,
      flagShow: false,
      isUpdateImg: false,
      items: [
        {title: 'Nam', value: 'Nam'},
        {title: 'Nu', value: 'Nu'},
        {title: 'Khac', value: 'Khac'},
      ],
      messageSuccess: {
        message: "Edit successfully",
      },
      messageFail: {
        mode: "error",
        message: "",
      },
      editSuccess: false,
    }
  },
  methods: {
    onChange(e) {
      this.isUpdateImg = true;
      this.phattu.anhChup = e.target.files[0];
      let fileInput = this.$refs.fileInput;
      let imgFile = fileInput.files;

      if (imgFile && imgFile[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(imgFile[0]);
      }
    },
    chooseImage() {
      this.$refs["fileInput"].click();
    },
    clearImagePreview() {
      this.filePreview = "";
      this.isUpdateImg = true;
    },
    onSubmit() {
      this.flagShow = true;
      this.loading = true;
      const {getToken} = AppStorage();
      const formData = new FormData();
      formData.append("isUpdateImg", this.isUpdateImg);
      formData.append("ho", this.phattu.ho);
      formData.append("tenDem", this.phattu.tenDem);
      formData.append("ten", this.phattu.ten);
      formData.append("phapDanh", this.phattu.phapDanh);
      formData.append("soDienThoai", this.phattu.soDienThoai);
      formData.append("anhChup", this.phattu.anhChup);
      formData.append("ngaySinh", moment(this.phattu.ngaySinh).format('YYYY-MM-DD'));
      formData.append("ngayXuatGia", moment(this.phattu.ngayXuatGia).format('YYYY-MM-DD'));
      formData.append("ngayHoanTuc", moment(this.phattu.ngayHoanTuc).format('YYYY-MM-DD'));
      formData.append("gioiTinh", this.phattu.gioiTinh);
      formData.append("daHoanTuc", this.phattu.daHoanTuc);
      axios
        .put(`http://localhost:8084/api/v1/user/${this.phattu.id}/edit`, formData, {
          headers: {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "multipart/form-data",
          }
        })
        .then((res) => {
          console.log(res)
          this.editSuccess = true;
          setTimeout(() => (this.flagShow = false), 500);
        }).catch((err) => {
        console.log(err)
      });
    },
    handleChangeGioitinh(e) {
      console.log(e)
      console.log(this.phattu.gioiTinh)
    },
  }
}
</script>

<style scoped>
.box-zoom-out {
  border: 6px solid #CCC;
}

.box-zoom-out img {
  max-height: 100%;
  transition: all 1s;
  transform: scale(1);
  object-fit: fill;
  cursor: pointer;
}

.box-zoom-out:hover img {
  transform: scale(1.2);
}

.label-date-time {
  top: -10px;
  left: 10px;
  color: darkslategrey;
  z-index: 2;
  background-color: #fff;
  font-size: 13px;
}

.gray-border {
  border-color: gray;
}

.max-with {
  max-width: 32%;
}
</style>
