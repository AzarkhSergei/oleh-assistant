import React from 'react';

export default function KupatHolimPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4 text-primary">Выбор и регистрация в больничной кассе</h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        После получения временного Теудат Зеута необходимо зарегистрироваться в больничную кассу (קופת חולים).
        Это обязательный шаг для получения базовой медицинской помощи в Израиле.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        В Израиле действуют четыре основные кассы:
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li><strong>Клалит (Clalit)</strong> — крупнейшая касса, охватывающая большинство клиник и больниц</li>
        <li><strong>Макаби (Maccabi)</strong> — делает упор на цифровые сервисы и современные технологии</li>
        <li><strong>Леумит (Leumit)</strong> — меньше по размеру, но с персональным подходом</li>
        <li><strong>Меухедет (Meuhedet)</strong> — популярна среди новых репатриантов</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-4">
        Регистрация возможна в отделении почты, онлайн на сайте выбранной кассы или в одном из офисов.
      </p>

      <p className="text-gray-700 leading-relaxed">
        После регистрации вы получите номер полиса. С ним можно выбрать лечащего врача, записываться на приёмы и пользоваться государственными медицинскими услугами.
      </p>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2 text-primary">Полезные ссылки</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <a
              href="https://www.clalit.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Clalit — официальный сайт
            </a>
          </li>
          <li>
            <a
              href="https://www.macabi.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Maccabi — официальный сайт
            </a>
          </li>
          <li>
            <a
              href="https://www.leumit.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Leumit — официальный сайт
            </a>
          </li>
          <li>
            <a
              href="https://www.meuhedet.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Meuhedet — официальный сайт
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
