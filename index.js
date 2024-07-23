class Inventory {
  constructor(inventory = [], limit = 8) {
    inventory ??= [];
    this.limit = limit;
    this.inv = this.sanitize(JSON.parse(JSON.stringify(inventory)));
    this.inv = new Proxy(this.inv, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        if (target.length >= target.limit && !isNaN(parseInt(prop))) {
          const err = new Error(
            `Inventory is full (${target.length}/${target.limit})`,
          );
          err.name = "InventoryFullError";
          err.code = "ERR_INVENTORY_FULL";
          throw err;
        } else {
          target[prop] = value;
        }
        return true;
      },
    });
  }
  sanitize(inv = this.inv) {
    if (!Array.isArray(inv)) {
      throw new Error("Inventory must be an array.");
    }
    let result = inv.slice(0, this.limit).map((item, index) => {
      const {
        name = "Unknown Item",
        key = "",
        flavorText = "Mysteriously not known to anyone.",
        icon = "❓",
        type = "generic",
        cannotToss = false,
        sellPrice = 0,
      } = item;
      if (!key) {
        return;
      }
      let result = {
        ...item,
        name: String(name),
        key: String(key),
        flavorText: String(flavorText),
        icon: String(icon),
        type: String(type),
        index: Number(index),
        sellPrice: parseInt(sellPrice),
        cannotToss: !!cannotToss,
      };
      if (type === "food") {
        result.heal ??= 0;
        result.heal = parseInt(result.heal);
      }
      if (type === "weapon") {
        result.atk ??= 0;
        result.def ??= 0;
        result.atk = parseFloat(result.atk);
        result.def = parseFloat(result.def);
      } else if (result.atk) {
        delete result.atk;
      }
      if (type === "armor") {
        result.def ??= 0;
        result.def = parseFloat(result.def);
      } else if (type !== "weapon" && result.def) {
        delete result.def;
      }
      return result;
    });
    return result.filter(Boolean);
  }
  getOne(key) {
    return this.inv.find((item) => item.key === key);
  }
  get(key) {
    return this.inv.filter((item) => item.key === key);
  }
  getAll() {
    return this.inv;
  }
  deleteRef(item) {
    const index = this.inv.indexOf(item);
    if (index !== -1) {
      this.inv = this.inv.filter((_, ind) => ind !== index);
    }
  }
  deleteRefs(items) {
    for (const item of items) {
      this.deleteRef(item);
    }
  }
  findKey(callback) {
    const result = this.inv.find((item) => callback(item));
    if (result) {
      return result.key;
    } else {
      return null;
    }
  }
  size() {
    return this.inv.length;
  }
  clone() {
    return new Inventory(this.inv);
  }
  toJSON() {
    return this.inv;
  }
  deleteOne(key) {
    const index = this.inv.findIndex((item) => item.key === key);
    if (index === -1) {
      return false;
    }
    this.inv = this.inv.filter((_, i) => i !== index);
  }
  delete(key) {
    this.inv = this.inv.filter((item) => item.key !== key);
  }
  has(key) {
    return this.inv.some((item) => item.key === key);
  }
  hasAmount(key, amount) {
    const length = this.getAmount(key);
    return length >= amount;
  }
  getAmount(key) {
    return this.get(key).length;
  }
  addOne(item) {
    return this.inv.push(item);
  }
  add(item) {
    return this.inv.push(...item);
  }
  toss(key, amount) {
    if (amount === "all") {
      const i = this.getAmount(key);
      this.delete(key);
      return i;
    }
    let r = 0;
    for (let i = 0; i < amount; i++) {
      if (!this.has(key)) {
        break;
      }
      this.deleteOne(key);
      r++;
    }
    return r;
  }
  setAmount(key, amount) {
    const data = this.get(key);
    for (let i = 0; i < amount; i++) {
      this.addOne(data[i]);
    }
  }
  *[Symbol.iterator]() {
    yield* this.inv;
  }
  *keys() {
    yield* this.inv.map((item) => item.key);
  }
}
class Collectibles {
  #collectibles;
  constructor(collectibles = []) {
    this.#collectibles = this.sanitize(collectibles);
  }

