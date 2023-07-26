import { notFoundError, unauthorizedError } from "@/errors";
import { InputPayment } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function paymentTicketId (ticketId: number, userId: number){


  const ticket = await ticketsRepository.getTicketById(ticketId)

  if (!ticket) throw notFoundError()
  const payment = await paymentRepository.paymentTicketId(ticketId)

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

  if (enrollment.id !== ticket.enrollmentId) throw unauthorizedError("This ticket is not associated with this user!")

  return payment
}

async function postPayment(body:InputPayment, userId:number){

  await paymentTicketId(body.ticketId, userId)
  const ticket = await ticketsRepository.getTicketById(body.ticketId)

  const ticketType = await ticketsRepository.getTicketTypeById(ticket.ticketTypeId)
  
  const payment = await paymentRepository.postPaymentTicket(body.cardData, body.ticketId, ticketType.price)

  await ticketsRepository.updateTicket(body.ticketId)
  return payment
}



 const paymentService = {
    paymentTicketId,
    postPayment
 }

 export default paymentService