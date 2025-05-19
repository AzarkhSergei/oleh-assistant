import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

serve(async (req) => {
  const { token } = await req.json()

  if (!token) {
    return new Response(JSON.stringify({ success: false, error: 'No token provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const secret = Deno.env.get('RECAPTCHA_SECRET_KEY')!
  const formData = new URLSearchParams()
  formData.append('secret', secret)
  formData.append('response', token)

  const googleRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: formData,
  })

  const result = await googleRes.json()

  if (!result.success) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid captcha' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})