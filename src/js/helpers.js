import { TIMEOUT_SEC } from './config'
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {

        const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
        if (!resp.ok) throw new Error(`${resp.statusText} ${resp.status}`)
        const data = await resp.json()
        return data;
    } catch (error) {
        throw error;
    }

}


export const getLocalStorage = function () {
    return JSON.parse(localStorage.getItem("bookmarks")) || []
}


export const sendJSON = async function (url,newRecipe) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })
        const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        if (!resp.ok) throw new Error(`${resp.statusText} ${resp.status}`)
        const data = await resp.json()
        return data;
    } catch (error) {
        throw error;
    }

}


