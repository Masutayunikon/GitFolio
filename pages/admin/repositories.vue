<template>
  <nuxt-layout name="admin">
    <div class="admin_repositories_page_container">
      <div class="content">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td v-if="!isMobile">Owner</td>
              <td>Display</td>
            </tr>
          </thead>
          <tr v-for="repository in repositories">
            <td>{{repository.value.repository.name}}</td>
            <td v-if="!isMobile">{{repository.value.repository.owner.login}}</td>
            <td><input type="checkbox" :checked="repository.value.display" @change="changeDisplay($event, repository.id)"/></td>
          </tr>
        </table>
      </div>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>

const repositories : Ref = ref([]);

// isMobile as ref in nuxtjs

const isMobile = ref(false);

const checkIfMobile = () => {
  // check if we are on client side in nuxtjs
    isMobile.value = window.innerWidth <= 768;
}

// on resize
if (process.client) {
  window.addEventListener('resize', () => {
    checkIfMobile();
  })
}


const changeDisplay = async (event : HTMLInputElement, id: string) => {
  const response = await $fetch('/api/admin/github/repository/display', {
    method: 'PUT',
    body: JSON.stringify({
      id,
      display: event.target.checked
    })
  });

  if (response.success) {
    await getRepositories();
  }
}

const getRepositories = async () => {
  const response = await $fetch('/api/github/repositories', {
    method: 'GET'
  });


  if (response.success) {
    repositories.value = response.repositories;
  }
}

onBeforeMount(() => {
  getRepositories();
  checkIfMobile();
})

</script>

<style scoped lang="scss">

.admin_repositories_page_container {
  overflow: auto;
  color: white;
  font-weight: lighter;
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    overflow: hidden;
    margin-top: 5rem;
    border: 1px solid #1e1e1e;

    table {
      width: 100%;
      thead {
        tr {
          td {
            text-align: center;
            font-weight: bold;
            font-size: 1.5rem;
            padding-bottom: 1.5rem;
          }
        }
      }

      tr {
        td {
          text-align: center;
          padding-bottom: 1rem;
        }
      }
    }
  }
}

</style>