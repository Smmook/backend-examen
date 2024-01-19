import { Document } from "npm:mongoose";

export default (_doc: Document, current: Record<string, string>) => {
  current.id = current._id;
  delete current._id;
  delete current.__v;
};
