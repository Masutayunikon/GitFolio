<template>
  <div>
    <button @click="github_oauth_popup">test</button>
  </div>
</template>

<script setup lang="ts">

const github_oauth_popup = () => {
  // open popup
  const data = $fetch("/api/github/url").then((res) => {
    console.log(res);
    window.open(res.data.url, "Github", "width=600,height=600");
  });
}

</script>
<style scoped>

</style>