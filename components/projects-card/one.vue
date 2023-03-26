<template>
  <div class="card-one" :style="{backgroundColor: backgroundColor}">
    <span class="title">{{name}}</span>
    <span class="description">{{description}}</span>
    <div class="footer">
      <Icon :name="getIcon(language)" />
      <span class="update">{{dateFormatted(updated_at)}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  backgroundColor: string;
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


.card-one {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eaeaea;
  &:hover {
    .footer {
      svg {
        opacity: 1;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    border-top: 1px solid #eaeaea;
    padding: 0.5rem 1rem;

    .update {
      font-size: 0.8rem;
      color: #666;
    }
    svg {
      width: 1.5rem;
      height: 1.5rem;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
  }
  .title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
  }
  .description {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 2rem 0;
  }
}

</style>