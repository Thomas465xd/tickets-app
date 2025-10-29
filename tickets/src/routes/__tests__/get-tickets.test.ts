import request from "supertest";
import server from "../../server";
import Ticket from "../../models/Ticket";

//? 📋 Input Validation Tests
it("Can fetch a list of tickets", async () => {
    // Expected outcome: 0 entries
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(server)
        .get(`/api/tickets`)
        .send()
        .expect(200);

    // It should return 3 tickets
    expect(response.body.length).toEqual(3);
});