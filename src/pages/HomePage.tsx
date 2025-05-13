import React from 'react';
import {
  Home,
  ListChecks,
  BookOpen,
  Link as LinkIcon,
  MessageSquareText,
  Contact
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-primary">
        <Home size={28} />
        Добро пожаловать в Oleh Assistant
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        <strong>Oleh Assistant</strong> — это ваш цифровой помощник в адаптации после репатриации в Израиль. Здесь вы найдёте пошаговые инструкции, чек-листы, полезные ссылки и базовые фразы на иврите, чтобы упростить каждый этап вашей новой жизни.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/guide"
          className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white"
        >
          <BookOpen size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Гид по репатриации</h3>
            <p className="text-sm text-gray-600">Пошаговые инструкции для каждого этапа.</p>
          </div>
        </Link>

        <Link
          to="/checklists"
          className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white"
        >
          <ListChecks size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Чек-листы</h3>
            <p className="text-sm text-gray-600">Отмечайте выполненные шаги и отслеживайте прогресс.</p>
          </div>
        </Link>

        <Link
          to="/phrases"
          className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white"
        >
          <MessageSquareText size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Фразы на иврите</h3>
            <p className="text-sm text-gray-600">Выучите базовые фразы для повседневной жизни.</p>
          </div>
        </Link>

        <Link
          to="/links"
          className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white"
        >
          <LinkIcon size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Полезные ссылки</h3>
            <p className="text-sm text-gray-600">Сайты госуслуг, больничных касс и важные ресурсы.</p>
          </div>
        </Link>

        <Link
          to="/contacts"
          className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white md:col-span-2"
        >
          <Contact size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Контакты</h3>
            <p className="text-sm text-gray-600">Свяжитесь с нами или получите помощь.</p>
          </div>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Отзывы пользователей</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="text-gray-700 mb-2">
            🗨️ Очень удобный сайт — помог мне не запутаться после репатриации. Особенно понравился чек-лист!
          </p>
          <p className="text-sm text-gray-600 font-medium">— Анна, репатриировалась из Москвы</p>
        </div>
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="text-gray-700 mb-2">
            🗨️ Спасибо за фразы на иврите — сразу стало проще в магазине и аптеке. Отличный инструмент!
          </p>
          <p className="text-sm text-gray-600 font-medium">— Давид, репатриировался из Киева</p>
        </div>
        <div className="bg-white p-4 border rounded shadow-sm">
          <p className="text-gray-700 mb-2">
            🗨️ Всё по полочкам! Очень помог гид по получению Теудат Зеут и открытию счёта в банке.
          </p>
          <p className="text-sm text-gray-600 font-medium">— Мария, репатриировалась из Минска</p>
        </div>
      </div>
    </div>
  );
}
