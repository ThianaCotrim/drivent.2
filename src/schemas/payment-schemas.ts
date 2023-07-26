import Joi from "joi";
import { InputPayment, CardData } from "@/protocols";

export const inputPaymentSchema = Joi.object<InputPayment>({
    ticketId: Joi.number().required(),

    cardData: Joi.object<CardData>({
        issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string()
      .regex(/^(0?[1-9]|1[0-2])\/\d{4}$/)
      .required(),
      cvv: Joi.number().required()
    })
})

