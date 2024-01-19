import { GraphQLError } from "graphql";
import validatePhone from "../utils/validatePhone.ts";
import getCapital from "../utils/getCapital.ts";
import { PhoneValidation } from "../types.ts";
import ContactModel from "../db/contact.ts";

const addContact = async (
  _: unknown,
  args: { name: string; phone: string },
) => {
  const { name, phone } = args;
  try {
    const phoneValidation: PhoneValidation = await validatePhone(phone);
    if (!phoneValidation.is_valid) {
      throw "Phone is not valid";
    }
    const capital: string = await getCapital(phoneValidation.country);
    if (capital.length === 0) {
      throw "No se ha obtenido bien la capital";
    }
    const { country } = phoneValidation;

    const contact = await new ContactModel({ name, phone, country, capital })
      .save();
    return contact;
  } catch (e) {
    throw new GraphQLError(e);
  }
};

const deleteContact = async (_: unknown, args: { id: string }) => {
  const { id } = args;
  try {
    const deleted = await ContactModel.findByIdAndDelete(id);
    return deleted ? true : false;
  } catch (e) {
    throw new GraphQLError(e);
  }
};

const updateContact = async (
  _: unknown,
  args: { id: string; name?: string; phone?: string },
) => {
  const { name, phone } = args;
  const { id, ...rest } = args;
  let updatedFields = {};
  try {
    if (!name && !phone) {
      throw "No args provided";
    }
    if (phone) {
      const phoneValidation = await validatePhone(phone);
      if (!phoneValidation.is_valid) {
        throw "Number is not valid";
      }
      const capital: string = await getCapital(phoneValidation.country);
      if (capital.length === 0) {
        throw "No se ha obtenido bien la capital";
      }
      const country = phoneValidation.country;
      updatedFields = { capital, country };
    }

    const updated = await ContactModel.findByIdAndUpdate(id, {
      ...rest,
      ...updatedFields,
    }, {
      new: true,
    });
    return updated;
  } catch (e) {
    throw new GraphQLError(e);
  }
};

export const Mutation = {
  addContact,
  deleteContact,
  updateContact,
};
