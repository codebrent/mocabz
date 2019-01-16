import express from "express";
import { wordfind } from "./services";

const router = express.Router();

router.get("/wordfind/:chars([a-z]+)", (req, res) => {
  const { chars } = req.params;
  res.send(wordfind(chars));
});

export default router;
