import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return url.length > 0 && anonKey.length > 0;
}

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase não configurado (EXPO_PUBLIC_SUPABASE_URL / ANON_KEY)");
  }
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}
