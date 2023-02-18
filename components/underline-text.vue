<template>
  <div class="container__text">
    <span :style="{display: 'inline', color: textColor, borderBottom: lineHeight, borderBottomStyle: 'solid', borderBottomColor: lineColor }">{{text}}</span>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  text: string;
  lineHeight: string;
  lineColor: string;
  textColor: string;
}

defineProps<Props>();


</script>

<style scoped lang="scss">

.container {
  width: 100%;
}

</style>