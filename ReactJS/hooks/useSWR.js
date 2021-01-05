import fetch from "node-fetch";

export default async function useSWR(id, url, opts = {}, cacheName = "app_cache") {
	if (typeof window === "undefined") {
		return fetch(url, opts);
	}
	return new Promise(((resolve) => {
		const isCacheSupported = "caches" in window;
		if (isCacheSupported) {
			caches.open(cacheName).then((cache) => {
				cache.match(id).then((data) => {
					if (data) {
						fetch(url, opts).then((res) => {
							cache.put(id, res);
						});
						resolve(data);
					} else {
						fetch(url, opts).then((res) => {
							cache.put(id, res).then(() => {
								cache.match(id).then((_data) => resolve(_data));
							});
						});
					}
				});
			});
		}
	}));
}

export function setDataToCache(id, data, cacheName = "app_cache") {
	const isCacheSupported = typeof window !== "undefined" && "caches" in window;
	if (isCacheSupported) {
		caches.open(cacheName).then((cache) => {
			const response = new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Response-Type": "cors",
				},
			});
			cache.put(id, response);
		});
	}
}
