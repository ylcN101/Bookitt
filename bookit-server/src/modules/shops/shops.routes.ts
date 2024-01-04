import express from "express"
import { getAllShops, createShop, getShop } from "./shops.controller"

const router = express.Router()

router.get("/", getAllShops)

//single shop by uuid
router.get("/:uuid", getShop)

router.post("/", createShop)

export default router
