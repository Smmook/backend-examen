import getApiKey from "./getApiKey.ts";

export default async (country: string) => {
  const url = `https://api.api-ninjas.com/v1/country?name=${country}`;
  try {
    const res = await fetch(url, { headers: { "X-Api-Key": getApiKey() } });
    const data = await res.json();
    const capital = data[0].capital;
    return capital;
  } catch (e) {
    throw e;
  }
};
