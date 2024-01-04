import express from "express"
import {
	getServicesByShop,
	createService,
	editService,
	deleteService,
} from "./services.controller"

const router = express.Router()

router.get("/:shopUuid", getServicesByShop)
router.post("/", createService)
router.put("/:id", editService)
router.delete("/:id", deleteService)

export default router
