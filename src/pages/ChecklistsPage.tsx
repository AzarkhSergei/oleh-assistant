import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface ChecklistItem {
  id: string;
  label: string;
  to: string;
}

const checklistItems: ChecklistItem[] = [
  { id: 'arrival', label: 'Прилет в Израиль', to: '/guide/arrival' },
  { id: 'bank-account', label: 'Открытие банковского счёта', to: '/guide/bank-account' },
  { id: 'teudat-zeut', label: 'Получение Теудат Зеут', to: '/guide/teudat-zeut' },
  { id: 'kupat-holim', label: 'Выбор и регистрация в больничной кассе', to: '/guide/kupat-holim' },
  { id: 'bituach-leumi', label: 'Регистрация в Битуах Леуми', to: '/guide/bituach-leumi' },
  { id: 'driver-license', label: 'Замена водительских прав', to: '/guide/driver-license' },
];

export default function ChecklistsPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('checklist_progress')
        .select('step_id, completed')
        .eq('user_id', user.id);

      if (error) {
        console.error('Ошибка загрузки прогресса:', error.message);
        return;
      }

      const state: Record<string, boolean> = {};
      data?.forEach((row) => {
        state[row.step_id] = row.completed;
      });
      setCompleted(state);
    };

    fetchProgress();
  }, [user]);

  const toggle = async (id: string) => {
    if (!user) return;

    const newValue = !completed[id];
    setCompleted((prev) => ({ ...prev, [id]: newValue }));

    const { error } = await supabase
      .from('checklist_progress')
      .upsert(
        [{ user_id: user.id, step_id: id, completed: newValue }],
        { onConflict: 'user_id,step_id' }
      );

    if (error) {
      console.error('Ошибка при сохранении:', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">Чек-лист репатрианта</h2>
      <ul className="space-y-3">
        {checklistItems.map((item) => {
          const isDone = completed[item.id];
          const isGuest = !user;

          return (
            <li
              key={item.id}
              className={`flex justify-between items-center border p-4 rounded-md transition shadow-sm ${
                isDone ? 'bg-red-50 border-red-300' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <Link
                to={item.to}
                className={`text-lg font-medium hover:underline transition-all duration-200 ${
                  isDone ? 'line-through text-red-500' : 'text-gray-800'
                }`}
              >
                {item.label}
              </Link>

              <div className="relative group">
                <button
                  onClick={() => toggle(item.id)}
                  disabled={isGuest}
                  className={`ml-4 text-primary transition duration-200 ${
                    isGuest ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  {isDone ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                {isGuest && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                    Доступно после входа
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
