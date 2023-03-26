<template>
  <nuxt-layout name="admin">
    <div class="admin_settings_page_container">
      <div class="settings">

      </div>
      <div class="preview">

      </div>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>

const settings : Ref = ref({
  "custom": [
    {
      name: "description",
      useGithub: true,
      useCustom: false,
      custom: ''
    },
    {
      name: "avatar",
      useGithub: true,
      useCustom: false,
      custom: ''
    },
    {
      name: "name",
      useGithub: true,
      useCustom: false,
      custom: ''
    },
    {
      name: "background",
      useGithub: true,
      useCustom: false,
      custom: ''
    }
  ]
});

</script>

<style scoped lang="scss">

</style>