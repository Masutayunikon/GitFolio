<template>
  <main class="portfolio_layout">
    <NavBar :menu="menu"></NavBar>
    <slot />
  </main>
</template>

<script setup>

const menu = ref([
  {
    name: "Moi",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  }
]);

</script>

<style lang="scss">

.portfolio_layout {
  width: 100vw;
  height: 100vh;
  background-image: url("../images/background.webp");
  background-size: cover;
  overflow-y: scroll;
  overflow-x: hidden;
}

</style>