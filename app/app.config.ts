export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/daniel-de-leon/30min',
    available: true,
  },
  profile: {
    name: 'Daniel de León',
    job: 'Frontend Architect and Designer',
    email: 'photodangt@gmail.com',
    phone: '+502 40709593',
    picture: '/assets/danielyo.png',
  },
  socials: {
    github: 'https://github.com/photodangt-web',
    twitter: 'https:/twitter.com/photoDan99',
    linkedin: 'https://www.linkedin.com/in/daniel-de-le%C3%B3n-0b142325a/',
    instagram: 'https://www.instagram.com/danieldeleon.gt/',
  },
  seo: {
    title: 'Portafolio de trabajo - Daniel de León',
    description: 'Canvas is a simple but beautiful portfolio template for designers and developers built with Nuxt and Tailwind CSS. Made with ❤️ by HugoRCD',
    url: 'https://canvas.hrcd.fr',
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
