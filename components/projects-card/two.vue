<template>
  <div class="two">
    <Icon :name="getIcon(language)" />
    <div class="content">
      <span class="title">{{name}}</span>
      <span class="description">{{description}}</span>
      <div class="footer">
        <span class="update">{{dateFormatted(updated_at)}}</span>
      </div>
    </div>
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

.two {
  position: relative;
  max-width: 400px;
  border: 1px solid #000;
  border-radius: 0.5rem;
  svg {
    position: absolute;
    width: 100%;
    max-width: 400px;
    height: 100%;
    max-height: 400px;
    top: 0;
    left: 0;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .content {
    opacity: 0;
    transition: opacity 0.5s ease;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: 1.5rem;
      font-weight: 600;
    }
    .description {
      font-size: 1rem;
      font-weight: 400;
    }
    .footer {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      .update {
        font-size: 0.8rem;
        font-weight: 400;
      }
    }
  }
  &:hover {
    svg {
      opacity: 0;
    }
    .content {
      opacity: 1;
    }
  }
}

</style>