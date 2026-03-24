import { supabase } from "./supabase";

export async function activateSubscription(user_id, plan) {
  return await supabase
    .from("subscriptions")
    .upsert([
      {
        user_id,
        status: "active",
        plan: plan,
      },
    ]);
}

export async function getSubscription(user_id) {
  return await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user_id)
    .single();
}