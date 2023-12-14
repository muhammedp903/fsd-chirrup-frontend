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
    <errorToast :error="this.error"/>
  </div>
</template>

<script>
import {userService} from "@/services/user.service";
import errorToast from "@/views/components/ErrorToast.vue";
import Toast from "bootstrap/js/dist/toast";

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
      let toast = new Toast(document.getElementById('error-toast'));
      const {first_name, last_name, username, password} = this.user;

      if(!(first_name && last_name && username && password)){
        this.error = "All fields are required";
        toast.show();
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
        toast.show();
        return;
      }

      userService.createUser(this.user)
          .then(result => {
            console.log("Register successful");
            this.$router.push("/login");
          })
          .catch(error => {
            this.error = error;
            toast.show();
            this.submitted = false;
          })
    }
  },
  components: {
    errorToast
  }
}
</script>

<style scoped>

</style>