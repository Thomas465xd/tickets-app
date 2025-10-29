import request from "supertest";
import server from "../../server";
import Ticket from "../../models/Ticket";
import mongoose from "mongoose";

//? 📋 Input Validation Tests
it("Returns a 400 if ticket id is invalid", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .get(`/api/tickets/${ticketId}asñldkfj`)
        .send()
        .expect(400);
});

it("Returns a 404 if the ticket is not found", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .get(`/api/tickets/${ticketId}`)
        .send()
        .expect(404);
});

it("Returns the ticket if it exists", async () => {
    // Expected outcome: 0 entries
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    // Call global createTicket function
    await createTicket();

    // Expected outcome after ticket creation: 1 entry
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    const { title, price, description, date } = tickets[0];

    // Check if ticket was created with valid inputs
    expect(tickets[0].price).toEqual(price)
    expect(tickets[0].title).toEqual(title)
    expect(tickets[0].description).toEqual(description)
    expect(tickets[0].date).toEqual(date)

    const ticketId = tickets[0].id

    await request(server)
        .get(`/api/tickets/${ticketId}`)
        .send()
        .expect(200);
});

