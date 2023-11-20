<template>
  <div>
    <em v-if="user.loading">Loading user...</em>

    <div v-else>
      <p>Name: {{user.first_name + " " + user.last_name}}</p>
      <p>Posts: {{user.posts}}</p>

      <button v-if="authenticated" @click="logout">Logout</button>

      <hr />
      <p>All user info</p>
      <p>{{user}}</p>
    </div>

    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import {userService} from "@/services/user.service";

export default {
  data(){
    return {
      user: {},
      authenticated: false,
      error: "",
    };
  },
  mounted() {
    this.user.loading = true;
    let id = "";
    console.log(this.$route)

    if(this.$route.path === "/profile"){
      // If the path is /profile, the user is logged in and on their own profile page...
      id = localStorage.getItem("user_id");
      this.authenticated = true;
    } else {
      // ...otherwise, the path will be /user/:id - the user is viewing someone else's profile
      id = this.$route.params.id;
    }

    userService.getUser(id)
        .then((user) => {
          this.user = user;
        })
        .catch(error => this.error = error);
  },
  methods: {
    logout(){
      userService.logout()
          .then(() => this.$router.push("/"))
          .catch(error => this.error = error);
    }
  }
};
</script>

<style scoped>

</style>