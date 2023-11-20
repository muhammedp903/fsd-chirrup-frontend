<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
          <label for="email">Email: </label>
          <input type="email" name="email" v-model="email"/>
          <div v-show="submitted && !email">Email is required</div>

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
  import * as EmailValidator from "email-validator";

  export default {
    data(){
      return {
        email: "",
        password: "",
        submitted: false,
        error: ""
      };
    },
    methods: {
      handleSubmit(e){
        this.submitted = true;
        this.error = "";
        const {email, password} = this;

        if(!(email && password)){
          return;
        }

        if(!(EmailValidator.validate(email))){
          this.error = "Email must be a valid email";
          return;
        }
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$£!%*?&.,^#])[A-Za-z\d@$£!%*?&.,^#]{8,32}$/;
        if(!(passwordPattern.test(password))){
          this.error = "Password does not meet requirements";
          return;
        }
        // TODO: API request
        alert("Submit");
      }
    }
  }
</script>