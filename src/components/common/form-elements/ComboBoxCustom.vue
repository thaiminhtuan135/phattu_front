<script setup>

</script>
<template>
  <div
    :class="$attrs.class"
  >
    <VLabel
      v-if="$attrs.label"
      class="mb-1 text-body-2 text-high-emphasis"
      :text="$attrs.label"
    />

    <VCombobox
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
      }"
    />
  </div>
</template>
