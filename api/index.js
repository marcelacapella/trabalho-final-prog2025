import serverless from "serverless-http";
import app from "../backend/index.js";  // usa seu backend do jeito que está

export const handler = serverless(app);
