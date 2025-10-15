import { z } from "zod";

export const registerSchema = z.object({
    name: z.string(), 
    email: z.email(), 
    password: z.string().min(7), 
    confirmPassword: z.string().min(7),
})

export const loginSchema = registerSchema.pick({
    email: true, 
    password: true
})

export const userSchema = z.object({
    id: z.string().optional(), 
    name: z.string(), 
    email: z.email(),
    iat: z.number().optional() // also in response
})

export const getUserSchema = z.object({
    currentUser: userSchema
})

//? 📋 Auth Types
export type RegisterUserForm = z.infer<typeof registerSchema>
export type LoginUserForm = z.infer<typeof loginSchema>