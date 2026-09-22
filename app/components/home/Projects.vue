<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { data: projects } = await useAsyncData('projects', async () => {
  return await queryCollection('projects').all() as Collections['projects'][]
})

const featuredProjects = computed(() => {
  const list = projects.value ?? []
  const featured = list.filter((work) => work.featured)
  return featured.length > 0 ? featured : list
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <h3 class="font-newsreader italic text-white-shadow text-xl">
      {{ $t("navigation.works") }}
    </h3>
    <div class="flex w-full flex-col gap-4">
      <NuxtLink
        v-for="project in featuredProjects"
        :key="project.name"
        role="link"
        class="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-neutral-900 transition-colors"
        :to="project.release === 'soon' ? '/' : project.link"
        :aria-label="'go to ' + project.name + ' project website'"
        :target="project.release === 'soon' ? '_self' : '_blank'"
      >
        <span class="whitespace-nowrap font-medium">
          {{ project.name }}
        </span>
        <div class="mx-2 h-[0.1px] w-full bg-muted" />
        <span class="whitespace-nowrap text-muted text-sm">
          {{ project.release === "soon" ? $t("global.soon") + "..." : project.release }}
        </span>
      </NuxtLink>
    </div>
    <NuxtLink to="/works">
      <span class="font-newsreader italic text-white-shadow cursor-pointer hover:underline">
        {{ $t("global.see_more") }}
      </span>
    </NuxtLink>
  </div>
</template>
