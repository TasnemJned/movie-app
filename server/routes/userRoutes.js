import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/", getUsers);

// POST user
router.post("/", createUser);

export default router;