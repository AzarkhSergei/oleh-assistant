import React from 'react';

export default function BankAccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">Открытие банковского счёта</h2>

      <p className="text-gray-700 mb-4">
        Один из первых шагов после прилёта — открыть банковский счёт в Израиле. Это необходимо для получения выплат от государства, регистрации в других учреждениях и повседневных нужд.
      </p>

      <h3 className="text-lg font-semibold mb-2">Рекомендуемые банки:</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>Bank Hapoalim (בנק הפועלים)</li>
        <li>Bank Leumi (בנק לאומי)</li>
        <li>Discount Bank (בנק דיסקונט)</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">Необходимые документы:</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>Теудат Оле (удостоверение нового репатрианта)</li>
        <li>Временный Теудат Зеут</li>
        <li>Справка, выданная в аэропорту</li>
      </ul>

      <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800">
        ⚠️ При открытии счёта обязательно сообщите, что вы — новый репатриант. Это даст право на особые условия и регистрацию для государственных выплат.
      </div>

      <p className="text-gray-700 mt-6">
        После открытия счёта обязательно сохраните реквизиты (номер счёта, IBAN), чтобы передать их в Битуах Леуми и другие инстанции.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">Полезные ссылки</h3>
      <ul className="list-disc list-inside text-blue-600 space-y-1">
        <li>
          <a href="https://www.bankhapoalim.co.il" target="_blank" rel="noreferrer">
            Bank Hapoalim — официальный сайт
          </a>
        </li>
        <li>
          <a href="https://www.leumi.co.il" target="_blank" rel="noreferrer">
            Bank Leumi — официальный сайт
          </a>
        </li>
        <li>
          <a href="https://www.discountbank.co.il" target="_blank" rel="noreferrer">
            Discount Bank — официальный сайт
          </a>
        </li>
      </ul>
    </div>
  );
}
