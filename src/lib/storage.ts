// use local storage
const get = (key: string) => {
    const storage = window.localStorage;
    // if expired then delete and return null
    const savedData = storage.getItem(key);
    if (!savedData) {
        return null;
    }
    try {
        const data = JSON.parse(savedData);
        if (data.ttl && data.ttl < (Date.now() / 1000)) {
            storage.removeItem(key);
            return null;
        }
        return data.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * store data in local storage with ttl
 * @param key 
 * @param ttl 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const set = (key: string, data: any, ttl: number | undefined) => {
    // store data in local storage with ttl
    const storage = window.localStorage;
    const savedData = {
        data,
        ttl
    };
    try {
        storage.setItem(key, JSON.stringify(savedData));
    } catch (e) {
        console.error(e);
    }
}

const del = (key: string) => {
    const storage = window.localStorage;
    storage.removeItem(key);
}

const storage = {
    get,
    set,
    del
};
export default storage;