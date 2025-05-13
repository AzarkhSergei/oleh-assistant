import React from 'react';
import { useParams, Link } from 'react-router-dom';

import ArrivalPage from './guide/ArrivalPage';
import BankAccountPage from './guide/BankAccountPage';
import TeudatZeutPage from './guide/TeudatZeutPage';
import KupatHolimPage from './guide/KupatHolimPage';
import BituachLeumiPage from './guide/BituachLeumiPage';
import DriverLicensePage from './guide/DriverLicensePage';


const pages: Record<string, React.ReactNode> = {
  'arrival': <ArrivalPage />,
  'bank-account': <BankAccountPage />,
  'teudat-zeut': <TeudatZeutPage />,
  'kupat-holim': <KupatHolimPage />,
  'bituach-leumi': <BituachLeumiPage />,
  'driver-license': <DriverLicensePage />,

  // сюда позже добавим остальные шаги
};

export default function GuideStepPage() {
  const { stepId } = useParams<{ stepId: string }>();

  const content = pages[stepId || ''];

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-red-600">Шаг не найден</h2>
        <p className="mt-4 text-gray-700">Проверьте корректность ссылки.</p>
        <Link to="/checklists" className="inline-block mt-6 text-primary hover:underline">
          ← Назад к чек-листу
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <button onClick={() => window.history.back()} className="text-primary hover:underline">
          ← Назад
        </button>
      </div>
      {content}
    </div>
  );
}
