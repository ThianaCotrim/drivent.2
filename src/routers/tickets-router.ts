import { Router } from "express";
import { getTicketsTypes, getUserTickets, postTickets } from "@/controllers/tickets-controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router()

ticketsRouter.use(authenticateToken)
ticketsRouter.get("/types", getTicketsTypes)
ticketsRouter.get("/", getUserTickets)
ticketsRouter.post("/", validateBody(createTicketSchema), postTickets)

export {ticketsRouter}

