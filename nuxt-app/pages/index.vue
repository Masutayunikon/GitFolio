<template>
  <div>
    <button @click="github_oauth_popup">oauth2</button>
    <button @click="test()">test</button>
  </div>
</template>

<script setup lang="ts">

const test = () => {
  $fetch("/api/github/repos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 71890754,
    }),
  }).then((res) => {
    console.log(res);
  });
}

const github_oauth_popup = () => {
  // open popup
  $fetch("/api/github/url").then((res) => {
    const handle : any = window.open(res.data.url, "Github", "width=600,height=600");

    // check if popup is closed
    const timer = setInterval(() => {
      if (handle.closed) {
        clearInterval(timer);
      }
    }, 1000);

  });
}

</script>
<style scoped>

</style>