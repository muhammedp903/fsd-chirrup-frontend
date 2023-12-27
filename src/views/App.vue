<template>
  <div class="container-fluid">
    <div class="row mt-3 mb-3">
      <div class="col-1 col-lg-2">
        <Nav/>
      </div>

      <div class="col ms-3 me-3">
        <router-view/>
      </div>

      <div class="col-1 col-lg-3">
        <Search v-if="this.$route.path==='/'"/> <!-- Only show the search bar on the home page -->
      </div>
    </div>
  </div>

  <errorToast :error="this.error"/>

</template>

<script>
import Nav from "@/views/components/Nav.vue";
import Search from "@/views/components/Search.vue";
import errorToast from "@/views/components/ErrorToast.vue";
import Toast from "bootstrap/js/dist/toast";

export default {
  components: {
    errorToast,
    Nav,
    Search
  },
  mounted() {
    this.toast = new Toast(document.getElementById('error-toast'));
  },
  data() {
    return {
      error: "",
      toast: null,
    };
  },
}
</script>

<style scoped>

</style>