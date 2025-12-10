import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create client only if env vars are provided
export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export default supabase;

// Helper: upsert a basic profile record in 'profiles' table
export async function upsertProfile(user) {
  if (!supabase || !user) return null;
  try {
    const profile = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.email,
    };
    const { data, error } = await supabase.from('profiles').upsert(profile, { returning: 'minimal' });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('upsertProfile error', err.message || err);
    return null;
  }
}

// Helper: save an order to 'orders' table
export async function saveOrderToSupabase(user, order) {
  if (!supabase || !user || !order) return null;
  try {
    const payload = {
      user_id: user.id || user.email,
      items: JSON.stringify(order.items || []),
      total: order.total || 0,
      status: order.currentStatus || 0,
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('orders').insert(payload).select();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('saveOrderToSupabase error', err.message || err);
    return null;
  }
}
