<template>
  <div>
    <em v-if="user.loading">Loading user...</em>

    <div v-else>
      <p>Name: {{user.first_name + " " + user.last_name}}</p>
      <p>Posts: {{user.posts}}</p>

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
      error: "",
    };
  },
  created() {
    this.user.loading = true;

    userService.getUser(this.$route.params.id)
        .then((user) => {
          this.user = user;
        })
        .catch(error => this.error = error);
  },
};
</script>

<style scoped>

</style>