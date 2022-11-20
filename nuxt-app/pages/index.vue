<template>
  <div>
    <button @click="test">test</button>
  </div>
</template>

<script setup lang="ts">

import querystring from 'querystring';

const test = () => {
  // open popup
  const data = $fetch("/api/github/url").then((res) => {
    const url = res.data.url;
    window.open(url, "popup", "width=600,height=600");
  });
}

</script>
<style scoped>

</style>