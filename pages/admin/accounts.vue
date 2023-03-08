<template>
  <nuxt-layout name="admin">
    <div class="admin_accounts_page_container">
      <div class="content">
        <div class="account" v-for="account in accounts">
          <img :src="account.avatar" />
          <span class="name">{{account.username}}</span>
          <button @click="deleteAccount(account.id)"><Icon name="mdi:trash-can-empty" /></button>
        </div>
        <div class="new_account">
          <button @click="addAccount()"><Icon name="material-symbols:tab-new-right-outline"></Icon></button>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>

const accounts : Ref = ref([]);

const getAccounts = async () => {
  const response = await $fetch('/api/github/accounts', {
    method: 'GET'
  });

  if (response.success) {
    accounts.value = response.accounts;
  }
}

const deleteAccount = async (id : string) => {
  const response = await $fetch('/api/admin/github/account/delete', {
    method: 'DELETE',
    body: JSON.stringify({
      id
    })
  });

  if (response.success) {
    await getAccounts();
  }
}

const addAccount = async () => {
  const res = await $fetch('/api/admin/oauth/github/link', {
    method: 'GET',
  });
  if (res.success) {
    const win = window.open(res.url, 'Gitfolio oauth', 'width=600,height=600');
    const timer = setInterval(() => {
      if (win?.closed) {
        clearInterval(timer);
        getAccounts();
      }
    }, 1000);
  }
}

onBeforeMount(() => {
  getAccounts();
})

</script>

<style scoped lang="scss">

.admin_accounts_page_container {
  overflow: auto;
  color: white;
  font-weight: lighter;
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    margin-top: 5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    .account {
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      button {
        background-color: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
    .new_account {
      margin-top: 2rem;
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        background-color: transparent;
        border: none;
        color: white;
        font-size: 2.5rem;
        cursor: pointer;
        &:hover {
          color: green;
        }
      }
    }
  }
}

</style>