import request from "supertest";
import server from "../../server";

//? 📋 Input Validation Tests
it("Responds with Details about the current user", async () => {
    // Use auth helper function
    const cookie = await getCookie();

    const response = await request(server)
        .get("/api/auth/user")
        .set("Cookie", cookie)
        .send()
        .expect(200);
    
    expect(response.body.currentUser.email).toEqual("test@test.com");

    //console.log(response.body); will return null because supertest, 
    //unlike postman or the browser does not automatically manage cookies for us, 
    // so we need to do that manually.

})

it("Responds with null if not authenticated", async () => {
    const response = await request(server)
        .get("/api/auth/user")
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null);
})