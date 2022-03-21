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

export const distanceFormat = (value) => {
    return `${(Math.round(value * 100) / 100).toFixed(2)}`;
}

export const translateBusinessStatus = (value) => {
    switch (value) {
        case "OPERATIONAL": return "เปิดให้บริการ";
        case "CLOSED_TEMPORARILY": return "ปิดให้บริการชั่วคราว";
        default: return value;
    }
}   