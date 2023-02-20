<template>
  <div class="page__admin">
    <div class="menu">
      <Icon class="menu__bar" @click="toggleSpan" :name="icon" />
      <span @click="changeTab('Github')">Github</span>
      <span @click="changeTab('Configuration')">Configuration</span>
      <span @click="changeTab('Database')">Database</span>
    </div>
    <div class="page" v-if="selectedTab === 'Github'">
      <div class="toolbar">
        <button @click="addAccount" style="background-color: green; font-weight: bold;">Add account</button>
        <button @click="getAccounts" style="background-color: dodgerblue; font-weight: bold;">Refresh accounts</button>
      </div>
      <div  class="content">
        <h2 class="title">Accounts</h2>
        <div class="account" v-for="account in accounts" :key="account.id">
          <img :src="account.avatar"  alt="avatar"/>
          <span>{{account.username}}</span>
        </div>
      </div>
    </div>
    <div class="page" v-if="selectedTab === 'Configuration'">
      <div class="toolbar"></div>
      configuration
    </div>
    <div class="page" v-if="selectedTab === 'Database'">
      <div class="toolbar">
        <button @click="resetDatabase" style="background-color: red; font-weight: bold;">Reset database</button>
      </div>
      <div id="database_status" class="status">{{message}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const selectedTab = ref('github');

const icon = ref("fa6-solid:bars");

const message = ref("");

const accounts = ref<Account[]>([]);

interface Account {
  id: string;
  username: string;
  avatar: string;
}

const success = (successMessage : string, id : string) => {
  message.value = successMessage;
  const elem = document.getElementById(id);
  if (!elem) return;
  elem.classList.remove('error');
  elem.classList.remove('loading');
  elem.classList.add('success');
  setTimeout(() => {
    message.value = "";
    elem.classList.remove('success');
  }, 3000);
}

const error = (errorMessage : string, id : string) => {
  message.value = errorMessage;
  const elem = document.getElementById(id);
  if (!elem) return;
  elem.classList.remove('success');
  elem.classList.remove('loading');
  elem.classList.add('error');
  setTimeout(() => {
    message.value = "";
    elem.classList.remove('error');
  }, 3000);
}

const loading = (loadingMessage : string, id : string) => {
  message.value = loadingMessage;
  const elem = document.getElementById(id);
  if (!elem) return;
  elem.classList.remove('success');
  elem.classList.remove('error');
  elem.classList.add('loading');
}

const resetDatabase = async () => {
  loading("Resetting database...", "database_status");
  const response = await $fetch('/api/admin/database/reset', {
    method: 'DELETE',
  });

  if (response.success) {
    success("Database reset successfully", "database_status");
  } else {
    error("Database is empty", "database_status");
  }
}

const changeTab = (tab: string) => {
  selectedTab.value = tab;
}

const toggleSpan = () => {
  const spans = document.querySelectorAll('.menu span');
  spans.forEach(span => {
    span.classList.toggle('active');
  })
}

const addAccount = async () => {
  const res = await $fetch('/api/admin/oauth/github/link', {
    method: 'GET',
  });

  if (res.success) {
    window.open(res.url, 'Gitfolio oauth', 'width=600,height=600');
  }
}

const getAccounts = async () => {
  const res = await $fetch('/api/github/accounts', {
    method: 'GET',
  });

  if (res.success) {
    accounts.value = res.accounts;
  }
}

</script>

<style scoped lang="scss">

.page__admin {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  font-family: 'Poppins', ui-monospace;
  .menu {
    .menu__bar {
      display: none;
    }
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
    width: 20%;
    max-width: 200px;
    font-size: 1.5rem;
    span {
      padding: 10px;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
      border: 1px solid black;
    }
  }
  .page {
    width: 100%;
    .status {
      width: 100%;
      height: 2rem;
      text-align: center;
      font-size: 1.5rem;
      &.success {
        display: block;
        background-color: green;
        color: white;
      }
      &.error {
        display: block;
        background-color: red;
        color: white;
      }
      &.loading {
        display: block;
        background-color: yellow;
        color: black;
      }
    }
    .toolbar {
      width: 100%;
      background-color: #ccc;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      button {
        padding: 0.5rem;
        margin: 0.5rem;
        border: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          background-color: #ccc;
        }
      }
    }

    .content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .title {
        width: 100%;
        font-size: 2rem;
        font-weight: bold;
        padding: 0.5rem;
        border-bottom: 2px solid black;
        text-align: center;
      }
      .account {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        font-size: 1.5rem;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
      }
    }
  }

}

@media screen and (max-width: 900px) {
  .page__admin {
    flex-direction: column;


    .menu {
      width: 100%;
      max-width: 100%;
      .menu__bar {
        display: block;
        right: 0;
        padding: 0.5rem;
        top: 0;
        color: black;
        align-self: end;
      }
      span {
        &.active {
          display: block;
        }

        display: none;
        width: 100%;
        text-align: center;
      }
    }
    .page {
      width: 100%;
      height: 100%;
    }
  }
}

</style>