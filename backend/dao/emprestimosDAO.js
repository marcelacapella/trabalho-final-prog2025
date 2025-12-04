import { supabase } from "../config/supabaseClient.js";

export async function criarEmprestimo(livro_id, usuario_id) {
  const { data, error } = await supabase
    .from("emprestimos")
    .insert([{ livro_id, usuario_id, ativo: true }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function finalizarEmprestimo(livro_id) {
  const { error } = await supabase
    .from("emprestimos")
    .update({
      ativo: false,
      data_devolucao: new Date()
    })
    .eq("livro_id", livro_id)
    .eq("ativo", true);

  if (error) throw new Error(error.message);
}