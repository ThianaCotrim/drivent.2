import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { TicketTypeId } from '@/protocols';

export async function getTicketsTypes (req: AuthenticatedRequest, res: Response) {

    const ticketsTypes = await ticketsService.ticketsTypes()
    
    res.status( httpStatus.OK).send(ticketsTypes)

}

export async function getUserTickets (req: AuthenticatedRequest, res: Response) {

    const {userId} = req

    const ticketUser = await ticketsService.getUserTicket(userId)

    res.status(httpStatus.OK).send(ticketUser)
}

export async function postTickets (req: AuthenticatedRequest, res: Response) {

    const {userId} = req

    const {ticketTypeId} = req.body as TicketTypeId

    const ticketUser = await ticketsService.postTicket(userId, ticketTypeId)

    res.status(httpStatus.CREATED).send(ticketUser)

}
