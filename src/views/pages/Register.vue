<template>
  <div>
    <h1>Register</h1>

    <br/>

    <div v-show="submitted" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <form v-show="!submitted" @submit.prevent="handleSubmit">
      <label for="firstname">First name: </label>
      <input type="text" name="firstname" v-model="user.first_name"/>

      <br/><br/>

      <label for="lastname">Last name: </label>
      <input type="text" name="lastname" v-model="user.last_name"/>

      <br/><br/>

      <label for="username">Username: </label>
      <input type="text" name="username" v-model="user.username"/>

      <br/><br/>

      <label for="password">Password: </label>
      <input type="password" name="password" v-model="user.password"/>

      <br/><br/>

      <button>Create account</button>
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
    };
  },
  methods: {
    handleSubmit(e){
      this.submitted = true;
      const {first_name, last_name, username, password} = this.user;

      if(!(first_name && last_name && username && password)){
        this.$root.error = "All fields are required";
        this.$root.toast.show();
        return;
      }

      // todo: validate firstname, lastname, username
      // if(!(EmailValidator.validate(username))){
      //   this.error = "Email must be a valid email";
      //   return;
      // }
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$£!%*?&.,^#])[A-Za-z\d@$£!%*?&.,^#]{8,32}$/;
      if(!(passwordPattern.test(password))){
        this.$root.error = "Password does not meet requirements";
        this.$root.toast.show();
        return;
      }

      userService.createUser(this.user)
          .then(result => {
            console.log("Register successful");
            this.$router.push("/login");
          })
          .catch(error => {
            this.$root.error = error;
            this.$root.toast.show();
            this.submitted = false;
          })
    }
  },
}
</script>

<style scoped>

</style>