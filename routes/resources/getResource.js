const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports.getResource = {
  method: "GET",
  url: "/resources/:id",
  handler: async (request, reply) => {
    try {
      const resource = await resourceRepository.read(request.params.id);
      reply.send(resource);
    } catch (error) {
      reply.code(404).send({ error: "Resource not found" });
    }
  },
};
