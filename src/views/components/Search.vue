<template>
  <form @submit.prevent="handleSearch">
    <input type="text" placeholder="Search" name="search" v-model="search"/>
    <button>Search</button>
  </form>

  <div>
    <ul v-if="results.length">
      <li v-for="user in results" :key="user.user_id">
        <router-link :to="'/users/' + user.user_id">
          {{user.first_name + "" + user.last_name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {socialService} from "@/services/social.service";

export default {
  data(){
    return {
      search: "",
      results: []
    };
  },
  methods: {
    handleSearch(){
      socialService.searchUsers(this.search)
          .then((res) => {
            console.log(res);
            this.results = res;
          })
          .catch(error => this.error = error);
    }
  }
}

</script>

<style scoped>

</style>