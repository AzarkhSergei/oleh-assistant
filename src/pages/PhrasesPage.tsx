import React from 'react';
import { MessageSquareText } from 'lucide-react';

export default function PhrasesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-primary">
        <MessageSquareText size={28} />
        Полезные фразы
      </h2>
      <p className="text-gray-700 leading-relaxed">
        Здесь будут типовые фразы и шаблоны заявлений.
      </p>
    </div>
  );
}
