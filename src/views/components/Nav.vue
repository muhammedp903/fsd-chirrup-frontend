<template>
  <div>
    <nav class="navbar navbar-expand-md m-2 bg-light">
      <div class="container-fluid m-2">
        <router-link class="navbar-brand" to="/">Chirrup</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ol class="nav navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="store.authenticated" to="/posts/new">Post</router-link>
            </li>
          </ol>

          <ol class="nav navbar-nav navbar-right ms-auto me-2 mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" v-if="!store.authenticated" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="!store.authenticated" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="store.authenticated" to="/profile">Profile</router-link>
            </li>
          </ol>

          <form v-if="this.$route.path==='/'" class="d-flex" role="search" @submit.prevent="handleSearch">
            <input class="form-control me-2" type="search" placeholder="Search users" name="Search" aria-label="Search" v-model="searchString"/>
            <button class="btn btn-outline-success" type="submit" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasSearch" aria-labelledby="offcanvasSearchLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasSearchLabel">Search results</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          <div v-if="searchResults.length">
            <UserCard v-for="user in searchResults" :key="user.user_id" :user="user"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/services/store"
import {socialService} from "@/services/social.service";
import UserCard from "@/views/components/UserCard.vue";

export default {
  data(){
    return {
      store,
      searchString: "",
      searchResults: []
    }
  },
  mounted() {
    let token = localStorage.getItem("session_token");
    if(token){
      store.authenticated = true;
    }
  },
  methods: {
    handleSearch(){
      socialService.searchUsers(this.searchString)
          .then((res) => {
            this.searchResults = res;
          })
          .catch(error => this.error = error);
    }
  },
  components: {
    UserCard,
  }
}
</script>

<style scoped>

</style>