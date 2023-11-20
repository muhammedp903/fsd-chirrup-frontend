<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="!authenticated" to="/login">Login</router-link>
      <router-link v-if="authenticated" to="/profile">Profile</router-link>
    </nav>
    <br/>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      authenticated: false,
    }
  },
  mounted() {
    const token = localStorage.getItem("session_token");
    if(token){
      this.authenticated = true;
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