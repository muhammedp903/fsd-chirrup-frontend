<template>
  <div>
    <button class="d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearchbar" aria-controls="offcanvasSearchbar">
      <i class="bi-search"/>
    </button>

    <div class="offcanvas-lg offcanvas-end" tabindex="-1" id="offcanvasSearchbar" aria-labelledby="offcanvasSearchbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasSearchbarLabel">Search</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSearchbar" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body">
        <div>
          <form v-if="this.$route.path==='/'" class="d-flex" role="search" @submit.prevent="handleSearch">
            <input class="form-control me-2" type="search" placeholder="Search users" name="Search" aria-label="Search" v-model="searchString"/>
            <button class="btn btn-outline-success" type="submit" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">Search</button>
          </form>
          <br/>
          <div v-if="searchResults.length">
            <UserCard @click="clearSearch" v-for="user in searchResults" :key="user.user_id" :user="user"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {socialService} from "@/services/social.service";
import UserCard from "@/views/components/UserCard.vue";

export default {
  data(){
    return {
      searchString: "",
      searchResults: []
    }
  },
  mounted() {
  },
  methods: {
    handleSearch(){
      socialService.searchUsers(this.searchString)
          .then((res) => {
            this.searchResults = res;
          })
          .catch(error => this.error = error);
    },
    clearSearch(){
      this.searchResults = [];
      this.searchString = "";
    }
  },
  components: {
    UserCard,
  }
}
</script>

<style scoped>
@import url('bootstrap-icons/font/bootstrap-icons.css');
button{
  border: none;
  background-color: transparent;
  align-self: start;
}
i{
  font-size: 3vw;
  align-self: start;
}
</style>