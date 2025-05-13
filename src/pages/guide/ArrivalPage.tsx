import React from 'react';

export default function ArrivalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">Прилет в Израиль</h2>

      <p className="text-lg text-gray-700 mb-6">
        Добро пожаловать в Израиль! 🎉
        Вы только что сделали важный шаг — начали новую главу своей жизни на исторической родине.
        Мы поможем вам пройти все основные этапы интеграции — шаг за шагом, спокойно и уверенно.
      </p>

      <p className="text-gray-700 leading-relaxed">
        В аэропорту Бен-Гурион вас встретят представители Министерства алии и интеграции.
        На месте вы получите:
      </p>

      <ul className="list-disc list-inside text-gray-700 mt-4 space-y-1">
        <li>📘 Временный Теудат Зеут (удостоверение личности)</li>
        <li>📄 Теудат Оле (удостоверение репатрианта)</li>
        <li>🏦 Справку для открытия банковского счёта</li>
        <li>🏥 Направление на регистрацию в больничной кассе</li>
        <li>💰 Первую выплату из корзины абсорбции (Саль Клита)</li>
      </ul>

      <p className="text-gray-700 mt-6">
        После этого вы можете отправляться в новое жильё и начать оформление следующих шагов.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">Полезные ссылки</h3>
      <ul className="list-disc list-inside text-blue-600 space-y-1">
        <li>
          <a
            href="https://www.gov.il/ru/pages/receiving_immigrants_at_the_airport"
            target="_blank"
            rel="noreferrer"
          >
            Прием репатриантов в аэропорту — Министерство алии и интеграции
          </a>
        </li>
      </ul>
    </div>
  );
}
