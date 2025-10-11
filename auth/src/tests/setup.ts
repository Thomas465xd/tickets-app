import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

// Set environment variables BEFORE importing anything
process.env.JWT_SECRET = "testsecret";

import server from "../server";

declare global {
    var getCookie: () => Promise<string[]>;
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
global.getCookie = async () => {
    const name = "John Doe"
    const email = "test@test.com";
    const password = "password"; 

    const response = await request(server)
        .post("/api/auth/register")
        .send({
            name: name, 
            email: email,
            password: password,
            confirmPassword: password
        })

    const cookie = response.get("Set-Cookie");

    if (!cookie) {
        throw new Error("Cookie not set after signup");
    }

	return cookie;
}