import React from 'react';
import { Link } from 'react-router-dom';

export default function EverydayPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: Повседневное общение 💬</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Приветствия, благодарности, просьбы, бытовые фразы.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>Здравствуйте!</strong><br />שלום! <em>(Шалом!)</em></li>
        <li><strong>Спасибо!</strong><br />תודה! <em>(Тода!)</em></li>
        <li><strong>Пожалуйста</strong><br />בבקשה <em>(Бевакаша)</em></li>
        <li><strong>До свидания</strong><br />להתראות <em>(Леитраот)</em></li>
        <li><strong>Извините, я не понимаю</strong><br />סליחה, אני לא מבין/ה <em>(Слиха, ани ло мевин/мевина)</em></li>
        <li><strong>Как вас зовут?</strong><br />איך קוראים לך? <em>(Эйх корим леха/лах?)</em></li>
        <li><strong>Меня зовут...</strong><br />קוראים לי... <em>(Корим ли...)</em></li>
        <li><strong>Где туалет?</strong><br />איפה השירותים? <em>(Эйфо а-шерутим?)</em></li>
      </ul>
    </div>
  );
}
