import Fastify from "fastify";
import env from "./config/env.js";
// import logger from "./config/logger.js";
import routes from "./routes/routes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastifyStatic from "@fastify/static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

await fastify.register(fastifyView, {
  engine: {
    ejs,
  },
  root: path.join(__dirname, "views"),
  viewExt: "ejs",
  layout: "layout.ejs",
});

await fastify.register(routes);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.listen({ port: env.port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Blog App is running in ${env.nodeEnv} mode at ${address}`);
});
