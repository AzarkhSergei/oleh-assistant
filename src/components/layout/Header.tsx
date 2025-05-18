import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Link as LinkIcon,
  ListChecks,
  Contact,
  MessageSquareText,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
} from 'lucide-react';
import { supabase } from '../../supabaseClient';

const navItems = [
  { to: '/', label: 'Главная', icon: <Home size={16} /> },
  { to: '/guide', label: 'Гид', icon: <BookOpen size={16} /> },
  { to: '/links', label: 'Ссылки', icon: <LinkIcon size={16} /> },
  { to: '/checklists', label: 'Чек-листы', icon: <ListChecks size={16} /> },
  { to: '/contacts', label: 'Контакты', icon: <Contact size={16} /> },
  { to: '/phrases', label: 'Фразы', icon: <MessageSquareText size={16} /> },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary rounded transition">
          Oleh Assistant
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4 text-sm items-center">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`inline-flex items-center gap-1 hover:text-primary transition-colors duration-200 ${
                location.pathname === to ? 'text-primary font-medium' : 'text-gray-700'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {!user ? (
            <Link
              to="/auth"
              className="ml-4 border border-primary text-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition flex items-center gap-1"
            >
              <LogIn size={16} />
              Войти
            </Link>
          ) : (
            <>
              <Link
                to="/account"
                className="ml-4 border border-gray-500 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition flex items-center gap-1"
              >
                <User size={16} />
                Кабинет
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition flex items-center gap-1"
              >
                <LogOut size={16} />
                Выйти
              </button>
            </>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 py-2 border-b hover:text-primary transition ${
                location.pathname === to ? 'text-primary font-medium' : 'text-gray-700'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {!user ? (
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex items-center gap-2 border border-primary px-3 py-2 text-primary rounded hover:bg-primary hover:text-white transition w-full justify-center"
            >
              <LogIn size={16} />
              Войти
            </Link>
          ) : (
            <div className="space-y-2 mt-4">
              <Link
                to="/account"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 border border-gray-500 px-3 py-2 text-gray-800 rounded hover:bg-gray-100 transition w-full justify-center"
              >
                <User size={16} />
                Кабинет
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-2 border border-red-500 px-3 py-2 text-red-500 rounded hover:bg-red-500 hover:text-white transition w-full justify-center"
              >
                <LogOut size={16} />
                Выйти
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
