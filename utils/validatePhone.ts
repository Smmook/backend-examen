import getApiKey from "./getApiKey.ts";
import { PhoneValidation } from "../types.ts";

export default async (phone: string): Promise<PhoneValidation> => {
  const url = `https://api.api-ninjas.com/v1/validatephone?number=${phone}`;
  try {
    const res = await fetch(url, { headers: { "X-Api-Key": getApiKey() } });
    const { is_valid, country } = await res.json();
    return { is_valid, country };
  } catch (e) {
    throw e;
  }
};
