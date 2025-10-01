import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
    static async hashPassword(password: string) {
        const salt = randomBytes(10).toString("hex");
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString("hex")}.${salt}`
    }

    static async comparePassword(storedPassword: string, suppliedPassword: string) {
        // Separate the salt from the hashed password
        const [ hashedPassword, salt ] = storedPassword.split(".");

        // Hash the supplied password with the same salt as the real password
        const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        // Compare 
        return buffer.toString("hex") === hashedPassword
    }
}