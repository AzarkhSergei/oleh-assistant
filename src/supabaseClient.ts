import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajxymcztnprndgiupimi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqeHltY3p0bnBybmRnaXVwaW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODEwNTksImV4cCI6MjA2MjU1NzA1OX0.slH9XtohJX3O3nJBRioTmQU9Qsb9ZyjWtIS955l-GDs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
