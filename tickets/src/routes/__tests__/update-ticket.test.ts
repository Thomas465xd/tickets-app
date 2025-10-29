import request from "supertest";
import server from "../../server";
import Ticket from "../../models/Ticket";
import mongoose from "mongoose";
import { natsWrapper } from "../../config/nats";

//? 📋 Input Validation Tests

//? ✅
it("Returns a 400 if the user provides an invalid ticket ID", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .patch(`/api/tickets/${ticketId}sdfasfd`)
        .set("Cookie", global.setCookie())
        .send({

        })
        .expect(400);
});

//? ✅
it("Returns a 401 if the user is not authenticated", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    const title = "Valid Title"
    const price = 100
    const description = "Halloween Event"
    const date = "Oct 23 6:00 PM"

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .send({
            title, 
            price, 
            description, 
            date
        })
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
        .patch(`/api/tickets/${ticketId}`)
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
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", global.setCookie())
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(401);
});

//? ✅
it("Returns a 400 if the user provides an invalid title", async () => {
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

    const title = ""
    const price = 100
    const description = "Halloween Event"
    const date = "Oct 23 6:00 PM"

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(400);
});

//? ✅
it("Returns a 400 if the user provides an invalid price", async () => {
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

    const title = "Valid Title"
    const price = -100
    const description = "Halloween Event"
    const date = "Oct 23 6:00 PM"

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(400);
});

//? ✅
it("Returns a 400 if the user provides an invalid description", async () => {
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

    const title = "Valid Title"
    const price = 100
    const description = ""
    const date = "Oct 23 6:00 PM"

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(400);
});

//? ✅
it("Returns a 400 if the user provides an invalid date", async () => {
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

    const title = "Valid Title"
    const price = 100
    const description = "Halloween Event"
    const date = ""

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(400);
});

//? ✅
it("Updates the ticket if provided valid inputs", async () => {
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

    const title = "Valid New Title"
    const price = 1000
    const description = "Halloween Event Updated"
    const date = "Oct 23 7:00 PM"

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(200);

    const ticketResponse = await request(server)
        .get(`/api/tickets/${ticketId}`)
        .send();
    
    expect(ticketResponse.body.title).toEqual("Valid New Title")
    expect(ticketResponse.body.price).toEqual(1000)
    expect(ticketResponse.body.description).toEqual("Halloween Event Updated")
    expect(ticketResponse.body.date).toEqual("Oct 23 7:00 PM")
});

it("publishes a ticket:updated Event", async () => {
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

    const title = "Valid New Title"
    const price = 1000
    const description = "Halloween Event Updated"
    const date = "Oct 23 7:00 PM"

    await request(server)
        .patch(`/api/tickets/${ticketId}`)
        .set("Cookie", cookie)
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(200);

    //console.log(natsWrapper)
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});