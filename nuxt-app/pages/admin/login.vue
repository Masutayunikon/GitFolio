<template>
  <div class="container">
    <div class="container__login">
      <h3>Admin panel</h3>
      <h6>You are not an admin ? <nuxt-link to="/">Back to home</nuxt-link></h6>
      <input placeholder="username" type="text" v-model="username">
      <input placeholder="password" type="password" v-model="password">
      <span>{{ error }}</span>
      <button @click="login()">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">

let error = ref("");
let username = ref("");
let password = ref("");

const login = () => {
  $fetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  }).then((res) => {
    const router = useRouter()
    if (res.success) {
      router.push('/admin/dashboard')
    } else {
      error.value = <string>res.data?.error
      setTimeout(() => {
        error.value = ""
      }, 3000)
    }
  })
}

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #009eff;
  .container__login {
    background-color: orange;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-height: 300px;
    max-width: 300px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 12px 12px 2px 1px #535353;
    h3 {
      font-size: 1.5rem;
      margin-top: 8px;
    }
    h6 {
      font-size: 0.8rem;
      margin-top: 8px;
      margin-bottom: auto;
    }

    input {
      width: 80%;
      background-color: #fdf9d3;
      margin: 15px 0;
      height: 30px;
      font-size: 1.2rem;
      border-radius: 5px;
      text-align: center;
      border-top: 1px solid #535353;
      border-left: 1px solid #535353;
      border-right: 2px solid #535353;
      border-bottom: 2px solid #535353;
      &:focus {
        border: 2px solid #535353;
        outline: none;
      }
    }

    button {
      background-color: #fdf9d3;
      width: 60%;
      height: 30px;
      font-size: 1.2rem;
      border-radius: 5px;
      margin-top: 20px;
      margin-bottom: 10%;
      &:hover {
        cursor: pointer;
        background-color: #f6c866;
      }

      &:active {
        background-color: #faa91a;
      }

    }

    span {
      color: red;
    }

  }
}
</style>