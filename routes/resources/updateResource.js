const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports.updateResource = {
  method: "PUT",
  url: "/resources/:id",
  schema: {
    body: {
      type: "object",
      required: ["name", "type", "quantity", "price"],
      properties: {
        name: { type: "string" },
        type: { type: "string" },
        quantity: { type: "number" },
        price: { type: "number" },
      },
    },
  },
  handler: async (request, reply) => {
    try {
      const resource = await resourceRepository.update(request.params.id, request.body);
      reply.send(resource);
    } catch (error) {
      reply.code(404).send({ error: "Resource not found" });
    }
  },
};
