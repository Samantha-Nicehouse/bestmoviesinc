<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <input v-model="email" type="text" class="form-control" placeholder="email" required>

    <input v-model="password" type="password" class="form-control" placeholder="Password" required>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script>
import cookies from "js-cookie"
export default {
   
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      try{

       const response = await this.$axios( {
        method: 'post',
        url:"https://bmiwebapi3.azurewebsites.net/api/auth/sign-in",
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({
          id: "",
          email: this.email,
          password: this.password
        })
      });
      if(response.data && response.status === 200)
      {
              this.$axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.get("x-access-token")}`
      };

      cookies.set("x-access-token", response.data.token, { expires: 7 });
      this.$emit("updateAuth",true);
      }
      }
      catch(e){
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>