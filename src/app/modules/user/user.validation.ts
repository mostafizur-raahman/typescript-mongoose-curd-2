import Joi from "joi";
export const joiStudentValidator = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().max(20).required(),
    password: Joi.string().min(6).required(),
    fullName: {
        firstName: Joi.string().max(25).required(),
        lastName: Joi.string().max(25).required(),
    },
    age: Joi.number().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    isActive: Joi.boolean().default(true),
    hobbies: Joi.array().items(Joi.string()).default([]),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    orders: Joi.array()
        .items(
            Joi.object({
                productName: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().required(),
            })
        )
        .default([]),
});
