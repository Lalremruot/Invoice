import express from 'express';
import { createInvoice, deleteInvoice, getInvoice, updateInvoice } from '../controllers/invoiceControllers.js';

const router = express.Router()

router.get("/", getInvoice)

router.post("/", createInvoice)

router.put("/:id", updateInvoice)

router.delete("/:id", deleteInvoice)

export default router