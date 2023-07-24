<template>
  <v-card class="mx-auto">
    <section class="section-login">
      <div class="body-login">
        <div class="login-box">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <h2>Login</h2>
            <div class="input-box">
              <span class="icon"><v-icon>mdi mdi-email</v-icon></span>
              <InputCustom
                label="Email"
                variant="outlined"
                :rule="[validate.required(email, 'Email'), validate.email]"
                v-model="email"
                type="text"
              />
            </div>
            <div class="input-box">
              <span class="icon"><v-icon>mdi mdi-lock</v-icon></span>
              <InputCustom
                label="Password"
                variant="outlined"
                :rule="[validate.required(password, 'Password'), validate.minlength]"
                v-model="password"
                type="password"
              />
            </div>
            <div class="remember-forgot">
              <label style="color: black"><input type="checkbox">Remember me</label>
              <a href="#">Forgot password</a>
            </div>
            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              size="large"
              type="submit"
              variant="flat"
              color="primary"
              style="border-radius: 30px"
            >
              Sign In
            </v-btn>
            <div class="register-link">
              <p>Dont't have an account? <a href="">Register</a></p>
            </div>
          </v-form>
        </div>
      </div>
    </section>
    <Loader :flag-show="flagShow"/>
    <Notyf v-if="loginSuccess" :data="message" />
  </v-card>

</template>

<script>
import InputCustom from "@/components/common/form-elements/InputCustom.vue";
import {validate} from "@/util/validate";
import {User} from "@/auth/User";
import axios from "axios";
import Loader from "@/components/common/Loader.vue";
import Notyf from "@/components/common/Notyf.vue";
export default {
  name: 'Login',
  components: {Notyf, Loader, InputCustom},
  data() {
    return {
      username: "",
      form: false,
      email: null,
      password: null,
      loading: false,
      validate: validate,
      flagShow: false,
      message: {
        message: "",
      },
      loginSuccess: false,
    }
  },
  methods: {
    onSubmit() {
      if (!this.form) return;
      this.flagShow = true;
      this.loading = true;

      setTimeout(() => (this.loading = false), 1000);
      const {responseAfterLogin , hasToken} = User();

      axios
        .post("http://localhost:8084/api/v1/auth/authenticate", {email:this.email, password:this.password})
        .then((res) => {
          const payload = res.data.token.split(".")[1];
          const userInfo = JSON.parse(atob(payload));
          responseAfterLogin(res.data.token, userInfo.username);
          this.flagShow = false;
          this.loginSuccess = true;
          this.message.message = "Login successfully";
          if (userInfo.roles === "ADMIN"  && hasToken()) {
            this.$router.push({path: "/admin/dashboard"});
          } else if (userInfo.roles === "MANAGER" && hasToken()) {
            this.$router.push({path: "/mana ger/dashboard"});
          } else {
            this.$router.push({path: "/user/dashboard"});
          }

        }).catch((err) => {
        console.log(err)
      });
    },
  }
}
</script>

