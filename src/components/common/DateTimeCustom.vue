<template>
  <div class="position-relative">
    <label class="position-absolute px-1" :class="model ? 'label-date-time' : ''">{{placeholder}}</label>
    <Datepicker
      format="yyyy/MM/dd"
      :placeholder="placeholder"
      :v-model="model"
      clear-button="true"
      style="z-index: 1"
    />
  </div>
</template>

<script>
import Datepicker from "vuejs3-datepicker";

export default {
  name: "DateTimeCustom",
  components: {Datepicker},
  props: {
    placeholder: {
      type: String,
      default: "",
      required : true
    },
    model: {
      type: String,
      default: "",
      required: true
    },
    classes: {

    }
  }
}
</script>

<style scoped>
.label-date-time {
  top: -10px;
  left: 10px;
  color: grey;
  z-index: 2;
  background-color: #fff;
  font-size: 13px;
}
</style>
