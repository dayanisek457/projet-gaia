import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mvtlxvxywbdjkzcouyrn.supabase.co'
const supabaseAnonKey = 'sb_secret_BnfP85MD-cRkChu0vA3gLQ_Y_nI-Egr'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)