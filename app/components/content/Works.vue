<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

// 1️⃣ Proyectos normales
const { data: projects } = await useAsyncData('projects', async () => {
  return await queryCollection('projects').all() as Collections['projects'][]
})

// 2️⃣ Proyectos webapps (colección diferente)
const { data: projects_webapps } = await useAsyncData('projects_webapps', () =>
  queryCollection('projects_webapps').all()
)

console.log('🌍 locale:', locale.value)
console.log('📁 projects_webapps:', projects_webapps.value)
</script>

<template>
  <!-- PROYECTOS -->
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot name="title" mdc-unwrap="p" />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot name="subtitle" mdc-unwrap="p" />
    </h2>
    <Divider class="mb-8 mt-2" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </section>

  <!-- WEBAPPS -->
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      WebApps
    </h1>
    <Divider class="mb-8 mt-2" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project_webapp in projects_webapps"
        :key="project_webapp.name"
        :project="project_webapp"
      />
    </div>
  </section>
</template>
