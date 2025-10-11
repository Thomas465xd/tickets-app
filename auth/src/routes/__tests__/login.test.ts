import request from "supertest";
import server from "../../server";

//? 📋 Input Validation Tests
it("fails when a email that does not exist is supplied", async () => {
    await request(server) 
        .post("/api/auth/login")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(404)
})

//? 🛠️ Controller validations testss
it("fails when an incorrect password is supplied", async () => {
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
        .post("/api/auth/login")
        .send({
            email: "test@test.com",
            password: "wrongpassword"
        })
        .expect(401)
})

it("Responds with a cookie when given valid credentials", async () => {
    await request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe",
            email: "test@test.com",
            password: "password", 
            confirmPassword: "password"            
        })
        .expect(201);

    const response = await request(server) 
        .post("/api/auth/login")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    
    expect(response.get("Set-Cookie")).toBeDefined();
})