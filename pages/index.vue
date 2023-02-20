<template>
  <nuxt-layout name="portfolio">
    <div class="container">
      <div class="container__profile">
        <div class="wrapper_image">
          <img src="/images/profile.jpg" alt="profile" class="profile__image">
        </div>
        <div class="profile__description">
          <span class="name">Qui suis-je?</span>
          <span class="description">Je suis actuellement en troisième année à Epitech, et mon objectif est de devenir un développeur fullstack. J'ai des compétences en développement web, avec une connaissance des langages de programmation populaires. </span>
        </div>
      </div>
      <div class="container__skills">
        <UnderlineText class="title_skill" text="Compétences" line-color="green" line-height="0.3rem" text-color="white"/>
        <div class="container__icons">
          <TextIcon spacing="1rem" name="logos:nuxt-icon" text="NuxtJS" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-js-official" text="Javascript" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-vue" text="VueJS" :after="true"/>
          <TextIcon spacing="1rem" name="logos:nodejs" text="NodeJS" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-php2" text="PHP" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-html" text="HTML5" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-css" text="CSS3" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-scss2" text="SCSS" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-c" text="C" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-cpp3" text="C++" :after="true"/>
          <TextIcon style="fill: white" spacing="1rem" name="logos:github-octocat" text="Github" :after="true"/>
          <TextIcon spacing="1rem" name="logos:gitlab" text="Gitlab" :after="true"/>
        </div>
        <UnderlineText class="title_skill"  line-height="0.3rem" line-color="blue" text="En cours d'apprentissage" text-color="white" />
        <div class="container__icons">
          <TextIcon spacing="1rem" name="logos:blender" text="Blender" :after="true"/>
          <TextIcon spacing="1rem" name="vscode-icons:file-type-typescript-official" text="Typescript" :after="true"/>
          <TextIcon style="fill: white" spacing="1rem" name="logos:threejs" text="ThreeJS" :after="true"/>
        </div>
        <UnderlineText class="title_skill" line-height="0.3rem" line-color="orange" text="Projects" text-color="white" />
        <div  class="container__icons container__projects">
          <GithubProject class="project" v-for="project in repositories" :name="project.name" :description="project.description" :language="project.language" :updated_at="project.updated_at" :html_url="project.html_url"/>
        </div>
        <UnderlineText line-height="0.3rem" line-color="red" text="Contacts" text-color="white" />
        <div class="container__icons">
          <TextIcon name="skill-icons:discord" text="Discord" spacing="1rem" :after="true" :is-link="true" link="https://discordapp.com/users/1074095235803656302"/>
          <TextIcon style="fill: white" name="icon-park:github" text="Github" spacing="1rem" :after="true" :is-link="true" link="https://github.com/Masutayunikon"/>
          <TextIcon name="logos:google-gmail" text="Gmail" link="quentinmail974@gmail.com" spacing="1rem" :after="true" :is-link="true" :is-mail="true" />
          <TextIcon name="vscode-icons:file-type-outlook" text="Outlook" link="quentin.robert@epitech.eu" spacing="1rem" :after="true" :is-link="true" :is-mail="true" />
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">

import {definePageMeta} from "#imports";

useHead({
  title: 'Quentin Robert - Portfolio - Home',
  htmlAttrs: {
    lang: 'fr'
  },
  meta: [
    {
      name: 'description',
      content: 'Portfolio de Quentin Robert'
    },
    {
      name: 'keywords',
      content: 'portfolio, quentin, robert, masutayunikon, epitech, epitech la réunion, développeur, web, fullstack, front, back, front-end, back-end, javascript, vuejs, nuxtjs, nodejs, php, html, css, scss, c, c++, blender, threejs, github, gitlab, discord, gmail, outlook'
    }
  ],
})

const repositories = await fetch('https://api.github.com/users/Masutayunikon/repos', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  }
}).then(res => res.json()).then(data => {

  type GitHubObject = {
    [key: string]: any; // allow any additional properties with any value type
    updated_at: string;
    name: string;
  };

  return data.sort((a : GitHubObject, b : GitHubObject) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB.getTime() - dateA.getTime();
  }).filter((obj : GitHubObject) => obj.name !== "Masutayunikon");
});

</script>

<style scoped lang="scss">

.container {
  .container__icons {
    width: 60%;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem 0;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .container__projects {
    width: 100%;
  }

  font-family: 'Poppins',ui-monospace;
  color: white;
  .container__skills {
    width: 60%;
    min-height: 50vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1rem 1rem 5rem 1rem;
    box-sizing: border-box;
    margin-bottom: 20vh;
    .title_skill {
      font-size: 2rem;
      font-weight: 600;
      color: white;
      padding: 0.5rem;
    }
  }
  .container__profile {
    margin-top: 25vh;
    width: 60%;
    min-height: 50vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    .wrapper_image {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .profile__image {
        width: 50%;
        max-width: 400px;
        border-radius: 50%;
      }
    }
    .profile__description {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 4em;
      align-items: center;
      font-size: 1rem;
      text-align: center;
      .name {
        font-size: 2rem;
        font-weight: 600;
        color: white;
        padding: 0.5rem;
      }
      .description {
        font-size: 1.5rem;
        color: white;
      }
    }
  }

  @media screen and (max-width: 900px) {
      .container__profile {
        width: auto;
        flex-direction: column;
        padding: 1em;
        .wrapper_image {
          .profile__image {
            padding: 1em;
            width: 30%;
          }
        }
      }

    .container__skills {
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 1em;
      .title_skill {
        text-align: center;
      }
      .container__icons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }

  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



</style>

