<template>
  <div class="page__login">
    <div class="login_card">
      <div class="login_card__content">
        <span class="back_home">this page is reserved to admins, if you are lost go back to the <nuxt-link to="/">home</nuxt-link> </span>
        <div class="form">
          <input v-model="username" placeholder="username"/>
          <input v-model="password" placeholder="password"/>
          <button @click="login">login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const username : Ref = ref('');
const password : Ref = ref('');

const login = async () => {
  const response =  await $fetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const router = useRouter();

  if (response.success) {
    router.push({ path: '/admin/repositories'});
  }
}
</script>

<style scoped lang="scss">

.page__login {
  font-family: 'Poppins',ui-monospace;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_card {
    width: 100%;
    max-width: 500px;
    padding: 1rem;
    margin: 0 1rem;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #1e1e1e;
    .login_card__content {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .back_home {
        font-size: 1rem;
        font-weight: 600;
        padding: 1rem;
        text-align: center;
        height: 10%;
        margin-bottom: 3rem;
      }
      .form {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        input {
          width: 80%;
          max-width: 300px;
          height: 2rem;
          max-height: 50px;
          border: 1px solid #1e1e1e;
          border-radius: 4px;
          padding: 0.5rem;
          font-size: 1rem;
        }
        button {
          width: 80%;
          max-width: 300px;
          height: 2rem;
          max-height: 50px;
          border: 1px solid #1e1e1e;
          border-radius: 4px;
          padding: 0.5rem;
          font-size: 1rem;
          background-color: #1e1e1e;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}

</style>