import { supabase } from "../config/supabaseClient.js";

export async function criarEmprestimo(livro_id, usuario_id) {
  const { data, error } = await supabase
    .from("emprestimos")
    .insert([
      {
        id_livro: livro_id,     // Nome igual ao banco
        id_usuario: usuario_id, // Nome igual ao banco
        ativo: true,
        data_emprestimo: new Date().toISOString()
      }
    ])
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
      data_devolucao: new Date().toISOString()
    })
    .eq("id_livro", livro_id) // Nome certo
    .eq("ativo", true);       // Fecha apenas empréstimo ativo

  if (error) throw new Error(error.message);
}