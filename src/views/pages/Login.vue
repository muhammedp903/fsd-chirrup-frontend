<template>
    <div>
      <h1>Login</h1>

      <br/>

      <div v-show="submitted" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <form v-show="!submitted" @submit.prevent="handleSubmit">
        <label for="username">Username: </label>
        <input type="text" name="username" v-model="username"/>

        <br/><br/>

        <label for="password">Password: </label>
        <input type="password" name="password" v-model="password"/>

        <br/><br/>

        <button>Login</button>
      </form>

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

        // todo: validate username
        // if(!(EmailValidator.validate(username))){
        //   this.error = "Email must be a valid email";
        //   return;
        // }
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