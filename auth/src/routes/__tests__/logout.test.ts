import request from "supertest";
import server from "../../server";

//? 📋 Input Validation Tests
it("clears the cookie after signing out", async () => {
    await request(server)
        .post("/api/auth/register")
        .send({
            name: "John Doe", 
            email: "test@test.com", 
            password: "password", 
            confirmPassword: "password"
        })
        .expect(201)
    const response = await request(server)
        .post("/api/auth/logout")
        .send({ })
        .expect(200)
    
    const cookie = response.get("Set-Cookie");
    if (!cookie) {
        throw new Error("Expected cookie but got undefined.");
    }
    
    expect(cookie[0]).toEqual(
        "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
});