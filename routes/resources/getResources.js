const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports.getResources = {
  method: "GET",
  url: "/resources",
  handler: async (request, reply) => {
    const resources = await resourceRepository.read();
    reply.send(resources);
  },
};
