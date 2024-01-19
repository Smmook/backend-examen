import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.ts";
import { Query } from "./resolvers/queries.ts";
import mongoose from "npm:mongoose";
import { Mutation } from "./resolvers/mutations.ts";
import { Contact } from "./resolvers/contact.ts";

const mongoKey = Deno.env.get("MONGO");
if (!mongoKey) {
  console.log("No se ha podido obtener key de mongo");
  Deno.exit(1);
}
console.log("Key obtenida");

mongoose.connect(mongoKey).catch((e) => console.log(e));
console.log("Conectado a mongo");

const resolvers = { Query, Mutation, Contact };

const server = new ApolloServer({ resolvers, typeDefs });

await startStandaloneServer(server, { listen: { port: 8080 } });

console.log("Server running on http://localhost:8080");
