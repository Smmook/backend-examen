export default () => {
  const apiKey = Deno.env.get("NINJA");
  if (!apiKey) {
    console.error("Api key not provided");
    Deno.exit(1);
  }
  return apiKey;
};
