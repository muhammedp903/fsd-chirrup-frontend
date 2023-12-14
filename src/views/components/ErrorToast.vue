<script>
export default {
  props: {
    error: {
      type: String,
      required: true,
    }
  },
}
</script>

<template>
  <div id="error-toast" class="toast align-items-center text-bg-danger position-fixed bottom-0 start-0 p-3 m-3" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ error }}
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<style scoped>

</style>