  get collectibles() {
    return this.#collectibles;
  }

  sanitize(c = this.#collectibles) {
    const collectibleMap = new Map();

    for (let i = c.length - 1; i >= 0; i--) {
      const collectible = c[i];
      if (!collectible.metadata) continue;

      let {
        key,
        name = "Unknown Collectible",
        icon = "❓",
        type = "generic",
        limit = undefined,
      } = collectible.metadata;

      if (!key) continue;

      if (collectibleMap.has(key)) {
        collectibleMap.get(key).amount += collectible.amount;
      } else {
        collectibleMap.set(key, {
          metadata: { key, name, icon, type, limit },
          amount: collectible.amount,
        });
      }
    }

    return Array.from(collectibleMap.values());
  }
  register(key, metadata) {
    let index = this.#collectibles.findIndex((c) => c?.metadata.key === key);
    if (index === -1) {
      this.#collectibles.push({ metadata, amount: 0 });
      index = this.#collectibles.length - 1;
    } else {
      this.#collectibles[index].metadata = metadata;
    }
    this.#collectibles = this.sanitize(this.#collectibles);
    this.combineDuplicates();
    return index;
  }

  combineDuplicates() {
    const collectibleMap = new Map();
    for (const collectible of this.#collectibles) {
      const key = collectible.metadata.key;
      const amount = collectible.amount;
      if (collectibleMap.has(key)) {
        collectibleMap.get(key).amount += amount;
      } else {
        collectibleMap.set(key, { ...collectible });
      }
    }
    this.#collectibles = Array.from(collectibleMap.values());
  }

  raiseOne(key) {
    return this.raise(key, 1);
  }

  getAll() {
    return this.collectibles;
  }

  toJSON() {
    return this.getAll();
  }

  *[Symbol.iterator]() {
    yield* this.collectibles;
  }

  *keys() {
    yield* this.collectibles.map((c) => c.metadata.key);
  }

  raise(key, amount = 0) {
    this.validate(key);
    if (isNaN(amount)) {
      throw new Error("Amount must be a number.");
    }
    const data = this.get(key);
    data.amount = (data.amount ?? 0) + amount;
    if (data.metadata.limit) {
      data.amount = Math.min(data.amount, data.metadata.limit);
    }
    return data.amount;
  }

  get(key) {
    return this.collectibles.find((c) => c?.metadata.key === key);
  }

  set(key, amount) {
    this.validate(key);
    const index = this.#collectibles.findIndex((c) => c?.metadata.key === key);
    if (index !== -1) {
      this.#collectibles[index].amount = amount;
      if (this.#collectibles[index].metadata.limit) {
        this.#collectibles[index].amount = Math.min(
          this.#collectibles[index].amount,
          this.#collectibles[index].metadata.limit,
        );
      }
    }
    return index;
  }

  getAmount(key) {
    return this.get(key)?.amount ?? 0;
  }

  hasAmount(key, amount) {
    return this.getAmount(key) >= (amount ?? 1);
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  atLimit(key) {
    const data = this.get(key);
    return (
      data?.metadata.limit !== undefined && data.amount >= data.metadata.limit
    );
  }

  validate(key) {
    if (!this.get(key)) {
      throw new Error(`Collectible "${key}" is not yet registered.`);
    }
  }

  getMeta(key) {
    return this.get(key)?.metadata;
  }

  remove(key) {
    this.validate(key);
    this.#collectibles = this.#collectibles.filter(
      (c) => c?.metadata.key !== key,
    );
  }

  removeEmpty() {
    for (const key of this.keys()) {
      const amount = this.getAmount(key);
      if (amount === 0) {
        this.remove(key);
      }
    }
    return this.collectibles;
  }

  resetAmount(key) {
    this.validate(key);
    const data = this.get(key);
    if (data) {
      data.amount = 0;
    }
    return data.amount;
  }
}

module.exports = {
  Inventory,
  Collectibles,
}