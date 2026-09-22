<script setup lang="ts">
const { locale: current, setLocaleCookie, locales } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find(locale => locale.code === current.value)
})

watch(current, (newLocale) => {
  setLocaleCookie(newLocale)
})

const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="z-99 flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-1 backdrop-blur-xl">
    
  </div>
</template>
