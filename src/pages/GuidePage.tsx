import React from 'react';
import { Link } from 'react-router-dom';
import {
  PlaneLanding,
  Banknote,
  IdCard,
  Hospital,
  ShieldCheck,
  Car,
} from 'lucide-react';

const guideSteps = [
  {
    id: 'arrival',
    title: 'Прилет в Израиль',
    description: 'Что нужно сделать в аэропорту, получение Теудат Оле.',
    icon: <PlaneLanding size={24} className="text-primary" />,
  },
  {
    id: 'bank-account',
    title: 'Открытие банковского счёта',
    description: 'Список необходимых документов и рекомендации по банкам.',
    icon: <Banknote size={24} className="text-primary" />,
  },
  {
    id: 'teudat-zeut',
    title: 'Получение Теудат Зеут',
    description: 'Как записаться в МВД и какие документы подготовить.',
    icon: <IdCard size={24} className="text-primary" />,
  },
  {
    id: 'kupat-holim',
    title: 'Выбор и регистрация в больничной кассе',
    description: 'Обзор доступных купот холим и как туда записаться.',
    icon: <Hospital size={24} className="text-primary" />,
  },
  {
    id: 'bituach-leumi',
    title: 'Регистрация в Битуах Леуми',
    description: 'Как зарегистрироваться и зачем это нужно.',
    icon: <ShieldCheck size={24} className="text-primary" />,
  },
  {
    id: 'driver-license',
    title: 'Замена водительских прав',
    description: 'Процедура замены иностранных прав на израильские.',
    icon: <Car size={24} className="text-primary" />,
  },
];

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Гид по репатриации</h1>
      <p className="mb-6 text-gray-700">
        Этот гид поможет вам пройти ключевые этапы адаптации в Израиле. Все шаги дополняются понятными инструкциями и полезными советами.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guideSteps.map((step) => (
          <Link
            to={`/guide/${step.id}`}
            key={step.id}
            className="flex items-start gap-3 p-4 border rounded hover:shadow transition bg-white"
          >
            {step.icon}
            <div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
