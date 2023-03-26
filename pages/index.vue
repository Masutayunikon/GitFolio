<template>
  <nuxt-layout name="portfolio">
    <div class="container">
      <div class="container__profile"  v-for="account in accounts">
        <div class="wrapper_image">
          <img :src="account.avatar" alt="profile" class="profile__image">
        </div>
        <div class="profile__description">
          <span class="name">Qui suis-je?</span>
          <span class="description">{{account.description}}</span>
        </div>
      </div>
      <div class="container__skills">
        <UnderlineText class="title_skill" text="Compétences" line-color="green" line-height="0.3rem" text-color="white"/>
        <div class="container__icons">
          <TextIcon v-for="skill in skillSet" spacing="1rem" :name="skill.value" :text="skill.id" :after="true"/>
        </div>
        <UnderlineText class="title_skill" line-height="0.3rem" line-color="orange" text="Projects" text-color="white" />
        <div  class="container__icons container__projects">
          <ProjectsCardThree class="project" v-for="project in repositories" :name="project.value.repository.name" :description="project.value.repository.description" :language="project.value.repository.language" :updated_at="project.value.repository.updated_at" :html_url="project.value.repository.html_url"/>
          <ProjectsCardOne class="project" v-for="project in repositories" :name="project.value.repository.name" :description="project.value.repository.description" :language="project.value.repository.language" :updated_at="project.value.repository.updated_at" :html_url="project.value.repository.html_url"/>
          <ProjectsCardTwo class="project" v-for="project in repositories" :name="project.value.repository.name" :description="project.value.repository.description" :language="project.value.repository.language" :updated_at="project.value.repository.updated_at" :html_url="project.value.repository.html_url"/>
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

const config = {
  backgroundColor: 'transparent',
  project : {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '1rem',
    border: true,
  },
  icon: {
    color: 'black',
    icon_position: 'left',
  },
  description: {
    color: 'black',
  },
  profile: {
    backgroundColor: 'white',
    image: {
      borderRadius: '50%',
    },
  },
}

const skillSet : Ref = ref([]);
const repositories : Ref = ref([]);

const getSkillSet = async () => {
  const response = await $fetch('/api/github/skills/all', {
    method: 'GET'
  });

  if (response.success) {
    skillSet.value = response.skills;
  }

  console.log(skillSet.value);
}

const accounts : Ref = ref([]);

const getAccounts = async () => {
  const response = await $fetch('/api/github/accounts', {
    method: 'GET'
  });

  if (response.success) {
    accounts.value = response.accounts;
  }
}

onBeforeMount(() => {
  getSkillSet();
  getRepositories();
  getAccounts();
})

const getRepositories = () => {
  $fetch('/api/github/repositories', {
    method: 'GET'
  }).then((response) => {
    if (response.success) {


      if (response.repositories ) {
        type GitHubObject = {
          id: string;
          value: {
            display: string;
            repository: {
              [key: string]: any; // allow any additional properties with any value type
              updated_at: string;
              name: string;
            };
          }
        };

        let repos : GitHubObject[]  = response.repositories;

        // remove if display is false
        repos = repos.filter((repo: GitHubObject) => {
          return repo.value.display;
        });

        repos.sort((a: GitHubObject, b: GitHubObject) => {
          return new Date(b.value.repository.updated_at).getTime() - new Date(a.value.repository.updated_at).getTime();
        });

        repositories.value = repos;
      }

    }
  })
}

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
    &:first-child {
      margin-top: 25vh;
    }
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

