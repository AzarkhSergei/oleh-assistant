import React from 'react';
import { Contact } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-primary">
        <Contact size={28} />
        Контакты
      </h2>
      <p className="text-gray-700 leading-relaxed">
        Здесь будут важные адреса и контактные данные.
      </p>
    </div>
  );
}
