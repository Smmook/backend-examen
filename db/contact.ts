import mongoose from "npm:mongoose";
import { ContactType } from "../types.ts";
import setDocumentId from "../utils/setDocumentId.ts";

const contactSchema = new mongoose.Schema<ContactType>({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  capital: { type: String, required: true },
});

contactSchema.set("toJSON", { transform: setDocumentId });

// He decidido hacer la validacion del telefono a mano para poder aprovechar la llamada a la api 
// en la validacion para obtener la capital y no tener que llamarla 2 veces.
/*
contactSchema.path("phone").validate(async function (phone: string) {
  const valdiation = await validatePhone(phone);
  return valdiation.is_valid;
});
*/

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
