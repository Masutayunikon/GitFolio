<template>
  <div class="container">
    <div class="repositories_container">
      <div class="repositories_wrapper">
        <div class="repo_item">
          <div class="name title">
            Repositories name
          </div>
          <div class="name title">
            Author
          </div>
          <div class="checkbox title">
            Display
          </div>
        </div>
        <div v-for="repo in repositories" class="repo_item">
          <div class="name">
            {{ repo.name }}
          </div>
          <div class="name">
            {{ repo.owner.login }}
          </div>
          <div class="checkbox">
            <input type="checkbox" :checked="configRepository[repo.id]" @change="updateRepository($event.target.checked, repo.id)">
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

const repositories: any = ref([])
const configRepository: any = ref({})

onBeforeMount(() => {
  getRepositories()
})

const updateRepository = async (value: any, id: string) => {
  const req = await $fetch('/api/admin/display', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      display: value
    })
  })

  if (req.success) {
    console.log(req);
    configRepository.id = req.data.config.display
  }

}

const getRepositories = async () => {
  const req = await $fetch('/api/github/repositories', {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json'
    }
  })

  if (req.success) {
    repositories.value = req.data.repos
    configRepository.value = req.data.config
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
  .repositories_container {
    min-width: 80%;
    background-color: var(--color-primary);
    border-radius: 30px;
    box-shadow: 12px 12px 2px 1px #535353;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .repositories_wrapper {
      margin: 2rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .repo_item {
        display: grid;
        width: 80%;
        grid-template-columns: 50% 30% 20%;

        .title {
          font-weight: bold;
          font-size: 1.2rem;
          padding: 1rem;
        }

        .name {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid black;
          padding: 0.5rem;
        }

        .checkbox {
          display: flex;
          padding: 0.5rem;
          align-items: center;
          justify-content: center;
          border: 1px solid black;
        }
      }
    }
  }
}
</style>