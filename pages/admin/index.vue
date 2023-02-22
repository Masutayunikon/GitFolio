<template>
  <div class="page__admin">
    <div class="menu">
      <Icon class="menu__bar" @click="toggleSpan" :name="icon" />
      <span @click="changeTab('Github')" :style="{backgroundColor: selectedTab === 'Github' ? '#ccc' : ''}">Github</span>
      <span @click="changeTab('Configuration')" :style="{backgroundColor: selectedTab === 'Configuration' ? '#ccc' : ''}">Configuration</span>
      <span @click="changeTab('Database')" :style="{backgroundColor: selectedTab === 'Database' ? '#ccc' : ''}">Database</span>
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
          <button @click="removeAccount(account.id)" style="background-color: red;"><Icon name="fa6-solid:trash" /></button>
        </div>
      </div>
    </div>
    <div class="page" v-if="selectedTab === 'Configuration'">
      <div class="toolbar">
        <button style="background-color: dodgerblue; font-weight: bold;" @click="getRepositories">Refresh repositories</button>
      </div>
      <div id="configuration_status" class="status">{{message}}</div>
      <div class="content">
        <h2 class="title">Repositories</h2>
        <div class="repository" v-for="repository in repositories" :key="repository.id">
          <label>{{repository.value.repository.name}}</label>
          <input type="checkbox" :checked="repository.value.display" @change="toggleRepository($event, repository.value.repository.id)">
        </div>
      </div>
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

type AnyObj = {
  [key: string]: any;
}

const selectedTab = ref('github');

const icon = ref("fa6-solid:bars");

const message = ref("");

const accounts = ref<Account[]>([]);

const repositories = ref<AnyObj[]|undefined>([]);

interface Account {
  id: string;
  username: string;
  avatar: string;
}

const toggleRepository = async (event : Event , id: string) => {
  const target : HTMLInputElement = event.target as HTMLInputElement;
  console.log(id, target.value, target.checked);

  const res = await $fetch('/api/admin/github/repository/display', {
    method: 'PUT',
    body: JSON.stringify({
      id,
      display: target.checked
    })
  });

  if (res.success) {
    success("Repository updated successfully", "configuration_status");
  } else {
    error("Repository update failed", "configuration_status");
  }

};

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

  if (tab === 'Github') {
    getAccounts();
  }

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
    const win = window.open(res.url, 'Gitfolio oauth', 'width=600,height=600');

    const timer = setInterval(() => {
      if (win?.closed) {
        clearInterval(timer);
        getAccounts();
      }
    }, 1000);
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

const getRepositories = async () => {
  const res = await $fetch('/api/github/repositories', {
    method: 'GET',
  });

  if (res.success) {
    repositories.value = res.repositories;
  }
}

const removeAccount = async (id: string) => {
  const res = await $fetch(`/api/admin/github/account/delete`, {
    method: 'DELETE',
    body: JSON.stringify({
      id: id,
    }),
  });

  if (res.success) {
    await getAccounts();
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
      display: none;
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
      .repository {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        border: 1px solid black;
        font-size: 1.8rem;
        justify-content: space-between;
        label {
          margin-left: 0.5rem;
        }
        input {
          margin-right: 0.5rem;
        }
      }
      .account {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        font-size: 1.5rem;
        justify-content: space-between;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        button {
          margin: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ccc;
          cursor: pointer;
          &:hover {
            background-color: #ccc;
          }
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
      .content {
        .account {
          justify-content: center;
        }
      }
    }
  }
}

</style>