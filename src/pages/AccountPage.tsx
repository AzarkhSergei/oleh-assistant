import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // Подсказки по требованиям пароля
  const isLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasDigit = /[0-9]/.test(newPassword);
  const notSameAsCurrent = newPassword && newPassword !== currentPassword;
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const validatePassword = (password: string) =>
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const handleChangePassword = async () => {
    setMessage('');

    if (!validatePassword(newPassword)) {
      setMessage('Пароль должен быть не менее 8 символов, содержать заглавную букву и цифру.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Пароли не совпадают.');
      return;
    }

    if (newPassword === currentPassword) {
      setMessage('Новый пароль не должен совпадать с текущим.');
      return;
    }

    // Проверка текущего пароля (Supabase требует аутентификацию)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (loginError) {
      setMessage('Неверный текущий пароль.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setMessage(updateError.message);
    } else {
      setMessage('Пароль успешно обновлён.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Личный кабинет</h2>
      {user && <p className="mb-6 text-gray-700">Вы вошли как: <strong>{user.email}</strong></p>}

      <h3 className="text-lg font-semibold mb-2">Сменить пароль</h3>

      <div className="space-y-3">
        <input
          type="password"
          placeholder="Текущий пароль"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Повторите новый пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <ul className="text-sm list-disc list-inside mb-2">
          <li className={isLength ? "text-green-600" : "text-red-600"}>Минимум 8 символов</li>
          <li className={hasUpper ? "text-green-600" : "text-red-600"}>Хотя бы одна заглавная буква</li>
          <li className={hasDigit ? "text-green-600" : "text-red-600"}>Хотя бы одна цифра</li>
          <li className={notSameAsCurrent ? "text-green-600" : "text-red-600"}>Не совпадает с текущим паролем</li>
          <li className={passwordsMatch ? "text-green-600" : "text-red-600"}>Пароли совпадают</li>
        </ul>

        <button
          onClick={handleChangePassword}
          className="w-full bg-primary text-white py-2 rounded mt-4"
        >
          Сменить пароль
        </button>
        {message && (
          <p
            className={`mt-2 text-center text-sm ${
              message.includes('успешно') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
