import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 минут

export default function LoginRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const validatePassword = (password: string) => isLength && hasUpper && hasDigit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Введите email и пароль.');
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
        setMessage('Регистрация успешна! Проверьте почту для подтверждения.');
      }
    } else {
      const now = Date.now();
      const savedLock = localStorage.getItem('lockoutTime');
      const savedAttempts = localStorage.getItem('loginAttempts');

      if (savedLock && Number(savedLock) > now) {
        const secondsLeft = Math.ceil((Number(savedLock) - now) / 1000);
        setMessage(`Слишком много попыток. Повторите через ${secondsLeft} сек.`);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const attempts = savedAttempts ? Number(savedAttempts) + 1 : 1;
        localStorage.setItem('loginAttempts', attempts.toString());

        if (attempts >= MAX_ATTEMPTS) {
          const lockUntil = now + LOCKOUT_DURATION_MS;
          localStorage.setItem('lockoutTime', lockUntil.toString());
          setMessage('Слишком много неудачных попыток. Блокировка на 5 минут.');
        } else {
          setMessage(`Неверный логин или пароль. Осталось попыток: ${MAX_ATTEMPTS - attempts}`);
        }
        return;
      }

      // Успешный вход — сброс счётчиков
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutTime');
      setMessage('Вы успешно вошли!');
      setTimeout(() => navigate('/'), 1000);
    }
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
