import {z} from 'zod';
import {toTypedSchema} from "@vee-validate/zod";


export const signupFormSchema = z.object({
    fullName: z.string().min(1, {message: 'Name is required'}).nullish(),
    email: z.string().email({message: 'Must be a valid email'}),
    occupation: z.string().min(1, {message: 'Occupation is required'}),
    birthDate: z.string().min(1, {message: 'Birth date is required'}),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
    educationalLevel: z.enum(['primary', 'secondary', 'tertiary', 'diploma', 'degree', 'master', 'phd']),
    learningStyle: z.enum(['conversational', 'academic', 'example_driven']),
    password: z.string().min(4, {message: 'Password must be at least 4 characters'}),
    confirmPassword: z.string(),
    termsAndConditions: z.boolean().refine((value) => value, {
        message: 'You must accept the terms and conditions',
    }),
})

export const signupSchema = toTypedSchema(
    signupFormSchema.refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
)

export type SignupFormValues = z.infer<typeof signupFormSchema>


