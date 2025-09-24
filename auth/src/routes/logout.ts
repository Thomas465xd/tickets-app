import { Router } from "express";

const router = Router();

router.post("/logout", (req, res) => {
    // Clear session, token, or whatever logout means in your app
    res.status(200).send({ message: "Logged out successfully" });
});

export default router