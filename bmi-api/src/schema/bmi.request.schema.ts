import { object, string, number, TypeOf } from 'zod'

export const bmiRequestSchema = object({
    body: object({
        id: string({
            required_error: 'Request id is required'
        }),
        ip: string({
            required_error: 'Ip is required'
        }),
        weight: number({
            required_error: 'Weight is required for BMI calculation'
        }),
        height: number({
            required_error: 'Height is required for BMI calculation'
        }),
    })
});

export type BmiInput = TypeOf<typeof bmiRequestSchema>;