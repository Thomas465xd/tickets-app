import request from "supertest";
import server from "../../server";
import Ticket from "../../models/Ticket";

//? ✅📋 Input Validation Tests
it("Has a route handler listening to /api/tickets for POST Requests", async () => {
    const response = await request(server)
        .post("/api/tickets")
        .send({
            title: "Alan Walker",
            price: 100, 
            description: "Halloween event",
            date: "Oct 9 6:00 PM"
        })
        
    expect(response.status).not.toEqual(404);
});

it("Can only be accessed if the user is signed in", async () => {
    await request(server)
        .post("/api/tickets")
        .send({
            title: "Alan Walker",
            price: 10, 
            description: "Halloween event",
            date: "Oct 9 6:00 PM"
        })
        .expect(401)
});

it("Returns a status other than 401 if the user is signed in", async () => {
    const response = await request(server)
        .post("/api/tickets")
        .set("Cookie", global.setCookie())
        .send({
            title: "Alan Walker",
            price: 10, 
            description: "Halloween event",
            date: "Oct 9 6:00 PM"
        })

    expect(response.status).not.toEqual(401);
});


it("Returns an error if an invalid title is provided", async () => {
    await request(server)
        .post("/api/tickets")
        .set("Cookie", global.setCookie())
        .send({ 
            title: "", 
            price: 10 , 
            description: "Halloween event",
            date: "Oct 9 6:00 PM"
        })
        .expect(400)
});

it("Returns an Error if an invalid price is provided", async () => {
    await request(server)
        .post("/api/tickets")
        .set("Cookie", global.setCookie())
        .send({ 
            title: "Alan Walker", 
            price: -10, 
            description: "Halloween event",
            date: "Oct 9 6:00 PM"
        })
        .expect(400)
});

it("Returns an Error if an invalid description is provided", async () => {
    await request(server)
        .post("/api/tickets")
        .set("Cookie", global.setCookie())
        .send({ 
            title: "Alan Walker", 
            price: 10, 
            description: "",
            date: "Oct 9 6:00 PM"
        })
        .expect(400)
});

it("Returns an Error if an invalid date is provided", async () => {
    await request(server)
        .post("/api/tickets")
        .set("Cookie", global.setCookie())
        .send({ 
            title: "Alan Walker", 
            price: 10, 
            description: "Halloween event",
            date: ""
        })
        .expect(400)
});

it("Creates a ticket with valid inputs", async () => {
    // Expected outcome: 0 entries
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "Valid Title"
    const price = 100
    const description = "Halloween Event"
    const date = "Oct 23 6:00 PM"

    await request(server)
        .post("/api/tickets")
        .set("Cookie", global.setCookie())
        .send({
            title, 
            price, 
            description, 
            date
        })
        .expect(201)

    // Expected outcome after ticket creation: 1 entry
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    // Check if ticket was created with valid inputs
    expect(tickets[0].price).toEqual(price)
    expect(tickets[0].title).toEqual(title)
    expect(tickets[0].description).toEqual(description)
    expect(tickets[0].date).toEqual(date)
});