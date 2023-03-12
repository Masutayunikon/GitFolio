<template>
  <nuxt-layout name="admin">
    <div class="admin_skills_page_container">
      <div class="content">
        <div class="skill" v-for="skill in skills">
          <span>{{skill.language}}</span>
          <div class="icons_container">
            <Icon class="icon" :class="getIconBySkill(skill.language) === icon ? 'active' : ''" v-for="icon in skill.icons" :name="icon" @click="setSkill($event, icon, skill.language)"></Icon>
          </div>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>

<script lang="ts" setup>

const skills : Ref = ref([]);
const skillSet : Ref = ref([]);

const getSkillSet = async () => {
  const response = await $fetch('/api/github/skills/all', {
    method: 'GET'
  });

  if (response.success) {
    skillSet.value = response.skills;
  }



}

const getIconBySkill = (skill : string) => {
  return skillSet.value.find((s : any) => s.id === skill)?.value;
}

const getSkills = async () => {
  const response = await $fetch('/api/skills', {
    method: 'GET'
  });

  if (response.success) {
    skills.value = response.skills;
  }
}

const setSkill = async (event: PointerEvent, icon : string, language : string) => {
  let target = event.target as HTMLElement;
  while (!target.classList.contains('icons_container')) {
    if (target.parentElement) {
      target = target.parentElement;
    } else {
      return;
    }
  }

  let currentElem = event.target as HTMLElement;

  while (!currentElem.classList.contains('icon')) {
    if (currentElem.parentElement) {
      currentElem = currentElem.parentElement;
    } else {
      return;
    }
  }

  // remove active class from all target children
  for (let i = 0; i < target.children.length; i++) {
    const child = target.children[i] as HTMLElement;
    child.classList.remove('active');
  }

  // add active class to current element
  currentElem.classList.add('active');

  const response = await $fetch('/api/admin/github/skill/set', {
    method: 'POST',
    body: JSON.stringify({
      skill: language,
      icon: icon
    })
  });

}

onBeforeMount(async () => {
  await getSkills();
  await getSkillSet();

  for (let skill of skills.value) {
    const icon = getIconBySkill(skill.language);
    console.log(icon);
  }
})

</script>

<style scoped lang="scss">

.admin_skills_page_container {
  overflow: auto;
  color: white;
  font-weight: lighter;
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    gap: 2rem;
    .skill {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      span {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .icons_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        .icon {
          width: 3rem;
          height: 3rem;
          border: 3px solid rgba(255, 255, 255, 0.5);
          &:hover {
            border: 3px solid greenyellow;
          }
          &.active {
            border: 3px solid greenyellow;
          }
        }
      }
    }
  }
}

</style>