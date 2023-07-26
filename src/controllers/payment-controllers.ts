import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payment-service';
import { InputPayment } from '@/protocols';


export async function getPaymentTicket (req: AuthenticatedRequest, res: Response){
  const {userId} = req
  const ticketId = Number(req.query.ticketId)

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)

  const paymentTicket = await paymentService.paymentTicketId(ticketId, userId)

  res.status(httpStatus.OK).send(paymentTicket)
}

export async function postPayment (req: AuthenticatedRequest, res: Response){

  const paymentData = req.body as InputPayment
  const {userId} = req

  const payment = await paymentService.postPayment(paymentData, userId)

  res.status(httpStatus.OK).send(payment);

}