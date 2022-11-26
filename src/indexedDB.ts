import { Easel } from "./types";
import { encodePatch } from "./util";

const PATCH_DB_NAME = "PATCH_DB";
let _db: IDBDatabase;
let openPromise: Promise<IDBDatabase>;

export interface SavedPatch {
    name: string;
    patch: string;
    createdTime: number;
    lastSavedTime: number;

    // id is populated by the db
    id?: number;
    preview?: string;
}

async function initDBAsync() {
    if (_db) return _db;

    if (!openPromise) {
        openPromise = new Promise((resolve, reject) => {

            const request = indexedDB.open(PATCH_DB_NAME, 2);
        
            request.onerror = event => {
                reject();
            };
        
            request.onupgradeneeded = event => {
                const db = request.result;
                const objectStore = db.createObjectStore(
                    "patches", 
                    {
                        autoIncrement: true,
                        keyPath: "id"
                    }
                );
                objectStore.createIndex("name", "name", { unique: false });
                objectStore.createIndex("patch", "patch", { unique: false });
                objectStore.createIndex("preview", "preview", { unique: false });
                objectStore.createIndex("createdTime", "createdTime", { unique: false });
                objectStore.createIndex("lastSavedTime", "lastSavedTime", { unique: false });
            };
        
            request.onsuccess = event => {
                _db = request.result;
                resolve(_db);
            }
        });
    }
    
    return openPromise;
}

async function lookupEntryAsync(id: number): Promise<SavedPatch | undefined> {
    const db = await initDBAsync();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["patches"]);
        const objectStore = transaction.objectStore("patches");
        const request = objectStore.get(id) as IDBRequest<SavedPatch>;
        request.onerror = event => {
            reject();
        };
        request.onsuccess = event => {
            resolve(request.result);
        };
    })
}

async function addEntryAsync(entry: SavedPatch): Promise<SavedPatch> {
    const db = await initDBAsync();

    return new Promise<SavedPatch>((resolve, reject) => {
        const transaction = db.transaction(["patches"]);
        const objectStore = transaction.objectStore("patches");
        const request = objectStore.add(entry);
        request.onerror = event => {
            reject();
        };
        request.onsuccess = event => {
            resolve({
                ...entry,
                id: request.result as number
            })
            request.result
        };
    })
}

async function updateEntryAsync(entry: SavedPatch): Promise<SavedPatch> {
    const db = await initDBAsync();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["patches"]);
        const objectStore = transaction.objectStore("patches");
        const toStore = {
            ...entry,
            lastSavedTime: Date.now()
        };
        const request = objectStore.put(toStore);
        request.onerror = event => {
            reject();
        };
        request.onsuccess = event => {
            resolve({
                ...toStore,
                id: request.result as number
            });
        };
    })
}

async function listEntriesAsync(): Promise<SavedPatch[]> {
    const db = await initDBAsync();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["patches"]);
        const objectStore = transaction.objectStore("patches");
        const request = objectStore.openCursor();

        const allEntries: SavedPatch[] = [];

        request.onerror = event => {
            reject();
        }

        request.onsuccess = event => {
            const cursor = request.result;

            if (cursor) {
                allEntries.push(cursor.value)
            }
            else {
                resolve(allEntries);
            }
        }
    })
} 

export async function savePatchAsync(name: string, patch: Easel, preview?: string) {
    const entry = {
        name,
        patch: encodePatch(patch),
        preview,
        createdTime: Date.now(),
        lastSavedTime: Date.now()
    };

    return await addEntryAsync(entry);
}

export async function updatePatchAsync(entry: SavedPatch) {
    return await updateEntryAsync(entry);
}

export async function getPatchAsync(id: number): Promise<SavedPatch | undefined> {
    return await lookupEntryAsync(id);
}

export async function allPatchesAsync(): Promise<SavedPatch[]> {
    return await listEntriesAsync();
}