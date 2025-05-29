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
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/', label: 'Главная', icon: <Home size={16} /> },
  { to: '/guide', label: 'Гид', icon: <BookOpen size={16} /> },
  { to: '/checklists', label: 'Чек-листы', icon: <ListChecks size={16} /> },
  { to: '/contacts', label: 'Контакты', icon: <Contact size={16} /> },
  { to: '/phrases', label: 'Фразы', icon: <MessageSquareText size={16} /> },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const handleLogout = async () => {
    const { supabase } = await import('../../supabaseClient');
    await supabase.auth.signOut();
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

          {user && isAdmin && (
            <Link to="/admin/reviews" title="Модерация отзывов">
              <ShieldCheck
                size={20}
                className="text-primary hover:scale-110 transition-transform"
              />
            </Link>
          )}

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
    </header>
  );
}
