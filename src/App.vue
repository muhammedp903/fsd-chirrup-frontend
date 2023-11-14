<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        welcome_message: "Hello, World!",
        counter: 0
      };
    },
    methods: {
      increment(){
        this.counter ++;
      },
    },
    components: {

    }
  }
</script>

<style scoped>

</style>