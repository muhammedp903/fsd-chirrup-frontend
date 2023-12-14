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

      <errorToast :error="this.error"/>
    </div>
</template>

<script>
  import {userService} from "@/services/user.service";
  import {store} from "@/services/store"
  import errorToast from "@/views/components/ErrorToast.vue";
  import Toast from "bootstrap/js/dist/toast";

  export default {
    data(){
      return {
        username: "",
        password: "",
        submitted: false,
        error: ""
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
        this.error = "";
        let toast = new Toast(document.getElementById('error-toast'));
        const {username, password} = this;

        if(!(username && password)){
          this.error = "Username and password are required";
          toast.show();
          return;
        }

        // todo: validate username
        // if(!(EmailValidator.validate(username))){
        //   this.error = "Email must be a valid email";
        //   return;
        // }
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$£!%*?&.,^#])[A-Za-z\d@$£!%*?&.,^#]{8,32}$/;
        if(!(passwordPattern.test(password))){
          this.error = "Password does not meet requirements";
          toast.show();
          return;
        }

        userService.login(username, password)
            .then(result => {
              console.log("Auth successful");
              this.$router.replace("/");
              store.authenticated = true;
            })
            .catch(error => {
              this.error = error;
              toast.show();
              this.submitted = false;
            });
      }
    },
    components: {
      errorToast
    }
  };
</script>