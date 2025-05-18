import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: Гос. учреждения 🏢</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Фразы для общения в Битуах Леуми, МВД и других государственных службах.
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>Я хочу записаться на приём</strong><br />אני רוצה לקבוע תור <em>(Ани роце/роца ликбоа тор)</em></li>
        <li><strong>У меня вопрос по документам</strong><br />יש לי שאלה לגבי מסמכים <em>(Йеш ли шеэла легабей мисмахим)</em></li>
        <li><strong>Где ваше отделение?</strong><br />איפה הסניף שלכם? <em>(Эйфо а-сниф шелахем?)</em></li>
        <li><strong>Когда можно получить справку?</strong><br />מתי אפשר לקבל אישור? <em>(Матай эфшар лекабель ишур?)</em></li>
        <li><strong>Какой номер моего дела?</strong><br />מה מספר התיק שלי? <em>(Ма миспар а-тик шели?)</em></li>
        <li><strong>Мне нужен переводчик</strong><br />אני צריך/ה מתורגמן <em>(Ани царих/цариха метургеман)</em></li>
        <li><strong>Я жду уже долго</strong><br />אני מחכה הרבה זמן <em>(Ани мехаке/мехака харбе зман)</em></li>
        <li><strong>Куда мне идти дальше?</strong><br />לאן אני צריך/ה ללכת עכשיו? <em>(Леан ани царих/цариха лалехет ахшав?)</em></li>
      </ul>
    </div>
  );
}
