import { RESULT_KEY, SEARCH_KEYWORD } from "./const";

export const setLocalStorageValueByKey = (KEY, value) =>  {
    localStorage.setItem(KEY, JSON.stringify(value));
}

export const getLocalStorageValueByKey = (KEY) =>  {
    return JSON.parse(localStorage.getItem(KEY));
}

export const removeLocalStorageValueByKey = (KEY) =>  {
    localStorage.removeItem(KEY);
}

export const resetResult = () => {
    localStorage.removeItem(RESULT_KEY);
    localStorage.removeItem(SEARCH_KEYWORD);
}