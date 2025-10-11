import request from "supertest";
import server from "../../server";

//? 📋 Input Validation Tests
it("returns a 201 on successful register", async () => {
    return request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "password", 
            confirmPassword: "password"            
        })
        .expect(201);
})

it("returns a 400 with an invalid email", async () => {
    return request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "invalid-email",
            password: "password", 
            confirmPassword: "password"            
        })
        .expect(400);
})

it("returns a 400 with an invalid password", async () => {
    return request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "p", 
            confirmPassword: "p"            
        })
        .expect(400);
})

it("returns a 400 with non matching passwords", async () => {
    return request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "password1", 
            confirmPassword: "password2"            
        })
        .expect(400);
})

it("returns a 400 with missing name, email & password", async () => {
    await request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe"
        })
        .expect(400);
    await request(server)
        .post("/api/auth/register")
        .send({ 
            email: "test@test.com"
        })
        .expect(400);
    await request(server)
        .post("/api/auth/register")
        .send({
            password: "password"
        })
        .expect(400);
})

//? 🛠️ Controller validations tests
it("Disallows duplicate emails", async () => {
    await request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "password", 
            confirmPassword: "password"            
        })
        .expect(201);
    await request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "password", 
            confirmPassword: "password"            
        })
        .expect(409);
})

it("Sets a cookie after successful register", async () => {
    const response = await request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "password", 
            confirmPassword: "password"            
        })
        .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined(); // Check headers for a cookie 
})

