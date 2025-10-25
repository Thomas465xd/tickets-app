// Set environment variables BEFORE importing anything
process.env.JWT_SECRET = "testsecret";
process.env.DATABASE_URL = "mongodb://tickets-mongo-srv:27017/tickets";

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import server from "../server";
import jwt from "jsonwebtoken";

declare global {
	var setCookie: () => string[];
	var createTicket: (cookie?: string | string[]) => Promise<request.Response>;
}

// Mock the connectDB function before importing server
jest.mock("../config/db", () => ({
	connectDB: jest.fn(),
}));

let mongo: MongoMemoryServer;

beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	if (mongoose.connection.db) {
		const collections = await mongoose.connection.db.collections();

		for (let collection of collections) {
			await collection.deleteMany({});
		}
	}
});

afterAll(async () => {
	if (mongo) {
		await mongo.stop();
	}

	await mongoose.connection.close();
});

//* Declare auth Helper Function
global.setCookie = () => {
	// 1. Build a JWT payload. { id, email }
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: "test@test.com",
	};

	// 2. Create the JWT
	const token = jwt.sign(payload, process.env.JWT_SECRET);

	// 3. Build session object { jwt: MY_JWT }
	const session = { jwt: token };

	// 4. Turn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// 5. Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString("base64");

	// 6. return a string thats the cookie with the encoded data
	return [`session=${base64}`];
};

//* Declare create ticket helper function
global.createTicket = async (cookie?: string | string[]) => {
	const title = "Valid Title";
	const price = 100;
	const description = "Halloween Event";
	const date = "Oct 23 6:00 PM";

	const cookieHeader = cookie ? (Array.isArray(cookie) ? cookie : [cookie]) : global.setCookie();

	return await request(server)
		.post("/api/tickets")
		.set("Cookie", cookieHeader)
		.send({
			title,
			price,
			description,
			date,
		})
		.expect(201);
};
