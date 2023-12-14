<template>
  <div>
    <button class="d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <i class="bi-list"/>
    </button>

    <div class="offcanvas-lg offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Chirrup</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasNavbar" aria-label="Close"></button>
      </div>

      <div class="nav flex-column offcanvas-body">
        <ol class="nav navbar-nav me-auto mb-2 mb-md-0 justify-content-start flex-grow-1 ps-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="store.authenticated" to="/posts/new">Post</router-link>
          </li>
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
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/services/store";

export default {
  data(){
    return {
      store,
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
@import url('bootstrap-icons/font/bootstrap-icons.css');
button{
  background-color: transparent;
  border: none;
}
i{
  font-size: 3vw;
}
.offcanvas-lg{
  --bs-offcanvas-width: 250px;
}
</style>