<script setup>

defineOptions({
  name: "CustomSelect",
  inheritAttrs: false,
})
</script>
<template>
  <div :class="$attrs.class">
    <VLabel
      v-if="$attrs.label"
      class="mb-1 text-body-2 text-high-emphasis"
      :text="$attrs.label"
    />
    <VSelect
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
      }"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
    </VSelect>
  </div>
</template>

