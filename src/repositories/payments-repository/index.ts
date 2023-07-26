import { prisma } from '@/config';
import { CardData } from '@/protocols';


async function paymentTicketId (ticketId: number){

    return await prisma.payment.findFirst({

        where: {
            ticketId
        }
    })
}



async function postPaymentTicket (cardData: CardData, ticketId: number, value: number ){
  const cardNumberStr = cardData.number.toString();
  const lastDigits = cardNumberStr.substring(cardNumberStr.length - 4, cardNumberStr.length);

return await prisma.payment.create({
    data: {
        updatedAt: new Date(Date.now()),
        cardIssuer: cardData.issuer,
        cardLastDigits: lastDigits,
        value,
        createdAt: new Date(Date.now()),
        ticketId,
    }
})

}




const paymentRepository = {
    paymentTicketId,
    postPaymentTicket,
}

export default paymentRepository