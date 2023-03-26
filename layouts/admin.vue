<template>
  <main class="admin_layout">
    <NavBar class="admin_navbar" :menu="menu"></NavBar>
    <slot />
  </main>
</template>

<script lang="ts" setup>

const menu = ref([
  {
    name: 'Accounts',
    link: '/admin/accounts',
  },
  {
    name: 'Repositories',
    link: '/admin/repositories',
  },
  {
    name: 'Skills',
    link: '/admin/skills',
  },
  {
    name: 'Contacts',
    link: '/admin/contacts',
  },
  {
    name: 'CMS',
    link: '/admin/cms',
  }
])

</script>

<style scoped lang="scss">

.admin_layout {
  width: 100vw;
  height: 100vh;
  background-color: #1e1e1e;
  font-family: 'Poppins',ui-monospace;
  font-size: 1.2rem;
  font-weight: bold;
  .admin_navbar {
    border-bottom: 1px solid white;
    background-color: #1e1e1e;
  }
}

</style>