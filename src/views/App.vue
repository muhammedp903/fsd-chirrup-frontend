<template>
  <div>
    <Nav/>
    <br/>
    <router-view class="m-4"/>
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