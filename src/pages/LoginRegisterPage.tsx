import React, { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginRegisterPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const navigate = useNavigate();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const isLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const validatePassword = (password: string) => isLength && hasUpper && hasDigit;

  const allowedDomains = [
    'gmail.com', 'icloud.com', 'outlook.com', 'hotmail.com', 'yahoo.com',
    'mail.ru', 'inbox.ru', 'list.ru', 'bk.ru', 'yandex.ru', 'proton.me',
  ];

  const validateEmailLive = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    const gmailPattern = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === '') {
      setEmailError('Введите email.');
    } else if (!/^[\x00-\x7F]+$/.test(email)) {
      setEmailError('Email не должен содержать русские буквы или эмодзи.');
    } else if (!gmailPattern.test(email)) {
      setEmailError('Недопустимый email формат.');
    } else if (domain && !allowedDomains.includes(domain)) {
      setEmailError('Email-домен не поддерживается.');
    } else {
      setEmailError('');
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const verifyCaptchaOnServer = async (captchaToken: string) => {
    const res = await fetch('https://ajxymcztnprndgiupimi.supabase.co/functions/v1/validate-captcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: captchaToken }),
    });
    const data = await res.json();
    return data.success;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Введите email и пароль.');
      return;
    }

    if (emailError) {
      setMessage('Email некорректен.');
      return;
    }

    if (!captchaToken) {
      setMessage('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    const isHuman = await verifyCaptchaOnServer(captchaToken);
    if (!isHuman) {
      setMessage('Проверка reCAPTCHA не пройдена.');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      return;
    }

    if (!isLogin) {
      if (!validatePassword(password)) {
        setMessage('Пароль должен быть не менее 8 символов, содержать заглавную букву и цифру.');
        return;
      }

      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? error.message : 'Регистрация успешна! Проверьте почту.');
    } else {
      try {
        // 1. Проверка лимита (до входа)
        const preRes = await fetch('https://ajxymcztnprndgiupimi.functions.supabase.co/rate-limit-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email, successful: false }),
        });

        const preResult = await preRes.json();
        if (!preRes.ok && preRes.status === 429) {
          setMessage(preResult.error || 'Слишком много попыток. Попробуйте позже.');
          return;
        }

        // 2. Попытка входа
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        // 3. Фиксация результата
        await fetch('https://ajxymcztnprndgiupimi.functions.supabase.co/rate-limit-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email, successful: !error }),
        });

        if (error) {
          setMessage('Неверный логин или пароль.');
        } else {
          setMessage('Вы успешно вошли!');
          setTimeout(() => navigate('/'), 1000);
        }
      } catch (err) {
        console.error('Ошибка при логине:', err);
        setMessage('Ошибка сервера. Попробуйте позже.');
      }
    }

    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const val = e.target.value;
            setEmail(val);
            validateEmailLive(val);
          }}
          required
          autoComplete="off"
          className="w-full border px-3 py-2 rounded"
        />
        {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="w-full border px-3 py-2 rounded"
        />

        {!isLogin && (
          <ul className="text-sm list-disc list-inside">
            <li className={isLength ? 'text-green-600' : 'text-red-600'}>Минимум 8 символов</li>
            <li className={hasUpper ? 'text-green-600' : 'text-red-600'}>Хотя бы одна заглавная буква</li>
            <li className={hasDigit ? 'text-green-600' : 'text-red-600'}>Хотя бы одна цифра</li>
          </ul>
        )}

        <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={handleCaptchaChange} />

        <button type="submit" className="w-full bg-primary text-white py-2 rounded disabled:opacity-50" disabled={!!emailError}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
            setPassword('');
            setCaptchaToken(null);
            recaptchaRef.current?.reset();
            validateEmailLive(email);
          }}
          className="text-primary underline"
        >
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>

      {message && (
        <p className={`mt-4 text-center text-sm ${message.includes('успеш') || message.includes('вошли') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
