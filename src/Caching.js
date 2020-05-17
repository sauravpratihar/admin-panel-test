export const addCache = async (key, value) => {
  try {
    const data = {
      timestamp: new Date().getTime(),
      value,
    };
    const cache = await window.localStorage.setItem(key, JSON.stringify(data));
    return cache;
  } catch {
    return null;
  }
};

export const getCache = async (key) => {
  try {
    let cache = await window.localStorage.getItem(key);
    cache = JSON.parse(cache);
    // update cache in every 24 hours
    if (new Date().getTime() - cache.timestamp > 86400) {
      return null;
    }
    return cache.value;
  } catch {
    return null;
  }
};
