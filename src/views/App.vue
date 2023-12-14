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
        <Search/>
      </div>
    </div>
  </div>

</template>

<script>
import Nav from "@/views/components/Nav.vue";
import Search from "@/views/components/Search.vue";

export default {
  components: {
    Nav,
    Search
  }
}
</script>

<style scoped>

</style>