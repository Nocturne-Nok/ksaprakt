const {
  mongoDBAdapter: { $db, asObjectId },
} = require("./../adapters/mongodb");

/**
 * @description
 */
class ReceiptRepository {
  /** @type {import('mongodb').Db} */
  #db;

  /** @type {import('mongodb').Collection} */
  #collection;

  constructor() {
    this.#db = $db;
    this.#collection = $db.collection("receipts");
  }

  /**
   * @param {object} data
   */
  async create(data) {
    const { items } = data;

    const newReceipt = {
      items,
      createdAt: new Date(),
    };

    const result = await this.#collection.insertOne(newReceipt);

    return result.insertedId;
  }

  /**
   * @param {string} [id]
   * @returns {Promise<object | object[]>}
   */
  async findById(id) {
    const receipt = await this.#collection.findOne({ _id: asObjectId(id) });

    if (!receipt) {
      throw new Error("Receipt not found");
    }

    return receipt;
  }
}

module.exports.receiptRepository = new ReceiptRepository();
