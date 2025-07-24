import z from 'zod';

export const registerUserSchema = z.object({
    username: z
    .string()
    .trim()
    .min(3, {messages:'Name must be atleast of 3 charaters.'})
    .max(100, {message:'Name should contain atmost 100 characters.'}),

    email: z
    .string()
    .trim()
    .email()
    .max(100, {message:'Email must be shorter than 100 characters.'}),

    password: z
    .string()
    .min(6, {message:"Password must be minimum 6 character long."})
    .max(100, {message:'Password must be less than 100 characters.'}),

    confirmPassword: z
    .string()
    .min(6)
    .max(100)
})