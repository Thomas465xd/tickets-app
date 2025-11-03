import request from "supertest";
import server from "../../server";
import Ticket from "../../models/Ticket";
import mongoose from "mongoose";
import Order from "../../models/Order";
import { OrderStatus } from "@thomas-ticketx/common";

//? ✅📋 Initialization Tests
it("Has a route handler listening to /api/orders for POST Requests", async () => {
    const response = await request(server)
        .post("/api/orders")
        .send()
        
    expect(response.status).not.toEqual(404);
});

it("Returns a 401 'Not Authorized' Error if the user is not Signed in", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(server)
        .post("/api/orders")
        .set("Cookie","invalid_cookie")
        .send({
            ticketId
        })

    expect(response.status).toEqual(401);
});

it("Returns a status other than 401 if the user is signed in", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    const response = await request(server)
        .post("/api/orders")
        .set("Cookie", global.setCookie())
        .send({
            ticketId
        })

    expect(response.status).not.toEqual(401);
});


it("Returns a 400 'Bad Request' error if an invalid ticketId is provided", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .post("/api/orders")
        .set("Cookie", global.setCookie())
        .send({ 
            ticketId: `${ticketId}asdf`
        })
        .expect(400)

    await request(server)
        .post("/api/orders")
        .set("Cookie", global.setCookie())
        .send({ 
            ticketId: ""
        })
        .expect(400)
});

//? Handler tests
it("returns a 404 'Not Found' error if the ticket does not exits", async () => {
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    await request(server)
        .post("/api/order")
        .set("Cookie", global.setCookie())
        .send({
            ticketId
        })
        .expect(404)
})

it("returns a 409 'Bad Request' error if the ticket is already reserved", async () => {
    // Expected outcome: 0 entries
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "Concert"
    const price = 20

    const ticket = Ticket.build({
        title,
        price
    });

    await ticket.save();

    // Expected outcome after ticket creation: 1 entry
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);

    // Check if ticket was created with valid inputs
    expect(tickets[0].price).toEqual(price)
    expect(tickets[0].title).toEqual(title)

    let orders = await Order.find({});
    expect(orders.length).toEqual(0);

    const userId = new mongoose.Types.ObjectId

    const order = Order.build({
        ticket: ticket.id, 
        status: OrderStatus.Created, 
        userId,
        expiresAt: new Date()
    })

    await order.save();

    // Expected outcome after order creation: 1
    orders = await Order.find({}); 
    expect(orders.length).toEqual(1);

    expect(orders[0].ticket.toString()).toEqual(ticket.id)
    expect(orders[0].status).toEqual(OrderStatus.Created)
    expect(orders[0].userId).toEqual(userId)

    await request(server) 
        .post("/api/orders")
        .set("Cookie", global.setCookie())
        .send({ ticketId: ticket.id })
        .expect(409)
})

it("returns a 201 'Resource Created' if the order is successfully created", async () => {
    const ticket = Ticket.build({
        title: "concert", 
        price: 20
    });

    await ticket.save();

    let orders = await Order.find({});
    expect(orders.length).toEqual(0);

    await request(server) 
        .post("/api/orders")
        .set("Cookie", global.setCookie())
        .send({ ticketId: ticket.id })
        .expect(201)

    // Expected outcome after order creation: 1
    orders = await Order.find({}); 
    expect(orders.length).toEqual(1);

    expect(orders[0].ticket.toString()).toEqual(ticket.id)
    expect(orders[0].status).toEqual(OrderStatus.Created)
})

//? Event Bus Tests
it.todo("Emits an order:created Event")