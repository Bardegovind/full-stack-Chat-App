import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
let router = express.Router();
import {Signup , Login , Logout , updateProfile , checkAuth} from "../controllers/auth.controller.js";

router.post("/signup" ,Signup);

router.post("/login" ,Login);

router.post("/logout" ,Logout);

router.patch("/update-profile", protectRoute ,updateProfile);

router.get("/check" , protectRoute, checkAuth);

export default router;