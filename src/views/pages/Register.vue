<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <label for="firstname">First name: </label>
      <input type="text" name="firstname" v-model="user.first_name"/>
      <div v-show="submitted && !user.first_name">First name is required</div>

      <br/><br/>

      <label for="lastname">Last name: </label>
      <input type="text" name="lastname" v-model="user.last_name"/>
      <div v-show="submitted && !user.last_name">Last name is required</div>

      <br/><br/>

      <label for="username">Username: </label>
      <input type="text" name="username" v-model="user.username"/>
      <div v-show="submitted && !user.username">Username is required</div>

      <br/><br/>

      <label for="password">Password: </label>
      <input type="password" name="password" v-model="user.password"/>
      <div v-show="submitted && !user.password">Password is required</div>

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
      user: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
      },
      submitted: false,
      error: ""
    };
  },
  methods: {
    handleSubmit(e){
      this.submitted = true;
      this.error = "";
      const {first_name, last_name, username, password} = this.user;

      if(!(first_name && last_name && username && password)){
        return;
      }

      // todo: validate firstname, lastname, username
      // if(!(EmailValidator.validate(username))){
      //   this.error = "Email must be a valid email";
      //   return;
      // }
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$£!%*?&.,^#])[A-Za-z\d@$£!%*?&.,^#]{8,32}$/;
      if(!(passwordPattern.test(password))){
        this.error = "Password does not meet requirements";
        return;
      }

      userService.createUser(this.user)
          .then(result => {
            console.log("Register successful");
            this.$router.push("/login");
          })
          .catch(error => {
            this.error = error;
            this.submitted = false;
          })
    }
  }
}
</script>

<style scoped>

</style>