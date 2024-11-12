const { randomUUID } = require("node:crypto");

class ResourceRepository {
  constructor() {
    this.storage = new Map();
  }

  /**
   * @param {ResourceShape} data
   * @returns {Promise<ResourceInstance>}
   */
  async create(data) {
    const id = randomUUID();

    const syncedTimestamp = Date.now();

    this.storage.set(id, {
      id,
      ...data,
      createdAt: syncedTimestamp,
     updatedAt: syncedTimestamp,
    });
    return this.storage.get(id);
  }

  /**
   * @template I
   * @param {I} [id]
   * @returns {Promise< I extends string ? ResourceInstance : ResourceInstance[]>}
   */
  async read(id) {
    if (id && !this.storage.has(id)) {
      throw new Error("Resource not found");
    }
    return id ? this.storage.get(id) : Array.from(this.storage.values());
  }

  /**
   * @param {string} id
   * @param {ResourceShape} data
   * @returns {Promise<ResourceInstance>}
   */
  async update(id, data) {
    if (!this.storage.has(id)) {
      throw new Error("Resource not found");
    }
    delete data.id;

    this.storage.set(id, {
      ...this.storage.get(id),
      ...data,
      updatedAt: Date.now(),
    });
    return this.storage.get(id);
  }

  async delete(id) {
    if (!this.storage.has(id)) {
      throw new Error("Resource not found");
    }
    const resource = this.storage.get(id);

    this.storage.delete(id);

    return resource;
  }
}
module.exports.resourceRepository = new ResourceRepository();

/**
 * @typedef {{
 *  name: string,
 *  type: string,
 *  amount: number,
 *  price: number,
 * }} ResourceShape
 */

/**
 * @typedef { ResourceShape & {
 *  id: string,
 *  createdAt: Date,
 *  updatedAt: Date
 * }} ResourceInstance
 */
