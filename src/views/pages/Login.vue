<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
          <label for="username">Username: </label>
          <input type="text" name="username" v-model="username"/>
          <div v-show="submitted && !username">Username is required</div>

          <br/><br/>

          <label for="password">Password: </label>
          <input type="password" name="password" v-model="password"/>
          <div v-show="submitted && !password">Password is required</div>

          <button>Login</button>
          <div v-if="error">{{error}}</div>
        </form>
    </div>
</template>

<script>
  import {userService} from "@/services/user.service";

  export default {
    data(){
      return {
        username: "",
        password: "",
        submitted: false,
        error: ""
      };
    },
    methods: {
      handleSubmit(e){
        this.submitted = true;
        this.error = "";
        const {username, password} = this;

        if(!(username && password)){
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
          return;
        }

        userService.login(username, password)
            .then(result => {
              console.log("Auth successful");
              this.$router.push("/");
            })
            .catch(error => {
              this.error = error;
              this.submitted = false;
            })
      }
    }
  }
</script>