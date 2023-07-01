<template>
  <div>
  </div>
</template>

<script>
import {Notyf} from "notyf";
import 'notyf/notyf.min.css'

export default {
  name: "Notyf",
  props: ['data'],
  created: function() {
    if (this.data) {
      this.showNotification();
    }
  },
  methods: {
    showNotification() {
      const notyf = new Notyf({
        duration: 4000,
        position: {
          x: 'center',
          y: 'bottom',
        },
        types: [{
          type: 'error',
          duration: 8000,
          dismissible: true
        }]
      });

      if (this.data.mode === 'error') {
        return notyf.error(this.data.message);
      }

      if (this.data.mode === 'warning') {
        return notyf.warning(this.data.message);
      }

      return notyf.success(this.data.message);
    },
  }
}
</script>
