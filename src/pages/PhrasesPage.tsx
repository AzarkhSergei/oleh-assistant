import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Stethoscope,
  Bus,
  Home,
  Briefcase,
  MessageSquareText,
  Globe,
} from 'lucide-react';

const phraseCategories = [
  {
    id: 'store',
    title: 'В магазине',
    description: 'Фразы, которые пригодятся при покупках в супермаркете и других магазинах.',
    icon: <ShoppingCart size={24} className="text-primary" />,
  },
  {
    id: 'doctor',
    title: 'У врача',
    description: 'Как объяснить врачу, что вас беспокоит, и понять рекомендации.',
    icon: <Stethoscope size={24} className="text-primary" />,
  },
  {
    id: 'transport',
    title: 'Транспорт',
    description: 'Фразы для поездок на автобусе, поезде или такси.',
    icon: <Bus size={24} className="text-primary" />,
  },
  {
    id: 'housing',
    title: 'Жильё',
    description: 'Общение с арендодателями, вопросы оплаты и условий проживания.',
    icon: <Home size={24} className="text-primary" />,
  },
  {
    id: 'job',
    title: 'Работа',
    description: 'Фразы для собеседований, работы и общения с коллегами.',
    icon: <Briefcase size={24} className="text-primary" />,
  },
  {
    id: 'everyday',
    title: 'Повседневное общение',
    description: 'Простые фразы на каждый день: приветствия, благодарности и вежливость.',
    icon: <MessageSquareText size={24} className="text-primary" />,
  },
  {
    id: 'public',
    title: 'Гос. учреждения',
    description: 'Фразы для общения в Битуах Леуми, МВД и других службах.',
    icon: <Globe size={24} className="text-primary" />,
  },
];

export default function PhrasesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Полезные фразы</h1>
      <p className="mb-6 text-gray-700">
        Здесь вы найдёте тематические подборки фраз, которые пригодятся в повседневной жизни репатрианта в Израиле. Все фразы снабжены переводом и транслитерацией.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phraseCategories.map((cat) => (
          <Link
            to={`/phrases/${cat.id}`}
            key={cat.id}
            className="flex items-start gap-3 p-4 border rounded hover:shadow transition bg-white"
          >
            {cat.icon}
            <div>
              <h3 className="font-semibold text-lg">{cat.title}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
