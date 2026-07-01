import Dexie, { type Table } from "dexie";

export interface CachedRow<T = any> {
  id: string | number;
  payload: T;
  updated_at: number;
}

export interface MetaRow {
  key: string;
  value: any;
}

class GoMallCacheDB extends Dexie {
  phones!: Table<CachedRow, string | number>;
  personalCare!: Table<CachedRow, string | number>;
  marketplace!: Table<CachedRow, string | number>;
  meta!: Table<MetaRow, string>;


  constructor() {
    super("gomall-cache");
    this.version(1).stores({
      phones: "id, updated_at",
      personalCare: "id, updated_at",
      marketplace: "id, updated_at",
      meta: "key",
    });
  }
}

export const db = new GoMallCacheDB();

export const setMeta = (key: string, value: any) =>
  db.meta.put({ key, value });

export const getMeta = async <T = any>(key: string): Promise<T | undefined> => {
  const row = await db.meta.get(key);
  return row?.value as T | undefined;
};
