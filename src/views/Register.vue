<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <div style="display: flex;justify-content: center">
      <h1>Register</h1>
    </div>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <div style="position: relative;">
        <InputCustom
          label="Email"
          variant="solo"
          :rule="[validate.required(email, 'Email'), validate.email]"
          v-model="email"
          type="text"
        />
        <p v-if="messageErrorEmail !== ''" style="bottom: 0;font-size: 12px;color: #b20020;left: 16px">
          <span class="move-animation">{{ messageErrorEmail }}</span>
        </p>
      </div>
      <InputCustom
        label="Password"
        variant="solo"
        :rule="[validate.required(password, 'Password'), validate.minlength]"
        v-model="password"
        type="password"
      />
      <InputCustom
        label="Confirm password"
        variant="solo"
        :rule="[validate.required(confirmPassword, 'Confirm Password'), validate.minlength,passwordConfirmationRule]"
        v-model="confirmPassword"
        type="password"
      />
      <router-link style="float: right;margin-bottom: 3px;text-decoration: none" :to="{name : 'login'}">Login</router-link>
      <br />
      <v-btn
        :disabled="!form"
        :loading="loading"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Sign up
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import {validate} from "@/util/validate";
import InputCustom from "@/components/common/form-elements/InputCustom.vue";
import Datepicker  from "vuejs3-datepicker";
import moment from "moment";
import axios from "axios";
import _ from 'lodash';
import {AppStorage} from "@/auth/AppStorage";
export default {
  name: "Register",
  components: {InputCustom , Datepicker },
  data() {
    return {
      username: "",
      form: false,
      email: null,
      password: null,
      confirmPassword: null,
      loading: false,
      validate: validate,
      date: null,
      count: 0,
      messageErrorEmail: "",
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    },
  },
  methods: {
    onSubmit() {
      const {getToken} = AppStorage();
      if (!this.form) return;
      this.loading = true;

      setTimeout(() => (this.loading = false), 1000);
      const registerData = {email : this.email , password: this.password}
      console.log(registerData);
      axios
        .post("http://localhost:8084/api/v1/auth/register", registerData,{
          headers: {
            Authorization: "Bearer " + getToken(),
          }
        })
        .then((res) => {
          if (res.status == 200) {
            this.$router.push({path : "/login" })
          }
        }).catch(() => {
      });
    },
    checkEmail: _.debounce(
      function () {
        const {getToken} = AppStorage();
        axios
          .post(`http://localhost:8084/api/v1/auth/check-exist-email/${this.email}`,{}, {
            headers: {
              Authorization: "Bearer " + getToken(),
            }
          })
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              this.messageErrorEmail = "Email already exists";
            }
          }).catch(() => {}
        );
      },500
    ),
  },
  watch:{
    date() {
      console.log(moment(this.date).format('MM/DD/YYYY'));
    },
    email() {
      this.checkEmail();
      this.messageErrorEmail = "";
    },
  }
}
</script>

<style scoped>
@keyframes MoveUpDown {
  0% {
    bottom: 5px;
  }
  50% {
    bottom: -1px;
  }
}

.move-animation {
  animation: MoveUpDown 0.5s ease;
  position: absolute;
  left: 0;
  bottom: -1px;
  margin-left: 16px;
}
</style>
