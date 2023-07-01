<template>
  <v-text-field
    :rules="rule"
    :label="label"
    :variant="variant"
    :type="type"
    :class="this.class"
    @input="handleInput"
  ></v-text-field>
</template>

<script>
export default {
  name: 'InputCustom',
  props: {
    label: String,
    variant: String,
    rule: Array,
    type: String,
    class: {
      type: String,
      default: ''
    },
    handleInput: {
      type: Function,
      required: false
    },
  },
  methods: {}
}
</script>

<style scoped></style>
