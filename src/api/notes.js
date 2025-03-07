import { supabase } from "../supabaseClient";

// Function to fetch all notes
export async function fetchNotes() {
  let { data, error } = await supabase.from("notes").select("*");

  if (error) {
    console.error("Error fetching notes:", error);
    return [];
  }

  return data;
}
