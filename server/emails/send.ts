import { createError, readBody } from 'h3'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as any
  const { email, subject, message, phone, fullname, captchaToken } = body

  // reCAPTCHA
  const config = useRuntimeConfig()
  const secret = config.recaptchaSecret
  if (!captchaToken) throw createError({ statusCode: 400, message: 'Captcha token missing' })
  if (!secret) throw createError({ statusCode: 500, message: 'reCAPTCHA secret not configured' })

  const params = new URLSearchParams()
  params.append('secret', secret)
  params.append('response', captchaToken)

  const verify = await $fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  }) as any

  if (!verify?.success) throw createError({ statusCode: 400, message: 'Captcha verification failed' })

  // Telegram config
  const botToken = config.telegram?.botToken || process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = config.telegram?.chatId || process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    throw createError({ statusCode: 500, message: 'Telegram bot config missing' })
  }

  const safe = (v: any) => (v ?? '').toString().trim()
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  const telegramMessage = [
    '📬 <b>¡Nuevo mensaje de contacto desde tu Portafolio!</b>',
    '',
    `👤 <b>Nombre:</b> ${escapeHtml(safe(fullname))}`,
    `📧 <b>Correo:</b> ${escapeHtml(safe(email))}`,
    phone ? `📱 <b>Teléfono:</b> ${escapeHtml(safe(phone))}` : null,
    subject ? `📌 <b>Asunto:</b> ${escapeHtml(safe(subject))}` : null,
    '',
    '💬 <b>Mensaje:</b>',
    escapeHtml(safe(message)),
  ].filter(line => line !== null).join('\n')

  // Enviar a Telegram
  const telegramResp = await $fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      chat_id: chatId,
      text: telegramMessage,
      parse_mode: 'HTML',
    },
  })

  // (Opcional) enviar email Resend como respaldo
  let emailResp = null
  if (config.resendApiKey) {
    try {
      const resend = new Resend(config.resendApiKey)
      emailResp = await resend.emails.send({
        from: 'PORTAFOLIO <daniel@lionsoftgt.site>',
        to: ['photodangt@gmail.com'],
        subject: `Nuevo lead (Telegram + Email) - ${safe(subject) || safe(fullname)}`,
        html: `
          <h2>Nuevo lead desde el Portafolio</h2>
          <ul>
            <li><strong>Nombre:</strong> ${escapeHtml(safe(fullname))}</li>
            <li><strong>Email:</strong> ${escapeHtml(safe(email))}</li>
            <li><strong>Teléfono:</strong> ${escapeHtml(safe(phone))}</li>
            <li><strong>Asunto:</strong> ${escapeHtml(safe(subject))}</li>
          </ul>
          <h3>Mensaje:</h3>
          <p>${escapeHtml(safe(message))}</p>
        `,
      })
    } catch (err) {
      console.error('Error enviando correo de respaldo con Resend:', err)
    }
  }

  return {
    ok: true,
    telegram: telegramResp,
    email: emailResp,
  }
})