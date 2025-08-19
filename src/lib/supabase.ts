import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mvtlxvxywbdjkzcouyrn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8TvEYX7NgqpxXXfhosSceg_qZqStHL9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);