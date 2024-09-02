import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.send("Hello CATEGORIES!")
})
router.post("/", (req, res) => {
    res.send("Hello CATEGORIES POST!")
})
router.put("/:id", (req, res) => {
    res.send("Hello CATEGORIES PUT!")
})
router.delete("/:id", (req, res) => {
    res.send("Hello CATEGORIES DELETE!")
})

export default router