export function getRoot(request, reply) {
    return reply.view("index", { title: "Homepage"});
}
  