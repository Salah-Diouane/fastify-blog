import { getRoot } from "../controllers/root.controller.js";
import { getNewPost, createPost } from "../controllers/createPost.controller.js";
import { getPost } from "../controllers/getPost.controller.js";
import { getEditPost, editPost } from "../controllers/editPost.controller.js";
import { deletePost } from "../controllers/deletePost.controller.js";
import errorHandler from "../middleware/error.js";

export default async function routes(fastify, options) {
  fastify.get("/", getRoot);

  fastify.register(
    async function (postRoutes){
      postRoutes.get("/new", getNewPost)
      postRoutes.post("/", createPost)
      postRoutes.get("/:slug", getPost)
      postRoutes.get("/:slug/edit", getEditPost)
      postRoutes.post("/:slug/edit", editPost)
      postRoutes.post("/:slug/delete", deletePost)
    },
    { prefix: "/post"}
  );
  fastify.setErrorHandler(errorHandler);

}


// fastify.register(async function (instance) {
//   // instance is a new scoped fastify instance
// }, options)
// // Instead of this
// fastify.get("/post/new", handler1)
// fastify.post("/post", handler2)

// // You do this
// fastify.register(async function (postRoutes) {
//   postRoutes.get("/new", handler1)
//   postRoutes.post("/", handler2)
// }, { prefix: "/post" })
