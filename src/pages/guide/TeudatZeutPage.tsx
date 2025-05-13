import React from 'react';

export default function TeudatZeutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">Получение Теудат Зеут</h2>

      <p className="text-gray-700 mb-4">
        Теудат Зеут — это израильское удостоверение личности, которое необходимо для открытия банковского счёта, обращения в больничные кассы и других государственных процедур.
      </p>

      <h3 className="text-lg font-semibold mb-2">Как получить:</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Подготовьте: Теудат Оле, загранпаспорт, свидетельство о рождении (по возможности).</li>
        <li>Запишитесь на приём в ближайшее отделение МВД (Лишкат ХаПним).</li>
        <li>Придите строго по времени, с оригиналами документов.</li>
        <li>В некоторых случаях фотографируют прямо на месте.</li>
      </ul>

      <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800">
        ⚠️ В некоторых городах время ожидания записи может быть больше месяца. Лучше записаться заранее.
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Полезные ссылки</h3>
      <ul className="list-disc list-inside text-blue-600">
        <li>
          <a
            href="https://govisit.gov.il/ru/home"
            target="_blank"
            rel="noreferrer"
          >
            Онлайн-запись в МВД
          </a>
        </li>
      </ul>
    </div>
  );
}
