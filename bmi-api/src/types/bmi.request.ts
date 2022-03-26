import { object, optional, number, TypeOf, string } from 'zod'

export const bmiRequestSchema = object({
    body: object({
        id: optional(string()),
        weight: number({
            required_error: 'Weight is required for BMI calculation'
        }),
        height: number({
            required_error: 'Height is required for BMI calculation'
        }),
    })
});

export type BmiRequest = TypeOf<typeof bmiRequestSchema>;