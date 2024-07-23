(Lazy ChatGPT-Written documentation goes here because I'm lazy to explain)

### Inventory Class Documentation

#### Constructor
`constructor(inventory: object[], limit: number = 8)`

- **Arguments**:
  - `inventory` (object[]): The initial inventory items. Defaults to an empty array if not provided.
  - `limit` (number): The maximum number of items allowed in the inventory. Defaults to 8.
- **Purpose**: Initializes the inventory with a sanitized copy of the provided items and sets up a Proxy to manage item additions.
- **Return Value**: None (constructor).

#### sanitize(inv: object[]): object[]

- **Arguments**:
  - `inv` (object[]): The inventory items to sanitize. Defaults to the current inventory.
- **Purpose**: Ensures that each inventory item has the required properties and valid data types. Filters out invalid items.
- **Return Value**: An array of sanitized inventory items.

#### getOne(key: string): object | undefined

- **Arguments**:
  - `key` (string): The unique key of the inventory item to retrieve.
- **Purpose**: Finds and returns a single item from the inventory based on its key.
- **Return Value**: The inventory item with the specified key, or `undefined` if not found.

#### get(key: string): object[]

- **Arguments**:
  - `key` (string): The unique key of the inventory items to retrieve.
- **Purpose**: Finds and returns all items from the inventory that match the specified key.
- **Return Value**: An array of inventory items with the specified key.

#### getAll(): object[]

- **Arguments**: None.
- **Purpose**: Retrieves all items currently in the inventory.
- **Return Value**: An array of all inventory items.

#### deleteRef(item: object): void

- **Arguments**:
  - `item` (object): The inventory item to remove.
- **Purpose**: Removes the specified item from the inventory by reference.
- **Return Value**: None.

#### deleteRefs(items: object[]): void

- **Arguments**:
  - `items` (object[]): The inventory items to remove.
- **Purpose**: Removes multiple items from the inventory by reference.
- **Return Value**: None.

#### findKey(callback: function): string | null

- **Arguments**:
  - `callback` (function): A callback function to test each item. Should return `true` for the item to be selected.
- **Purpose**: Finds the key of the first inventory item that matches the criteria defined by the callback function.
- **Return Value**: The key of the matching item, or `null` if no match is found.

#### size(): number

- **Arguments**: None.
- **Purpose**: Returns the number of items currently in the inventory.
- **Return Value**: The number of inventory items.

#### clone(): Inventory

- **Arguments**: None.
- **Purpose**: Creates and returns a new `Inventory` instance that is a copy of the current inventory.
- **Return Value**: A new `Inventory` instance.

#### toJSON(): object[]

- **Arguments**: None.
- **Purpose**: Converts the inventory to a JSON-compatible format.
- **Return Value**: An array of inventory items in JSON format.

#### deleteOne(key: string): boolean

- **Arguments**:
  - `key` (string): The unique key of the inventory item to remove.
- **Purpose**: Removes the first item with the specified key from the inventory.
- **Return Value**: `true` if the item was found and removed, `false` otherwise.

#### delete(key: string): void

- **Arguments**:
  - `key` (string): The unique key of the inventory items to remove.
- **Purpose**: Removes all items with the specified key from the inventory.
- **Return Value**: None.

#### has(key: string): boolean

- **Arguments**:
  - `key` (string): The unique key of the inventory item to check.
- **Purpose**: Checks if there is at least one item with the specified key in the inventory.
- **Return Value**: `true` if at least one item with the specified key exists, `false` otherwise.

#### hasAmount(key: string, amount: number): boolean

- **Arguments**:
  - `key` (string): The unique key of the inventory items to check.
  - `amount` (number): The required amount of items.
- **Purpose**: Checks if there are at least `amount` items with the specified key in the inventory.
- **Return Value**: `true` if the number of items with the specified key is greater than or equal to `amount`, `false` otherwise.

#### getAmount(key: string): number

- **Arguments**:
  - `key` (string): The unique key of the inventory items to count.
- **Purpose**: Returns the number of items with the specified key in the inventory.
- **Return Value**: The number of items with the specified key.

#### addOne(item: object): number

- **Arguments**:
  - `item` (object): The inventory item to add.
- **Purpose**: Adds a single item to the inventory.
- **Return Value**: The new length of the inventory array.

#### add(items: object[]): number

- **Arguments**:
  - `items` (object[]): The inventory items to add.
- **Purpose**: Adds multiple items to the inventory.
- **Return Value**: The new length of the inventory array.

#### toss(key: string, amount: number | string): number

- **Arguments**:
  - `key` (string): The unique key of the inventory items to remove.
  - `amount` (number | string): The number of items to remove or `"all"` to remove all items with the specified key.
- **Purpose**: Removes the specified number of items with the specified key from the inventory.
- **Return Value**: The number of items removed.

#### setAmount(key: string, amount: number): void

- **Arguments**:
  - `key` (string): The unique key of the inventory items to set.
  - `amount` (number): The new amount of items.
- **Purpose**: Sets the number of items with the specified key in the inventory to the specified amount.
- **Return Value**: None.

#### *[Symbol.iterator](): Iterator<object>

- **Arguments**: None.
- **Purpose**: Returns an iterator for the inventory items.
- **Return Value**: An iterator for the inventory items.

#### *keys(): Iterator<string>

- **Arguments**: None.
- **Purpose**: Returns an iterator for the keys of the inventory items.
- **Return Value**: An iterator for the keys of the inventory items.

---

### Collectibles Class Documentation

#### Constructor
`constructor(collectibles: object[] = [])`

- **Arguments**:
  - `collectibles` (object[]): The initial collectible items. Defaults to an empty array if not provided.
- **Purpose**: Initializes the collectibles with a sanitized copy of the provided items.
- **Return Value**: None (constructor).

#### get collectibles(): object[]

- **Arguments**: None.
- **Purpose**: Returns the current list of collectibles.
- **Return Value**: An array of collectible items.

#### sanitize(c: object[]): object[]

- **Arguments**:
  - `c` (object[]): The collectible items to sanitize. Defaults to the current collectibles.
- **Purpose**: Ensures that each collectible item has the required properties and valid data types. Combines duplicates.
- **Return Value**: An array of sanitized collectible items.

#### register(key: string, metadata: object): number

- **Arguments**:
  - `key` (string): The unique key of the collectible to register.
  - `metadata` (object): The metadata for the collectible.
- **Purpose**: Registers a new collectible or updates an existing one.
- **Return Value**: The index of the registered collectible.

#### combineDuplicates(): void

- **Arguments**: None.
- **Purpose**: Combines duplicate collectibles by summing their amounts.
- **Return Value**: None.

#### raiseOne(key: string): number

- **Arguments**:
  - `key` (string): The unique key of the collectible to increment.
- **Purpose**: Increments the amount of the specified collectible by one.
- **Return Value**: The new amount of the collectible.

#### getAll(): object[]

- **Arguments**: None.
- **Purpose**: Retrieves all collectibles currently in the collection.
- **Return Value**: An array of all collectible items.

#### toJSON(): object[]

- **Arguments**: None.
- **Purpose**: Converts the collectibles to a JSON-compatible format.
- **Return Value**: An array of collectible items in JSON format.

#### *[Symbol.iterator](): Iterator<object>

- **Arguments**: None.
- **Purpose**: Returns an iterator for the collectible items.
- **Return Value**: An iterator for the collectible items.

#### *keys(): Iterator<string>

- **Arguments**: None.
- **Purpose**: Returns an iterator for the keys of the collectible items.
- **Return Value**: An iterator for the keys of the collectible items.

#### raise(key: string, amount: number = 0): number

- **Arguments**:
  - `key` (string): The unique key of the collectible to increment.
  - `amount` (number): The amount to increment the collectible by. Defaults to 0.
- **Purpose**: Increments the amount of the specified collectible by the specified amount.
- **Return Value**: The new amount of the collectible.

#### get(key: string): object | undefined

- **Arguments**:
  - `key` (string): The unique key of the collectible to retrieve.
- **Purpose**: Finds and returns the collectible with the specified key.
- **Return Value**: The collectible with the specified key, or `undefined` if not found.

#### set(key: string, amount: number): number

- **Arguments**:
  - `key` (string): The unique key of the collectible to update.
  - `amount` (number): The new amount to set for the collectible.
- **Purpose**: Sets the amount of the specified collectible to the given value.
- **Return Value**: The index of the collectible if found, otherwise `-1`.

#### getAmount(key: string): number

- **Arguments**:
  - `key` (string): The unique key of the collectible to check.
- **Purpose**: Returns the amount of the collectible with the specified key.
- **Return Value**: The amount of the collectible, or `0` if not found.

#### hasAmount(key: string, amount: number): boolean

- **Arguments**:
  - `key` (string): The unique key of the collectible to check.
  - `amount` (number): The required amount to check.
- **Purpose**: Checks if the specified collectible has at least the given amount.
- **Return Value**: `true` if the amount of the collectible is greater than or equal to the specified amount, `false` otherwise.

#### has(key: string): boolean

- **Arguments**:
  - `key` (string): The unique key of the collectible to check.
- **Purpose**: Checks if a collectible with the specified key exists in the collection.
- **Return Value**: `true` if the collectible exists, `false` otherwise.

#### atLimit(key: string): boolean

- **Arguments**:
  - `key` (string): The unique key of the collectible to check.
- **Purpose**: Checks if the amount of the collectible with the specified key has reached its limit.
- **Return Value**: `true` if the amount is at or above the limit, `false` otherwise.

#### validate(key: string): void

- **Arguments**:
  - `key` (string): The unique key of the collectible to validate.
- **Purpose**: Ensures that a collectible with the specified key is registered in the collection.
- **Return Value**: None. Throws an error if the collectible is not registered.

#### getMeta(key: string): object | undefined

- **Arguments**:
  - `key` (string): The unique key of the collectible to retrieve metadata for.
- **Purpose**: Retrieves the metadata for the collectible with the specified key.
- **Return Value**: The metadata of the collectible, or `undefined` if not found.

#### remove(key: string): void

- **Arguments**:
  - `key` (string): The unique key of the collectible to remove.
- **Purpose**: Removes the collectible with the specified key from the collection.
- **Return Value**: None.

#### removeEmpty(): object[]

- **Arguments**: None.
- **Purpose**: Removes all collectibles with a zero amount from the collection.
- **Return Value**: An array of remaining collectibles after removal.

#### resetAmount(key: string): number

- **Arguments**:
  - `key` (string): The unique key of the collectible to reset.
- **Purpose**: Resets the amount of the collectible with the specified key to zero.
- **Return Value**: The new amount of the collectible (which will be `0`).

--- 