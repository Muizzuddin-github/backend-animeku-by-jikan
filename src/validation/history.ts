import Joi from "joi";
import { RequestBodyHistory } from "../requestBody/history";

class HistorySchema {
  protected static get addSchema() {
    return Joi.object({
      mal_id: Joi.number().required(),
      url: Joi.string().trim().required(),
      images: Joi.string().trim().required(),
      trailer: Joi.string().trim().required(),
      title: Joi.string().trim().required(),
      status: Joi.string().trim().required(),
      score: Joi.number().required(),
      year: Joi.number().required(),
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
