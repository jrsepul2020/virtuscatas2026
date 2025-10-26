// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Estas variables vendrán de tu archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Creamos una única instancia del cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
