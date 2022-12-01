<template>
  <div class="container">
    <div class="repositories_container">

    </div>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: "admin",
})

const repositories = ref([])

const getRepositories = async () => {
  const req = await $fetch('/api/repositories', {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json'
    }
  })
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
    min-height: 80vh;
    background-color: var(--color-primary);
    border-radius: 30px;
    box-shadow: 12px 12px 2px 1px #535353;
  }
}
</style>