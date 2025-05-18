import React from 'react';
import { Link } from 'react-router-dom';

export default function JobPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: Работа 💼</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Фразы для поиска работы, собеседований, общения с коллегами.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>Какие обязанности на этой должности?</strong><br />מהן האחריות בתפקיד הזה? <em>(Махен а-ахраюёт бе-тафкид а-зэ?)</em></li>
        <li><strong>Когда собеседование?</strong><br />מתי הראיון? <em>(Матай а-реайон?)</em></li>
        <li><strong>Можно работать удалённо?</strong><br />אפשר לעבוד מרחוק? <em>(Эфшар лаавод мерехок?)</em></li>
        <li><strong>Где находится офис?</strong><br />איפה המשרד? <em>(Эйфо а-мисрад?)</em></li>
        <li><strong>Сколько зарплата?</strong><br />מה המשכורת? <em>(Ма а-маскорет?)</em></li>
        <li><strong>Какой график работы?</strong><br />מה שעות העבודה? <em>(Ма шаот а-авода?)</em></li>
        <li><strong>Я могу получить отпуск?</strong><br />אפשר לקבל חופשה? <em>(Эфшар лекабель хофша?)</em></li>
        <li><strong>Мне нужна рекомендация</strong><br />אני צריך/ה המלצה <em>(Ани царих/цариха амлаца)</em></li>
      </ul>
    </div>
  );
}
