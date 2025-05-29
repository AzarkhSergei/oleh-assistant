import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { checkIfUserIsAdmin } from '../utils/checkAdmin';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);

      if (data.session?.user) {
        const admin = await checkIfUserIsAdmin(data.session.user.id);
        setIsAdmin(admin);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        checkIfUserIsAdmin(session.user.id).then(setIsAdmin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
