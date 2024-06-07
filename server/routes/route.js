import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import {
  addToFavorite,
  removeFavorite,
} from "../controller/favorite-controller.js";
import { addComment } from "../controller/comment-controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/addfavorite/:id", addToFavorite);
router.post("/removefavorite/:id", removeFavorite);

router.post("/addcomment/:id",addComment);

export default router;
