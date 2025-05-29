import React, { useEffect, useState } from 'react';
import {
  Home,
  ListChecks,
  BookOpen,
  Link as LinkIcon,
  MessageSquareText,
  Contact,
  Plus,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  created_at: string;
}

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, text, rating, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setReviews(data);
    }
  };

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
        <Link to="/guide" className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white">
          <BookOpen size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Гид по репатриации</h3>
            <p className="text-sm text-gray-600">Пошаговые инструкции для каждого этапа.</p>
          </div>
        </Link>

        <Link to="/checklists" className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white">
          <ListChecks size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Чек-листы</h3>
            <p className="text-sm text-gray-600">Отмечайте выполненные шаги и отслеживайте прогресс.</p>
          </div>
        </Link>

        <Link to="/phrases" className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white">
          <MessageSquareText size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Фразы на иврите</h3>
            <p className="text-sm text-gray-600">Выучите базовые фразы для повседневной жизни.</p>
          </div>
        </Link>

        <Link to="/links" className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white">
          <LinkIcon size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Полезные ссылки</h3>
            <p className="text-sm text-gray-600">Сайты госуслуг, больничных касс и важные ресурсы.</p>
          </div>
        </Link>

        <Link to="/contacts" className="flex items-center gap-3 p-4 border rounded hover:shadow transition bg-white md:col-span-2">
          <Contact size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-lg">Контакты</h3>
            <p className="text-sm text-gray-600">Свяжитесь с нами или получите помощь.</p>
          </div>
        </Link>
      </div>

      <div className="mt-10 mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Отзывы пользователей</h2>

        {user ? (
          <Link to="/review" className="flex items-center text-sm text-primary hover:underline">
            <Plus size={18} className="mr-1" />
            Оставить отзыв
          </Link>
        ) : (
          <span
            className="text-gray-400 text-sm cursor-not-allowed relative group flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Оставить отзыв
            <span className="absolute -top-7 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Доступно после входа
            </span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">Отзывов пока нет</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="bg-white p-4 border rounded shadow-sm">
              <p className="text-gray-700 mb-2">🗨️ {r.text}</p>

              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }
                  />
                ))}
              </div>

              <div className="text-sm text-gray-600 font-medium">
                — {r.name}, {new Date(r.created_at).toLocaleString('ru-RU', 
                {day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
