import { Router } from "express";

const router = Router();

router.post("/logout", (req, res) => {
    req.session = null; 

    res.status(200).json({ message: "Successfully Logged Out"})
});

export default router