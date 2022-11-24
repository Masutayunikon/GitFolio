<template>
  <div class="container">
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const route = useRoute();

const accept = () => {
  console.log(route.query);
  $fetch("/api/github/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route.query),

  }).then((res) => {
    console.log(res);
    window.close();
  });
}

onMounted(() => {
  accept();
})

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  span {
    font-size: 2rem;
  }
}
</style>