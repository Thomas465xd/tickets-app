import { Publisher, Subjects, TicketUpdatedEvent } from "@thomas-ticketx/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}