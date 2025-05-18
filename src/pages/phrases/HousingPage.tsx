import React from 'react';
import { Link } from 'react-router-dom';

export default function HousingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: Жильё 🏠</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Общение с арендодателем, вопросы оплаты, поиск жилья.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>Сколько стоит аренда?</strong><br />כמה שכר הדירה? <em>(Кама схар а-дира?)</em></li>
        <li><strong>Коммунальные включены?</strong><br />זה כולל חשבונות? <em>(Зэ колель хешбонёт?)</em></li>
        <li><strong>Когда нужно платить?</strong><br />מתי צריך לשלם? <em>(Матай царих лешалем?)</em></li>
        <li><strong>Можно посмотреть квартиру?</strong><br />אפשר לראות את הדירה? <em>(Эфшар лиръот эт а-дира?)</em></li>
        <li><strong>Я хочу снять квартиру</strong><br />אני רוצה לשכור דירה <em>(Ани роце/роца лискор дира)</em></li>
        <li><strong>Есть ли мебель в квартире?</strong><br />יש רהיטים בדירה? <em>(Йеш рахитим ба-дира?)</em></li>
        <li><strong>Где находится квартира?</strong><br />איפה הדירה נמצאת? <em>(Эйфо а-дира нимцет?)</em></li>
        <li><strong>Можно с животными?</strong><br />אפשר עם חיות מחמד? <em>(Эфшар им хаёт махмад?)</em></li>
      </ul>
    </div>
  );
}
