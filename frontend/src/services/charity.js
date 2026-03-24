import { supabase } from "./supabase";

export async function getCharities() {
  return await supabase.from("charities").select("*");
}

export async function selectCharity(user_id, charity_id) {
  return await supabase
    .from("user_charity")
    .upsert([{ user_id, charity_id, percentage: 10 }]);
}