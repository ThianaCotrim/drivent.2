import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentTicket, postPayment } from "@/controllers/payment-controllers";
import { inputPaymentSchema } from "@/schemas/payment-schemas";


const paymentRouter = Router()

paymentRouter.use(authenticateToken)
paymentRouter.get("/", getPaymentTicket)
paymentRouter.post("/process", validateBody(inputPaymentSchema), postPayment)


export { paymentRouter }