import { supabase } from "../config/supabaseClient.js";

export async function listarLivros() {
  const { data, error } = await supabase.from("livros").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function buscarLivro(id) {
  const { data, error } = await supabase
    .from("livros")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function marcarEmprestado(id) {
  const { error } = await supabase
    .from("livros")
    .update({ disponivel: false })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function marcarDisponivel(id) {
  const { error } = await supabase
    .from("livros")
    .update({ disponivel: true })
    .eq("id", id);

  if (error) throw new Error(error.message);
}