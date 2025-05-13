import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

export default function LinksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 text-primary">
        <LinkIcon size={28} />
        Полезные ссылки
      </h2>
      <p className="text-gray-700 leading-relaxed">
        Здесь будут ссылки на государственные и важные ресурсы.
      </p>
    </div>
  );
}
