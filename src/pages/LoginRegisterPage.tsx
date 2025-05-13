import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LoginRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Вы успешно вошли!');
        setTimeout(() => navigate('/'), 1000); // редирект на главную через 1 сек
      }
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
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>Минимум 8 символов</li>
            <li>Хотя бы одна заглавная буква</li>
            <li>Хотя бы одна цифра</li>
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
          }}
          className="text-primary underline"
        >
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes('успешно') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
