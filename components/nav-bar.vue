<template>
  <nav class="navbar">
    <div class="logo"/>
    <div class="nav-links" ref="nav_links">
      <ul>
        <li @click="toggleIfActive"><nuxt-link to="/">Moi</nuxt-link></li>
        <li @click="toggleIfActive"><nuxt-link to="/blog">Blog</nuxt-link></li>
      </ul>
    </div>
    <Icon :name="icon" class="white button__menu" @click="toggleMenu"/>
  </nav>
</template>

<script lang="ts" setup>

import {Ref} from "@vue/reactivity";

const nav_links: Ref = ref(null);

const icon = ref("fa6-solid:bars");

const toggleIfActive = () => {
  if (nav_links.value.classList.contains("active")) {
    toggleMenu();
  }
};

const toggleMenu = () => {

  if (!nav_links.value) return;

  nav_links.value.classList.toggle("active");
  icon.value = icon.value === "fa6-solid:bars" ? "ic:baseline-close" : "fa6-solid:bars";

};

</script>

<style scoped lang="scss">

.white {
  color: white;
}

.button__menu {
  padding: 1em;
  display: none;
  top: 0;
  right: 0;
}

.navbar {
  width: 100%;
  position: absolute;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;

  a {
    color: white;
  }

  .logo {
    font-size: 1.5em;
    font-weight: 600;
  }
  .nav-links {
    ul {
      display: flex;
      li {
        margin: 0 1em;
        &:hover a {
          color: #878787;
          font-weight: 600;
        }
        &:active a {
          color: #4a4a4a;
          font-weight: 600;
        }
      }
    }
  }
}


@media screen and (max-width: 900px) {

  .navbar {
    padding: 0;

    .logo {
      position: absolute;
      top: 0;
      left: 0;
      padding: 1em;
    }

    .nav-links {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(137, 93, 93, 0.31);
      backdrop-filter: blur(10px);
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -100%;
      transition: all 0.5s ease-in-out;
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
          margin: 0.6em 0;
          font-size: 1.6em;
        }
      }
    }


    .active {
      margin-left: 0;
    }

  }
  .button__menu {
    position: absolute;
    font-size: 1.5rem;
    display: block;
  }

}

</style>