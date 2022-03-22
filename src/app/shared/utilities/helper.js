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


export const loginValidate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 8) {
      errors.username = "Must be 8 characters or less";
    }
  
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length > 8) {
      errors.password = "Must be 8 characters or less";
    }
  
    return errors;
}

export const registerValidate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 8) {
      errors.username = "Must be 8 characters or less";
    }
  
    if (!values.displayName) {
      errors.displayName = "Required";
    } else if (values.displayName.length > 8) {
      errors.displayName = "Must be 8 characters or less";
    }
  
    if (!values.password1) {
      errors.password1 = "Required";
    } else if (values.password1.length > 8) {
      errors.password1 = "Must be 8 characters or less";
    }

    if (!values.password2) {
      errors.password2 = "Required";
    } else if (values.password2.length > 8) {
      errors.password2 = "Must be 8 characters or less";
    }

    if (values.password1 !== values.password2) {
      errors.password2 = "Password not matched";
    }
  
    return errors;
}