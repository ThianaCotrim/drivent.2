import { TicketTypeId } from "@/protocols";
import Joi from "joi";

export const createTicketSchema = Joi.object<TicketTypeId>({
  ticketTypeId: Joi.number().required()
})