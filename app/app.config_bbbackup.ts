export default defineAppConfig({
  appName: 'Daniel de León',
  appDescription: 'Mi nombre es Daniel de León y comparto con ustedes este medio para que puedan observar todos y más recientes trabajos, espero pueda ser de su agrado',
  profilePicture: '/assets/danielyo.png',
  footerName: 'DanielDL',
  email: 'daniel@tukanstudios.com.gt',
  twitterUsername: '@HugoRCD__',
  phone: '+502 40709593',
  openGraphImage: 'https://canvas.hrcd.fr/social-preview.jpg',
  socials: {
    github: 'https://github.com/danielceo22',
    twitter: 'https:/twitter.com/photoDan99',
    linkedin: 'https://www.linkedin.com/in/daniel-de-le%C3%B3n-0b142325a/',
    instagram: 'https://www.instagram.com/danieldeleon.gt/',
  },
  ui: {
    primary: 'emerald',
    gray: 'zinc',
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    input: {
      variant: {
        none: 'bg-gray-100 dark:bg-gray-900/40 border-1 border-gray-700 hover:border-gray-400 focus:border-gray-400 transition-colors duration-300 ease-in-out',
      },
    },
    textarea: {
      variant: {
        none: 'bg-gray-100 dark:bg-gray-900/40 border-1 border-gray-700 hover:border-gray-400 focus:border-gray-400 transition-colors duration-300 ease-in-out',
      },
    },
  },
})
