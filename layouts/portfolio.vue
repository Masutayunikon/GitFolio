<template>
  <main>
    <NavBar></NavBar>
    <slot />
  </main>
</template>

<script setup>

</script>

<style lang="scss">

main {
  width: 100vw;
  height: 100vh;
  background-image: url("../images/background.webp");
  background-size: cover;
  overflow-y: scroll;
  overflow-x: hidden;
}

</style>