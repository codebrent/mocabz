import express from "express";
import { wordfind } from "./services";

const router = express.Router();

router.get("/wordfind/:chars", (req, res) => {
  const { chars } = req.params;
  let word = "";
  if (typeof chars === "string") {
    word = chars
      .toLowerCase()
      .replace(/[^a-z]/, "")
      .substring(0, 7);
  }
  if (word.length < 3) {
    return {};
  }
  res.send(wordfind(word));
});

export default router;
