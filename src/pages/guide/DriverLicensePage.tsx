// Страница: Замена водительских прав
import React from 'react';

export default function DriverLicensePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4 text-primary">Замена водительских прав</h2>

      <p className="text-gray-700 mb-4">
        Новые репатрианты могут заменить свои иностранные водительские права на израильские без необходимости проходить полный курс обучения.
      </p>

      <p className="text-gray-700 mb-4">
        Процесс включает медицинскую проверку, заполнение формы в лицензированном центре, оплату пошлин и, в некоторых случаях, прохождение вождения с инструктором.
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>Медицинская справка</li>
        <li>Форма Тофиc 18 (טופס ירוק)</li>
        <li>Заграничные права</li>
        <li>Теудат Оле и Теудат Зеут</li>
        <li>Оплата госпошлины</li>
      </ul>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-primary mb-2">Полезные ссылки</h3>
        <ul className="list-disc list-inside text-blue-600 underline space-y-1">
          <li>
            <a href="https://www.gov.il/he/departments/ministry_of_transport_and_road_safety/govil-landing-page" target="_blank" rel="noopener noreferrer">
              Министерство транспорта Израиля
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
