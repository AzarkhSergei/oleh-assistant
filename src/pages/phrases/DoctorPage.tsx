import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: У врача 🩺</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Фразы для общения с врачом, объяснения симптомов, вопросов по лекарствам.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>У меня болит...</strong><br />כואב לי... <em>(Коэв ли...)</em></li>
        <li><strong>Я аллергик на...</strong><br />אני אלרגי ל... <em>(Ани алерги ле...)</em></li>
        <li><strong>Мне нужна справка</strong><br />אני צריך/ה אישור <em>(Ани царих/цариха ишур)</em></li>
        <li><strong>Как принимать лекарство?</strong><br />איך לקחת את התרופה? <em>(Эйх лакахат эт а-труфа?)</em></li>
        <li><strong>Где аптека?</strong><br />איפה בית המרקחת? <em>(Эйфо бейт а-меркахат?)</em></li>
        <li><strong>У меня температура</strong><br />יש לי חום <em>(Йеш ли хом)</em></li>
        <li><strong>Я плохо себя чувствую</strong><br />אני מרגיש/ה לא טוב <em>(Ани маргиш/маргиша ло тов)</em></li>
        <li><strong>Мне нужен переводчик</strong><br />אני צריך/ה מתורגמן <em>(Ани царих/цариха метургеман)</em></li>
        <li><strong>Можно записаться на прием?</strong><br />אפשר לקבוע תור? <em>(Эфшар ликбоа тор?)</em></li>
      </ul>
    </div>
  );
}
