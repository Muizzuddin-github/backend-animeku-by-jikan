import mongoose from "mongoose";

const isObjectID = (id: string) => {
  return mongoose.isValidObjectId(id);
};

export default isObjectID;
