import { supabase } from "./supabase";

export async function addScore(user_id, score, date) {
  // Step 1: get existing scores
  const { data: scores, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", user_id)
    .order("date", { ascending: true });

  if (error) return { error };

  // Step 2: if already 5 scores → delete oldest
  if (scores.length >= 5) {
    const oldest = scores[0];

    await supabase
      .from("scores")
      .delete()
      .eq("id", oldest.id);
  }

  // Step 3: insert new score
  const { data, error: insertError } = await supabase
    .from("scores")
    .insert([{ user_id, score, date }]);

  return { data, error: insertError };
}