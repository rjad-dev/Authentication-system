import Joi from "joi";
import { JoiSchema } from "./joiSchema";

const signUp = Joi.object({
  name: JoiSchema.stringSchema.required().min(3).max(25).label("Name"),
  email: JoiSchema.emailSchema.required().label("E-mail"),
  password: JoiSchema.stringSchema.required().min(5).label("Password"),
});

const verifyAccount = Joi.object({
  email: JoiSchema.stringSchema.required().label("E-mail"),
  inputVerificationCode: JoiSchema.numberSchema
    .required()
    .min(5)
    .label("Verification code"),
});

const resendVerificationCode = Joi.object({
  email: JoiSchema.emailSchema.required().label("E-mail"),
});

const logIn = Joi.object({
  email: JoiSchema.emailSchema.required().label("E-mail"),
  password: JoiSchema.stringSchema.required().label("Password"),
});

export { signUp, verifyAccount, resendVerificationCode, logIn };
