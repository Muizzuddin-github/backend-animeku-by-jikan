import Joi from "joi";
import { Register, RegisterSave } from "../requestBody/auth";

class Schema {
  protected static get registerSchema() {
    return Joi.object({
      username: Joi.string().trim().required().min(3).max(20),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(255).required(),
    });
  }

  protected static get registerSaveSchema() {
    return Joi.object({
      otp: Joi.string()
        .trim()
        .min(6)
        .max(6)
        .custom((value: string, helpers: Joi.CustomHelpers) => {
          const regex = /^[0-9]+$/;
          if (!regex.test(value)) {
            return helpers.error("string.onlyDigits");
          }
          return value;
        })
        .messages({
          "string.onlyDigits": "Otp code must be a number",
        })
        .required(),
    });
  }
}

class AuthValidation extends Schema {
  static register(body: Register) {
    return this.registerSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
  static registerSave(body: RegisterSave) {
    return this.registerSaveSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default AuthValidation;
