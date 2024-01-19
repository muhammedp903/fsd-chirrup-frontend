<template>
    <div>
      <h1>Login</h1>

      <br/>

      <div v-show="submitted" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <div class="container" v-show="!submitted">
        <div class="row">
          <div class="col-md-6">
            <form @submit.prevent="handleSubmit">
              <label class="form-label" for="username">Username: </label>
              <input class="form-control" type="text" name="username" v-model="username"/>

              <br/>

              <label class="form-label" for="password">Password: </label>
              <input class="form-control" type="password" name="password" v-model="password"/>

              <br/><br/>

              <button class="btn btn-outline-primary">Login</button>
            </form>
          </div>

          <div class="col-md-6 pt-4 ps-md-5">
            <span class="passwordHintSpan">
                Password must be 8-32 characters and contain at least one uppercase and one lowercase letter, one number, and one special character.
            </span>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import {userService} from "@/services/user.service";
  import {store} from "@/services/store"

  export default {
    data(){
      return {
        username: "",
        password: "",
        submitted: false,
      };
    },
    mounted() {
      const token = localStorage.getItem("session_token");
      if(token){
        this.$router.replace("/profile");
      }
    },
    methods: {
      handleSubmit(e){
        this.submitted = true;
        const {username, password} = this;

        if(!(username && password)){
          this.$root.error = "Username and password are required";
          this.$root.toast.show();
          this.submitted = false;
          return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$£!%*?&.,^#])[A-Za-z\d@$£!%*?&.,^#]{8,32}$/;
        if(!(passwordPattern.test(password))){
          this.$root.error = "Password does not meet requirements";
          this.$root.toast.show();
          this.submitted = false;
          return;
        }

        userService.login(username, password)
            .then(result => {
              console.log("Auth successful");
              this.$router.replace("/");
              store.authenticated = true;
              this.$root.toast.hide()
            })
            .catch(error => {
              this.$root.error = error;
              this.$root.toast.show();
              this.submitted = false;
            });
      }
    },
  };
</script>

<style scoped>
  @media (max-width: 768px) {
    .passwordHintSpan{
      font-size: 80%;
    }
  }
</style>