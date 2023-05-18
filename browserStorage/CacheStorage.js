// 1. cache request
const cacheRequest = async (url, options, requestCallback) => {
    const request = new Request(url, options);
    const cacheOpen = await cache.open('v1');
    let response = await cacheOpen.match(request);
    if (response) {
        return response;
    } else {
        response = await requestCallback();
        cacheOpen.put(request, response.clonse());
    }
}

// 2. filter cache response
const getCache = async (url, filter) => {
    const request = new Request(url);
    const response = await cache.open('v1').match(request)
    return await response.resultData.filter(filter);
}