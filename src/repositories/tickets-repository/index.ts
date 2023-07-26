import { prisma } from '@/config';

async function ticketsTypes () {

 return await prisma.ticketType.findMany()

}

async function getUserTicket (enrollmentId: number){

  return await prisma.ticket.findFirst({ 
    include: {
      TicketType: true
    }, 
    where: {
      enrollmentId
    }
  })
}

async function postTicket (enrollmentId: number , ticketTypeId: number){

  return await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      enrollmentId,
      ticketTypeId,
      updatedAt: new Date(Date.now())
    }
  })
}


async function getTicketById (id: number){

  return await prisma.ticket.findUnique({
    where: {
      id
    }
  })
}

async function getTicketTypeById (id:number){
  return await prisma.ticketType.findUnique({
    where: {
      id
    }
  })
}

async function updateTicket (id: number){
  await prisma.ticket.update({
    data: {
      status: "PAID",
    }, where: {
      id
    }
  })
}





const ticketsRepository = {
  ticketsTypes,
  getUserTicket,
  postTicket,
  getTicketById,
  getTicketTypeById,
  updateTicket
}

export default ticketsRepository;

