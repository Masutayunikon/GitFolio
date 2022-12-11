<template>
  <div class="container">
    <div  class="profile_cards_container">
      <div v-for="account in accounts" class="card">
        <img alt="avatar" :src="account.avatar_url">
        <span class="name">{{ account.login }}</span>
        <span class="bio">{{ account.bio }}</span>
      </div>
    </div>
    <div class="repositories_container">
      <button @click="test">test</button>
    </div>
  </div>
</template>

<script setup lang="ts">

const accounts: any = ref([])

onBeforeMount(() => {
  getAccounts()
})

const test = async () => {
  const req: any = await $fetch('/api/github/repos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (req.success) {
    console.log(req.data)
  } else {
    console.log(req)
  }
}

const getAccounts = async () => {
  const req: any = await $fetch('/api/github/accounts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (req.success) {
    accounts.value = req.data.accounts
    console.log(accounts.value)
  }
}

</script>
<style scoped lang="scss">

.container {
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--color-primary);
  .profile_cards_container {
    width: 100%;
    background-color: var(--color-secondary);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .card {
      margin: 25px;
      border-radius: 10px;
      width: 450px;
      height: 250px;
      background-color: var(--color-quinary);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 30%;
        border-radius: 50%;
        margin-bottom: 10px;
      }

      .name {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .bio {
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
}

</style>