<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="!store.authenticated" to="/login">Login</router-link>
      <router-link v-if="!store.authenticated" to="/register">Register</router-link>
      <router-link v-if="store.authenticated" to="/profile">Profile</router-link>
    </nav>
  </div>
</template>

<script>
import {store} from "@/services/store"

export default {
  data(){
    return {
      store
    }
  },
  mounted() {
    let token = localStorage.getItem("session_token");
    if(token){
      store.authenticated = true;
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style scoped>

</style>