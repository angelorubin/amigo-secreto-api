import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  return res.json({ message: "GET SITE ROUTE" })
})

export default router
