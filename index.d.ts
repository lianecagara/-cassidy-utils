interface InventoryItem {
  key: string; // Unique identifier for the item
  icon: string; // Visual representation of the item
  name?: string; // Name of the item
  flavorText?: string; // Description or flavor text for the item
  type?: string; // Type of the item (e.g., 'food', 'weapon', 'armor')
  cannotToss?: boolean; // Whether the item cannot be tossed
  sellPrice?: number; // Sell price of the item
  heal?: number; // Healing value for 'food' type items
  atk?: number; // Attack value for 'weapon' type items
  def?: number; // Defense value for 'armor' type items
  [key: string]: any; // Allow extra properties
}

interface Collectible {
  metadata: {
    key: string; // Unique identifier for the collectible
    name?: string; // Name of the collectible
    icon?: string; // Visual representation of the collectible
    type?: string; // Type of the collectible (e.g., 'rare', 'common')
    limit?: number; // Maximum allowed amount for the collectible
    [key: string]: any; // Allow exyra properties
  };
  amount: number; // Amount of the collectible
}

export class Inventory {
  constructor(inventory?: InventoryItem[], limit?: number);

  sanitize(inv?: InventoryItem[]): InventoryItem[];

  getOne(key: string): InventoryItem | undefined;

  get(key: string): InventoryItem[];

  getAll(): InventoryItem[];

  deleteRef(item: InventoryItem): void;

  deleteRefs(items: InventoryItem[]): void;

  findKey(callback: (item: InventoryItem) => boolean): string | null;

  size(): number;

  clone(): Inventory;

  toJSON(): InventoryItem[];

  deleteOne(key: string): boolean;

  delete(key: string): void;

  has(key: string): boolean;

  hasAmount(key: string, amount: number): boolean;

  getAmount(key: string): number;

  addOne(item: InventoryItem): number;

  add(item: InventoryItem[]): number;

  toss(key: string, amount: number | "all"): number;

  setAmount(key: string, amount: number): void;

  [Symbol.iterator](): Iterator<InventoryItem>;

  keys(): Iterator<string>;
}

export class Collectibles {
  constructor(collectibles?: Collectible[]);

  readonly collectibles: Collectible[];

  sanitize(c?: Collectible[]): Collectible[];

  register(
    key: string,
    metadata: {
      key: string;
      name?: string;
      icon?: string;
      type?: string;
      limit?: number;
    },
  ): number;

  combineDuplicates(): void;

  raiseOne(key: string): number;

  getAll(): Collectible[];

  toJSON(): Collectible[];

  [Symbol.iterator](): Iterator<Collectible>;

  keys(): Iterator<string>;

  raise(key: string, amount?: number): number;

  get(key: string): Collectible | undefined;

  set(key: string, amount: number): number;

  getAmount(key: string): number;

  hasAmount(key: string, amount: number): boolean;

  has(key: string): boolean;

  atLimit(key: string): boolean;

  validate(key: string): void;

  getMeta(key: string):
    | {
        key: string;
        name?: string;
        icon?: string;
        type?: string;
        limit?: number;
      }
    | undefined;

  remove(key: string): void;

  removeEmpty(): Collectible[];

  resetAmount(key: string): number;
}
