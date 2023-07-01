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
          if (userInfo.roles === "ADMIN" && hasToken()) {
            this.$router.push({path: "/admin/dashboard"});
          } else {
            this.$router.push({path : "/user/dashboard" });
          }
        }).catch((err) => {
        console.log(err)
      });
    },
  }
}
</script>
<style scoped>
.section-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: inherit;
  //background: url("../assets/Background-phong-canh-dep-bat-mat.jpg") no-repeat;
  animation: animteBg 5s linear infinite;
  object-fit: cover;
}

@keyframes animteBg {
  100% {
    filter: hue-rotate(60deg);
  }
}

.login-box {
  //border: 2px solid rgba(255, 255, 255, .5);
  border: 2px solid black;
  width: 400px;
  height: 450px;
  background: transparent;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
}

h2 {
  font-size: 2em;
  //color: #fff;
  color: black;
  text-align: center;
}

.input-box {
  position: relative;
  width: 310px;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  //color: #fff;
  color: black;
  pointer-events: none;
  transition: .5s;
}

.input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  color: #fff;
  padding: 0 35px 0 5px;
}

.input-box input:focus ~ label, .input-box input:valid ~ label {
  top: -5px;

}

.input-box .icon {
  position: absolute;
  right: 8px;
  color: black;
  //color: #fff;
  font-size: 1.2em;
  line-height: 57px;
}

.remember-forgot {
  margin: -15px 0 15px;
  font-size: .9em;
  display: flex;
  justify-content: space-between;
}

.remember-forgot label input {
  margin-right: 3px;
}

.remember-forgot a {
  text-decoration: none;
  //color: #fff;
  color: black;
}

.remember-forgot a:hover {
  text-decoration: underline;
}

button {
  width: 100%;
  height: 40px;
  //background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 1em;
  color: #000;
  font-weight: 500;
}

.register-link p a {
  //color: #ffffff;
  color: black;
  text-decoration: none;
  font-weight: 600;
}

.register-link {
  font-size: .9em;
  //color: #ffffff;
  color: black;
  text-align: center;
  margin: 25px 0 10px;
}

.register-link p a:hover {
  text-decoration: underline;
}
</style>

