import React from 'react';
import { Link } from 'react-router-dom';

export default function ShoppingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/phrases" className="text-primary hover:underline">
          ← Назад к фразам
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-primary">Фразы: Поход в магазин 🛒</h2>

      <p className="text-gray-700 leading-relaxed mb-6">
        Полезные фразы для супермаркета, магазина или рынка.
      </p>

      <ul className="list-disc list-inside space-y-3 text-gray-800">
        <li><strong>Сколько это стоит?</strong><br />כמה זה עולה? <em>(Кама зе оле?)</em></li>
        <li><strong>Где касса?</strong><br />איפה הקופה? <em>(Эйфо а-купа?)</em></li>
        <li><strong>У вас есть это в другом размере?</strong><br />יש את זה במידה אחרת? <em>(Йеш эт зе бе-мида ахэрет?)</em></li>
        <li><strong>Я ищу...</strong><br />אני מחפש/ת... <em>(Ани мехапес/мехапесет...)</em></li>
        <li><strong>У меня есть клубная карта</strong><br />יש לי כרטיס מועדון <em>(Йеш ли картис моадон)</em></li>
        <li><strong>Можно оплатить картой?</strong><br />אפשר לשלם בכרטיס? <em>(Эфшар лешалем бе-картис?)</em></li>
        <li><strong>Где продукты без глютена/веганские?</strong><br />איפה מוצרים ללא גלוטן/טבעוניים? <em>(Эйфо муцарим ле-ло глютен/тевониим?)</em></li>
        <li><strong>Можно попробовать?</strong><br />אפשר לטעום? <em>(Эфшар литом?)</em></li>
        <li><strong>Можно вернуть товар?</strong><br />אפשר להחזיר את המוצר? <em>(Эфшар леахзир эт а-муцар?)</em></li>
        <li><strong>Спасибо!</strong><br />תודה! <em>(Тода!)</em></li>
      </ul>
    </div>
  );
}
