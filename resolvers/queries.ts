import { GraphQLError } from "graphql";
import ContactModel from "../db/contact.ts";

const getContact = async (_: unknown, args: { id: string }) => {
  const { id } = args;

  try {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      throw "Contact not found";
    }
    return contact;
  } catch (e) {
    throw new GraphQLError(e);
  }
};

const getContacts = async () => {
  try {
    const contacts = await ContactModel.find({});
    console.log(contacts);
    return contacts;
  } catch (e) {
    throw new GraphQLError(e);
  }
};

export const Query = {
  getContact,
  getContacts,
};
