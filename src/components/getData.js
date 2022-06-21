export function getApiData(url) {
    return fetch(url)
        .then((res) => res.json())
        .catch((e) => console.log(e));
}