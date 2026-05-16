import { createClient } from '@supabase/supabase-js'

const URL = 'https://dwldayixtaugeeombsbd.supabase.co'
const API_KEY = '***REMOVED***'

export const supabase = createClient(URL, API_KEY)
