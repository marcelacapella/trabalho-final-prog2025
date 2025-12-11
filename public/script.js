import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://dsugctfsikpmfuyynjpg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdWdjdGZzaWtwbWZ1eXluanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDQwMDMsImV4cCI6MjA3ODYyMDAwM30.0V7P2C5mIq7JXN_iJtuy6ocgAtJ0zB3qtrOnBoo4kYo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ------------------------ TESTE DE CONEXÃO ORIGINAL ------------------------ */
async function testarConexao() {
  try {
    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .limit(1);

    if (error) throw error;

    console.log('Conexão bem-sucedida!');
    console.log('Exemplo de dado retornado:', data);
  } catch (err) {
    console.error('Erro ao conectar com o Supabase:', err.message);
  }
}

testarConexao();

/* ------------------------ NOVAS FUNÇÕES — BUSCA + API ------------------------ */

const API_BASE = "https://trabalho-final-prog2025.vercel.app/api";
// Para testes locais ↴
// const API_BASE = "http://localhost:3000";

const input = document.querySelector(".search-bar input");
const btn = document.querySelector(".search-bar button");
const results = document.querySelector(".results");

btn.addEventListener("click", doSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});

/* ------------------------ FUNÇÃO DE BUSCA ------------------------ */
async function doSearch() {
  const q = input.value.trim();

  if (!q) {
    results.innerHTML = `<p>Digite algo para pesquisar.</p>`;
    return;
  }

  results.innerHTML = `<p>Buscando por "<strong>${escapeHtml(q)}</strong>"...</p>`;

  const url = `${API_BASE}/livros?busca=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      results.innerHTML = `<p>Erro ao buscar livros: ${res.status}</p>`;
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      results.innerHTML = `<p>Nenhum livro encontrado para "${escapeHtml(q)}".</p>`;
      return;
    }

    renderLivros(data);

  } catch (err) {
    results.innerHTML = `<p>Erro ao conectar com a API: ${escapeHtml(err.message)}</p>`;
  }
}

/* ------------------------ EXIBE RESULTADOS ------------------------ */
function renderLivros(livros) {
  results.innerHTML = "";

  livros.forEach((livro) => {
    const card = document.createElement("div");
    card.classList.add("livro-card");

    const id = livro.id ?? livro.livro_id ?? null;
    const titulo = livro.titulo ?? "Sem título";
    const autor = livro.autor ?? "Autor desconhecido";

    card.innerHTML = `
      <h3>${escapeHtml(titulo)}</h3>
      <p><strong>Autor:</strong> ${escapeHtml(autor)}</p>
      <button class="emprestar" data-id="${id}">Emprestar</button>
    `;

    results.appendChild(card);
  });

  attachEmprestarEvent();
}

/* ------------------------ BOTÃO EMPRESTAR ------------------------ */
function attachEmprestarEvent() {
  document.querySelectorAll(".emprestar").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;

      const confirmacao = confirm("Deseja realmente emprestar este livro?");
      if (!confirmacao) return;

      try {
        const res = await fetch(`${API_BASE}/emprestimos/emprestar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            livro_id: Number(id),
            usuario_id: 1
          })
        });

        if (!res.ok) {
          const erro = await res.text();
          alert("Erro ao emprestar: " + erro);
          return;
        }

        alert("Empréstimo realizado com sucesso!");
        doSearch();

      } catch (err) {
        alert("Erro ao conectar com API: " + err.message);
      }
    });
  });
}

/* ------------------------ PREVENÇÃO DE XSS ------------------------ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}