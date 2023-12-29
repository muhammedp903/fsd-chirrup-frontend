<template>
  <div>
    <h1>Register</h1>

    <br/>

    <div v-show="submitted" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div class="container">
      <div class="row" v-show="!submitted">
        <div class="col-md-6">
          <form @submit.prevent="handleSubmit">
            <label class="form-label" for="firstname">First name: </label>
            <input class="form-control" type="text" name="firstname" v-model="user.first_name"/>

            <br/>

            <label class="form-label" for="lastname">Last name: </label>
            <input class="form-control" type="text" name="lastname" v-model="user.last_name"/>

            <br/><br/>

            <label class="form-label" for="username">Username: </label>
            <input class="form-control" type="text" name="username" v-model="user.username"/>

            <br/>

            <label class="form-label" for="password">Password: </label>
            <input class="form-control" type="password" name="password" v-model="user.password"/>

            <br/><br/>

            <button class="btn btn-outline-primary">Create account</button>
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
    handleSubmit(){
      this.submitted = true;
      const {first_name, last_name, username, password} = this.user;

      if(!(first_name && last_name && username && password)){
        this.$root.error = "All fields are required";
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
  @media (max-width: 768px) {
    .passwordHintSpan{
      font-size: 80%;
    }
  }
</style>