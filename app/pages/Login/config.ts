import {z} from 'zod';
import {toTypedSchema} from "@vee-validate/zod";

export const loginFormSchema = z.object({
    email: z.string().email({message: 'Must be a valid email'}),
    password: z.string().min(4, {message: 'Password must be at least 4 characters'}),
})

export const loginSchema = toTypedSchema(loginFormSchema)

export type LoginFormValues = z.infer<typeof loginFormSchema>
