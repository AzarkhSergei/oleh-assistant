import React from 'react';
import { Link } from 'react-router-dom';

export default function TransportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: Транспорт 🚍</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Фразы для поездок на автобусе, поезде или такси.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>Куда идет этот автобус?</strong><br />לאן האוטובוס הזה נוסע? <em>(Леан а-автобус а-зэ носеа?)</em></li>
        <li><strong>Сколько стоит билет?</strong><br />כמה עולה כרטיס? <em>(Кама оле картис?)</em></li>
        <li><strong>Где ближайшая остановка?</strong><br />איפה התחנה הקרובה? <em>(Эйфо а-тахана а-крова?)</em></li>
        <li><strong>Во сколько следующий поезд?</strong><br />מתי הרכבת הבאה? <em>(Матай а-ракевет а-баа?)</em></li>
        <li><strong>Можно билет туда-обратно?</strong><br />אפשר כרטיס הלוך ושוב? <em>(Эфшар картис алох ве-шув?)</em></li>
        <li><strong>Пожалуйста, остановите здесь</strong><br />בבקשה לעצור כאן <em>(Бевакаша лаацор кан)</em></li>
        <li><strong>Сколько стоит такси до ...?</strong><br />כמה עולה מונית ל...? <em>(Кама оле монит ле...?)</em></li>
        <li><strong>Где пересадка на трамвай?</strong><br />איפה המעבר לרכבת הקלה? <em>(Эйфо а-маавар ле-ракевет а-кала?)</em></li>
      </ul>
    </div>
  );
}
