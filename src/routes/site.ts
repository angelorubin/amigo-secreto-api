import { Router } from "express"
import * as auth from "../controllers/auth"

const router = Router()

router.get("/", auth.validate, (req, res) => {
  return res.json({ message: "GET SITE ROUTE" })
})

export default router
