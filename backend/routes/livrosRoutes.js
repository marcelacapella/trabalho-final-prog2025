import express from "express";
import {
  listarLivros,
  buscarLivro,
  marcarDisponivel,
  marcarEmprestado
} from "../dao/livrosDAO.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await listarLivros());
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.json(await buscarLivro(req.params.id));
  } catch {
    res.status(404).json({ erro: "Livro não encontrado" });
  }
});

export default router;