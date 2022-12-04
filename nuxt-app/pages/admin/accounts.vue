<template>
  <div class="container">
    <div class="accounts_container">
      <div class="top_toolbar">
        <button @click="createAccount">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
        </button>
      </div>
      <div class="accounts_wrapper">
        <div v-for="account in accounts" class="account_wrapper">
          <img :src="account.avatar_url" alt="account avatar"/>
          <div class="account_name">
            {{ account.login }}
          </div>
          <div class="delete">
            <button @click="deleteAccount(account.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "admin",
})

let accounts: any = ref([])

onBeforeMount(() => {
  getAccounts()
})

const createAccount = async () => {
  await $fetch("/api/github/url").then((res) => {
    const handle : any = window.open(res.data.url, "Github", "width=600,height=600");

    // check if popup is closed
    const timer = setInterval(async () => {
      if (handle.closed) {
        clearInterval(timer);
        await getAccounts()
      }
    }, 1000);

  });
}

const deleteAccount = async (id: string) => {
  let accountsId = accounts.value.find((account: any) => account.id === id)
  accounts.value.splice(accounts.value.indexOf(accountsId), 1)
  await $fetch("/api/admin/account", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  }).then((res) => {
    // find in accounts

  });
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
  }
}


</script>

<style scoped lang="scss">

.container {
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .accounts_container {
    max-width: 750px;
    width: 100%;
    min-height: 60vh;
    background-color: var(--color-primary);
    border-radius: 30px;
    box-shadow: 12px 12px 2px 1px #535353;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top_toolbar {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        width: 50px;
        height: 50px;
        border: none;
        background-color: limegreen;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: green;
        }
        svg {
          width: 30px;
          height: 30px;
          fill: black;
        }
      }
    }
    .accounts_wrapper {
      margin: 2rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .account_wrapper {
        width: 80%;
        display: grid;
        grid-template-columns: 50px 2fr 1fr;
        img {
          max-width: 50px;
          max-height: 50px;
          border: 1px solid black;
        }
        .account_name {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid black;
        }
        .delete {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid black;
          button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            &:hover {
              svg {
                fill: red;
              }
            }
            svg {
              width: 20px;
              height: 20px;
              fill: var(--color-danger);
            }
          }
        }
      }
    }
  }
}

</style>