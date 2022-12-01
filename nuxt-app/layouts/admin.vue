<template>
  <div class="container" >
    <div  @click="close_navbar" v-if="navbar_open" class="blur_background"/>
    <div v-if="navbar_open" class="navbar_left">
      <div class="navbar__top">
        <svg @click="close_navbar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
      </div>
      <div class="navbar__item">
        <router-link to="/admin/dashboard">Dashboard</router-link>
        <router-link to="/admin/accounts">Accounts</router-link>
        <router-link to="/admin/repositories">Repositories</router-link>
        <router-link to="/admin/cms">CMS</router-link>
        <router-link to="/admin/settings">Settings</router-link>
      </div>
    </div>
    <div class="navbar_top">
      <svg @click="navbar_open = !navbar_open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">

let navbar_open = ref(false);

const close_navbar = () => {
  if (navbar_open.value) {
    navbar_open.value = false;
  }
}

</script>

<style scoped lang="scss">

.container {
  .blur_background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: opacity(0.8) blur(10px);
    z-index: 1;
  }
  .navbar_left {
    position: fixed;
    top: 0;
    left: 0;
    width: 60%;
    max-width: 400px;
    height: 100vh;
    background-color: rgba(0, 158, 255, 0.85);
    z-index: 1;
    .navbar__top {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      svg {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          fill: #fff;
        }
      }
    }
    .navbar__item {
      margin-top: min(10%, 50px);
      display: flex;
      flex-direction: column;
      align-items: center;
      height: calc(100% - 50px);
      a {
        display: block;
        width: 80%;
        border-radius: 15px;
        padding: 10px 0;
        text-align: center;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 500;
        text-decoration: none;
        &:hover {
          background-color: rgba(255, 165, 0, 0.75);
        }

        &.router-link-exact-active {
          background-color: var(--color-primary);
          color: black;
        }

      }
    }
  }
  width: 100vw;
  height: 100vh;
  .navbar_top {
    position: sticky;
    width: 100%;
    height: 50px;
    background-color: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 30px;
      margin-right: auto;
      margin-left: 10px;
      height: 30px;
      &:hover {
        cursor: pointer;
        fill: #fff;
      }
    }
  }
}

</style>