<template>
  <div class="page__admin_oauth_github_callback">
    <span>This page will close in {{count}} seconds. If it does not <a @click="close">close</a> manually</span>
  </div>
</template>

<script setup lang="ts">

const count = ref(5);

const getParams = () => {
  const route = useRoute();
  return route.query;
}

const callback = async () => {

  const params = getParams();

  const response = await $fetch('/api/admin/oauth/github/callback', {
    method: 'POST',
    body: JSON.stringify(params)
  });

  if (response.success) {
    // start countdown to close window
    const interval = setInterval(() => {
      count.value--;
      if (count.value === 0) {
        clearInterval(interval);
        window.close();
      }
    }, 1000);
  }
}

const close = () => {
  window.close();
}

onMounted(async () => {
  await callback();
});

</script>

<style scoped lang="scss">

.page__admin_oauth_github_callback {
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', ui-monospace;
  span {
    text-align: center;
    a {
      color: dodgerblue;
      cursor: pointer;
    }
  }
}

</style>