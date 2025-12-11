// Conecta seu backend original ao Vercel como Serverless Function

import serverless from "serverless-http";
import app from "../backend/index.js";  // usa seu backend do jeito que está

export const handler = serverless(app);