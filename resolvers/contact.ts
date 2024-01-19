import { ContactType } from "../types.ts";
import getTime from "../utils/getTime.ts";

export const Contact = {
  time: async (parent: ContactType) => {
    return await getTime(parent.capital);
  },
};
