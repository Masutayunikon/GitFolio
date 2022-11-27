<template>
  <div class="container">
    <div class="container__login">
      <h3>Admin panel</h3>
      <h6>You are not an admin ? <nuxt-link to="/">Back to home</nuxt-link></h6>
      <input placeholder="username" type="text" v-model="username">
      <input placeholder="password" type="password" v-model="password">
      <button @click="login()">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">

let username = ref("");
let password = ref("");

const login = () => {
  console.log('login')
  $fetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      username: 'admin',
      password: 'admin'
    })
  }).then((res) => {
    const router = useRouter()
    if (res.success) {
      router.push('/admin/dashboard')
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
  .container__login {
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
      }
    }

    button {
      width: 60%;
      height: 30px;
      font-size: 1.2rem;
      border-radius: 5px;
      margin-top: 20px;
      margin-bottom: 10%;
      &:hover {
        cursor: pointer;
        background-color: #cecece;
      }

      &:active {
        background-color: #929292;
      }

    }

  }
}
</style>