import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentsService from "../enrollments-service";
import { notFoundError } from "@/errors";

async function ticketsTypes (){
    return await ticketsRepository.ticketsTypes()
}


async function getUserTicket (userId:number){
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId)
    const ticket = await ticketsRepository.getUserTicket(enrollment.id)
    if (!ticket) throw notFoundError()

    return ticket
}

async function postTicket (userId: number, ticketTypeId: number){

    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId)
    await ticketsRepository.postTicket(enrollment.id, ticketTypeId)

    return await getUserTicket(userId)
}

const ticketsService = {

    ticketsTypes,
    getUserTicket,
    postTicket
}

export default ticketsService