import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jsmslndnxgtrzsfatexk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbXNsbmRueGd0cnpzZmF0ZXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTI0MDIsImV4cCI6MjA1MzA2ODQwMn0.be_20yMppzdmeXZJQ0L94JovNG6eHoh2Fzq7yMREh4Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);