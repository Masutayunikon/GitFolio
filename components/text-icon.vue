<template>
  <div class="container__text-icon">
    <span v-if="!after && !isLink" style="vertical-align: middle; display: inline-block;" :style="{marginRight: spacing}">{{text}}</span>
    <a v-if="isLink && !after" :href="isMail ? 'mailto: ' + link : link" target="_blank" style="vertical-align: middle; display: inline-block" :style="{marginRight: spacing}">{{text}}</a>
    <Icon :name="name" />
    <span v-if="after && !isLink" style="vertical-align: middle; display: inline-block" :style="{marginLeft: spacing}">{{text}}</span>
    <a v-if="isLink && after" :href="isMail ? 'mailto: ' + link : link"  target="_blank" style="vertical-align: middle; display: inline-block" :style="{marginLeft: spacing}">{{text}}</a>
  </div>
</template>

<script setup lang="ts">

interface Props {
  name: string;
  text: string;
  after?: boolean;
  isLink?: boolean;
  link?: string;
  spacing?: string;
  isMail?: boolean;
}

defineProps<Props>();

</script>

<style scoped lang="scss">

.container__text-icon {
  a {
    text-decoration: none;
    color: white;
    &:hover {
      color: #00b4d8;
    }
  }
}


</style>