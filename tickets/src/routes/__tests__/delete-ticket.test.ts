import request from "supertest";
import server from "../../server";
import Ticket from "../../models/Ticket";
import mongoose from "mongoose";

//? ✅
it("Returns a 400 if the user provides an invalid ticket ID", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .delete(`/api/tickets/${ticketId}sdfasfd`)
        .set("Cookie", global.setCookie())
        .send()
        .expect(400);
});

//? ✅
it("Returns a 401 if the user is not authenticated", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .delete(`/api/tickets/${ticketId}`)
        .send()
        .expect(401);
});

//? ✅
it("Returns a 404 if the ticket is not found (id does not exists)", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    const title = "Valid Title"
    const price = 100
    const description = "Halloween Event"
    const date = "Oct 23 6:00 PM"

    await request(server)
        .delete(`/api/tickets/${ticketId}`)
        .set("Cookie", global.setCookie())
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(404);
});

//?
it("Returns a 401 if the user does not own the ticket", async () => {
    // Expected outcome: 0 entries
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    // Call global createTicket function
    await createTicket();

    // Expected outcome after ticket creation: 1 entry
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    // Get the ticket id
    const ticketId = tickets[0].id

    const title = "Valid Title"
    const price = 100
    const description = "Halloween Event"
    const date = "Oct 23 6:00 PM"

    await request(server)
        .delete(`/api/tickets/${ticketId}`)
        .set("Cookie", global.setCookie())
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(401);
});

it("Returns a 200 if the ticket is successfully deleted", async () => {
    // Save cookie to be reused
    const cookie = global.setCookie();

    // Expected outcome: 0 entries
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    // Call global createTicket function
    await createTicket(cookie);

    // Expected outcome after ticket creation: 1 entry
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    // Get the ticket id
    const ticketId = tickets[0].id

    await request(server)
        .delete(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send()
        .expect(200);

    // Validate if the ticket was successfully deleted
    await request(server) 
        .get(`/api/tickets/${ticketId}`)
        .send()
        .expect(404)
});