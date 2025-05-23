import React, { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 минут

export default function LoginRegisterPage() {
  const [email, setEmail] = useState('');
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

  const logAuthEvent = async (
    event: 'register_success' | 'login_success' | 'login_fail'
  ) => {
    try {
      await supabase.from('auth_logs').insert([{ email, event_type: event }]);
    } catch (e) {
      console.error('Ошибка логирования:', e);
    }
  };

  const getClientIp = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return "unknown";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Введите email и пароль.');
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
      if (error) {
        setMessage(error.message);
      } else {
        await logAuthEvent('register_success');
        setMessage('Регистрация успешна! Проверьте почту для подтверждения.');
      }
    } else {
      try {
        const clientIp = await getClientIp();

        const res = await fetch('https://ajxymcztnprndgiupimi.supabase.co/functions/v1/rate-limit-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, ip: clientIp }),
        });

        if (res.status === 429) {
          setMessage('Слишком много попыток. Подождите 5 минут.');
          return;
        }
      } catch (error) {
        console.error('Ошибка rate-limit запроса:', error);
        setMessage('Ошибка проверки безопасности. Попробуйте позже.');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        await logAuthEvent('login_fail');
        setMessage('Неверный логин или пароль.');
        return;
      }

      await logAuthEvent('login_success');
      setMessage('Вы успешно вошли!');
      setTimeout(() => navigate('/'), 1000);
    }

    recaptchaRef.current?.reset();
    setCaptchaToken(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {!isLogin && (
          <ul className="text-sm list-disc list-inside">
            <li className={isLength ? "text-green-600" : "text-red-600"}>Минимум 8 символов</li>
            <li className={hasUpper ? "text-green-600" : "text-red-600"}>Хотя бы одна заглавная буква</li>
            <li className={hasDigit ? "text-green-600" : "text-red-600"}>Хотя бы одна цифра</li>
          </ul>
        )}

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleCaptchaChange}
        />

        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
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
