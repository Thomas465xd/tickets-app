import { Publisher, Subjects, TicketDeletedEvent } from "@thomas-ticketx/common"

export class TicketDeletedPublisher extends Publisher<TicketDeletedEvent> {
    readonly subject = Subjects.TicketDeleted;
}