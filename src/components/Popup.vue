<template>
  <div class="popup-container">
      <div class="popup-inner">
          <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          <div style="text-align: center">
              <slot>Mistake</slot>
          </div>
      </div>
  </div>

</template>

<script>
export default {
    emits: ["popupClosed"],

    methods: {
        close() {
            this.$emit("popupClosed")
        }
    }
}
</script>

<style scoped>
.popup-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    rigth: 0;
    z-index: 99;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-inner {
    position: relative;
    background: #fff;
    padding: 28px;
    width: 500px;
}
</style>