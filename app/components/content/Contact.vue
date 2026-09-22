<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { profile } = useAppConfig()
const { t } = useI18n()

const config = useRuntimeConfig()
const isResendEnabled = config.public.resend
const recaptchaSiteKey = config.public.recaptchaSiteKey

// Estado del formulario
const state = ref({
  email: '',
  message: '',
  phone: '',
  fullname: '',
  subject: '',
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message is too short'),
  subject: z.string().min(5, 'Subject is too short'),
  fullname: z.string().min(3, 'Name is too short'),
})
type Schema = z.output<typeof schema>

const loading = ref(false)
const captchaError = ref<string | null>(null)

// Añadimos el script de reCAPTCHA v2 (checkbox)
useHead({
  script: [
    {
      src: 'https://www.google.com/recaptcha/api.js', // SIN render= ni sitekey aquí
      async: true,
      defer: true,
    },
  ],
})

// Verificar que la site key se ha configurado
onMounted(() => {
  if (!recaptchaSiteKey) {
    console.warn('Falta RECAPTCHA_SITE_KEY en runtimeConfig.public.recaptchaSiteKey')
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  captchaError.value = null
  try {
    // Obtener token del widget
    const win = window as any
    if (!win.grecaptcha) {
      captchaError.value = 'Captcha no cargado todavía'
      loading.value = false
      return
    }
    const captchaToken = win.grecaptcha.getResponse()
    if (!captchaToken) {
      captchaError.value = 'Por favor completa el captcha'
      loading.value = false
      return
    }

    // Enviar datos + captchaToken al servidor
    await $fetch('/api/emails/send', {
      method: 'POST',
      body: {
        ...event.data,
        captchaToken,
      },
    })

    // Reset captcha y limpiar formulario
    try {
      win.grecaptcha.reset()
    } catch (_) {}

    state.value = {
      email: '',
      message: '',
      phone: '',
      fullname: '',
      subject: '',
    }
    toast.success(t('contact.success'))
  } catch (err) {
    console.error('submit error', err)
    toast.error(t('contact.error'))
  }
  loading.value = false
}
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot name="title" mdc-unwrap="p" />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot name="subtitle" mdc-unwrap="p" />
    </h2>
    <Divider class="mb-8 mt-2" />

    <div class="flex flex-col sm:items-center sm:justify-between">
      <UForm
        :state="state"
        :schema="schema"
        class="flex w-full max-w-[40rem] flex-col gap-3"
        @submit="onSubmit"
      >
        <UFormField label="Nombre completo" name="fullname" required>
          <UInput
            v-model="state.fullname"
            type="text"
            autocomplete="name"
            class="w-full"
            placeholder="Marcos Antonio"
          />
        </UFormField>

        <UFormField label="Correo" name="email" required>
          <UInput
            v-model="state.email"
            autocomplete="email"
            class="w-full"
            placeholder="john.doe@gmail.com"
          />
        </UFormField>

        <UFormField label="Celular" name="phone">
          <UInput
            v-model="state.phone"
            autocomplete="Cel"
            class="w-full"
            placeholder="123-456-7890"
          />
        </UFormField>

        <UFormField label="De que trata el asunto?" name="subject" required>
          <UInput
            v-model="state.subject"
            class="w-full"
            :placeholder="$t('Asunto del mensaje')"
          />
        </UFormField>

        <UFormField label="Platicame! más 🙏" name="message" required>
          <UTextarea
            v-model="state.message"
            autoresize
            class="w-full"
            :rows="4"
            placeholder="Mensaje!"
          />
        </UFormField>

        <!-- Widget reCAPTCHA v2 visible -->
        <div class="flex justify-center">
          <div
            class="g-recaptcha"
            :data-sitekey="recaptchaSiteKey"
          ></div>
        </div>
        <p
          v-if="captchaError"
          class="text-center text-sm text-red-400"
        >{{ captchaError }}</p>

        <div class="flex justify-center">
          <UTooltip :disabled="isResendEnabled" :text="$t('contact.disabled')">
            <UButton
              :loading="loading"
              :disabled="!isResendEnabled"
              type="submit"
              block
            >
              {{ $t("Enviar") }}
            </UButton>
          </UTooltip>
        </div>
      </UForm>

      <Divider class="my-10" />

      <div class="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex flex-col gap-3">
          <dd class="flex items-center gap-3 text-neutral-400">
            <UIcon name="heroicons-phone" class="size-6" aria-hidden="true" />
            <span>{{ profile.phone }}</span>
          </dd>
          <dd class="flex items-center gap-3 text-neutral-400">
            <UIcon name="heroicons-envelope" class="size-6" aria-hidden="true" />
            <UTooltip :text="$t('global.email')" :shortcuts="['⌘', 'O']">
              <NuxtLink
                :to="`mailto:${profile.email}`"
                class="cursor-pointer transition-colors duration-300"
              >
                {{ profile.email }}
              </NuxtLink>
            </UTooltip>
          </dd>
        </div>
        <div>
          <MeetingButton />
        </div>
      </div>
    </div>
  </section>
</template>