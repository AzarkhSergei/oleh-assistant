// Страница: Регистрация в Битуах Леуми
import React from 'react';

export default function BituachLeumiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4 text-primary">Регистрация в Битуах Леуми</h2>

      <p className="text-gray-700 mb-4">
        Битуах Леуми — это Национальное страховое ведомство Израиля, которое занимается социальным обеспечением, выплатами по безработице,
        детскими пособиями, инвалидностью и пенсионными программами.
      </p>

      <p className="text-gray-700 mb-4">
        Чтобы получить выплаты и быть зарегистрированным в системе, новый репатриант должен обратиться в ближайшее отделение Битуах Леуми
        или заполнить форму онлайн.
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>Заранее приготовьте Теудат Оле и Теудат Зеут</li>
        <li>Принесите справку из банка с реквизитами счёта</li>
        <li>Подпишите декларацию для новых репатриантов</li>
      </ul>

      <p className="text-gray-700">Для онлайн-регистрации вы можете воспользоваться порталом госуслуг Израиля.</p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-primary mb-2">Полезные ссылки</h3>
        <ul className="list-disc list-inside text-blue-600 underline space-y-1">
          <li>
            <a href="https://www.btl.gov.il" target="_blank" rel="noopener noreferrer">
              Битуах Леуми — официальный сайт
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}