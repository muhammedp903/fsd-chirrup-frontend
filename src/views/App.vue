<template>
  <div>
    <Nav/>
    <br/>
    <router-view/>
  </div>
</template>

<script>
import Nav from "@/views/components/Nav.vue";

export default {
  components: {
    Nav
  }
}
</script>

<style scoped>

</style>