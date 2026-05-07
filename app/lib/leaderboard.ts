import { supabase } from "./supabase";

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function addScore(name: string, score: number) {
  const { error } = await supabase
    .from("leaderboard")
    .insert([{ name, score }]);

  if (error) {
    console.error(error);
  }
}