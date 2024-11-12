const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports.deleteResource = {
  method: "DELETE",
  url: "/resources/:id",
  handler: async (request, reply) => {
    try {
      const resource = await resourceRepository.delete(request.params.id);
      reply.send(resource);
    } catch (error) {
      reply.code(404).send({ error: "Resource not found" });
    }
  },
};
