export const doesHaveValue = (value) => {
    if (value === 0 || value.length === 0) {
        return false;
    }
    else {
        return true;
    }
};

export const isValidAlphabets = (value) => {
    var pattern = new RegExp(/^[a-zA-Z ,.@]+$/i);

    if (!pattern.test(value)) {
        return false;
    }
    else {
        return true;
    }
};

export const isValidAlphaNumeric = (value) => {
    var pattern = new RegExp(/^[a-zA-Z0-9 ,.@-]+$/i);

    if (!pattern.test(value)) {
        return false;
    }
    else {
        return true;
    }
};

export const isValidEmail = (value) => {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(value)) {
        return false;
    }
    else {
        return true;
    }
};

export const isDigitsOnly = (value) => {
    var pattern = new RegExp(/^[0-9\b]+$/);

    if (!pattern.test(value)) {
        return false;
    } else {
        return true;
    }
};

export const isValidDecimalOnly = (value) => {
    var pattern = new RegExp(/^\d*\.?\d*$/);

    if (!pattern.test(value)) {
        return false;
    } else {
        return true;
    }
};

export const isValidMobileNumber = (value) => {
    if (value.length !== 10) {
        return false;
    } else {
        return true;
    }
};

export const isValidPassword = (value) => {
    var pattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

    if (!pattern.test(value)) {
        return false;
    } else {
        return true;
    }
};

export const isValidTableRange = (value) => {
    if (parseInt(value) > 0 && parseInt(value) < 51) {
        return true;
    } else {
        return false;
    }
};

export const isValidZipCode = (value) => {
    if (value.length < 5 || value.length > 6) {
        return false;
    } else {
        return true;
    }
};

export const isValidWebsiteUrl = (value) => {
    var pattern= new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i);

    if (!pattern.test(value)) {
        return false;
    }
    else {
        return true;
    }
};

export const isValidPrice = (value) => {
    if (parseInt(value) <= 0) {
        return false;
    } else {
        return true;
    }
};

export const isValidQuantity = (value) => {
    if (parseInt(value) <= 0) {
        return false;
    } else {
        return true;
    }
};

export const isValidDigits = (value) => {
    if (parseInt(value) <= 0) {
        return false;
    } else {
        return true;
    }
};