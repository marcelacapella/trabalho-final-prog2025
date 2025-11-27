import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  "https://dsugctfsikpmfuyynjpg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdWdjdGZzaWtwbWZ1eXluanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDQwMDMsImV4cCI6MjA3ODYyMDAwM30.0V7P2C5mIq7JXN_iJtuy6ocgAtJ0zB3qtrOnBoo4kYo"
);

app.get("/testar-supabase", async (req, res) => {
  const { data, error } = await supabase.from("livros").select("*").limit(1);

  if (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao conectar com o Supabase",
      detalhes: error.message
    });
  }

  res.json({
    sucesso: true,
    mensagem: "Backend conectado com sucesso ao Supabase!",
    exemplo: data
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
