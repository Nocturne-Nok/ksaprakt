const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports.createResource = {
  method: "POST",
  url: "/resources",
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
    const resource = await resourceRepository.create(request.body);
    reply.code(201).send(resource);
  },
};
