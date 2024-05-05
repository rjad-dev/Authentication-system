import Joi from "joi";

export const JoiSchema = {
    stringSchema : Joi.string(),
    numberSchema : Joi.number(),
    booleanSchema : Joi.boolean(),
    objectSchema : Joi.object(),
    dateAndTimeSchema : Joi.date(), 
    emailSchema: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: [], deny: [] } })
        .lowercase()
        .trim(),
    arraySchema: Joi.array(),
}




