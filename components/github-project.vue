<template>
  <div class="container__github-project">
    <div class="headers">
      <TextIcon v-if="language" :name="getIcon(language)" :is-link="true" :link="html_url" :text="name" :spacing="'0.5rem'"/>
      <span v-else class="name">{{name}}</span>
    </div>
    <span v-if="description" class="description">{{description}}</span>
    <span v-if="updated_at" class="update">{{dateFormatted(updated_at)}}</span>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  name: string;
  description: string | null;
  language: string;
  updated_at: string;
  html_url: string;
}

defineProps<Props>();

const dateFormatted = (date: string) => {
  let dateObj = new Date(date);
  let month = dateObj.toLocaleString('default', { month: 'long' });
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
}

const getIcon = (language: string) => {

  type IconList = {
    [key: string]: string;
  }

  let iconList : IconList = {
    "Vue": "vscode-icons:file-type-vue",
    "TypeScript": "vscode-icons:file-type-typescript-official",
    "JavaScript": "vscode-icons:file-type-js-official",
    "HTML": "vscode-icons:file-type-html",
    "CSS": "vscode-icons:file-type-css",
    "SCSS": "vscode-icons:file-type-scss",
    "Python": "vscode-icons:file-type-python",
    "C": "vscode-icons:file-type-c",
    "C++": "vscode-icons:file-type-cpp",
    "PHP": "vscode-icons:file-type-php",
    "Java": "vscode-icons:file-type-java",
    "C#": "vscode-icons:file-type-csharp",
  }

  return iconList[language];

}

</script>

<style scoped lang="scss">

.container__github-project {
  max-width: 400px;
  width: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;

  .headers {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .description {
    font-size: 1.5rem;
  }

  .update {
    margin-top: auto;
    padding: 1rem;
    font-size: 0.8rem;
    color: #ccc;
  }

}

</style>