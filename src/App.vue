<template>
  <div>
    <h1>{{ welcome_message }}</h1>
    <p>Counter: {{counter}}</p>
    <button v-on:click="increment">Add One</button>
    <p v-if="counter >= 5">Big number</p>
    <p v-else>Little number</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        welcome_message: "Hello, World!",
        counter: 0
      }
    },
    methods: {
      increment(){
        this.counter ++;
      }
    },
    components: {
      Login
    }
  }
</script>

<style scoped>

</style>