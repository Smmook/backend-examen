import getApiKey from "./getApiKey.ts";

export default async (capital: string) => {
  const url = `https://api.api-ninjas.com/v1/worldtime?city=${capital}`;
  try {
    const res = await fetch(url, {headers: {"X-Api-Key": getApiKey()}});
    const data = await res.json();
    const time = `${data.hour}:${data.minute}`;
    return time;
  } catch (e) {
    throw e;
  }
}