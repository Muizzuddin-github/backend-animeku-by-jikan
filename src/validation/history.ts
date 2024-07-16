import Joi from "joi";
import { RequestBodyHistory } from "../requestBody/history";

class HistorySchema {
  protected static get addSchema() {
    return Joi.object({
      mal_id: Joi.number().required(),
      url: Joi.string().trim().required(),
      images: Joi.string().trim().required(),
      trailer: Joi.required(),
      title: Joi.string().trim().required(),
      status: Joi.required(),
      score: Joi.required(),
      genres: Joi.array().items(Joi.string()),
      year: Joi.required(),
    });
  }
}

class HistoryValidation extends HistorySchema {
  static add(body: RequestBodyHistory) {
    return super.addSchema.validateAsync(body, {
      abortEarly: false,
    });
  }
}

export default HistoryValidation;
