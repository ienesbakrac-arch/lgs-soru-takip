import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rytmvqrpituyrxgvbaxo.supabase.co'
const supabaseAnonKey = 'sb_publishable_eGJFRNnz_wXJXaePfMzPhQ_Z91sYCzM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)