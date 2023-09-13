export const BASE_URL = "https://fundmate.onrender.com/"

const sendAPI = async (method, contentType, body, addToUri) => {

    try {

        let url = BASE_URL;

        if (addToUri) {
            url = BASE_URL + addToUri;
        }

        let fetchOptions = null

        if (contentType === null) {
            fetchOptions = {
                method: method,
            };
        }

        else {
            fetchOptions = {
                method: method,
                headers: {
                    "Content-Type": contentType
                }
            };
        }

        if (method !== "GET" && body !== undefined && body !== null && !(body instanceof FormData)) {
            console.log('setting body..');
            fetchOptions.body = JSON.stringify(body);
        }

        else if (body instanceof FormData) {
            fetchOptions.body = body;
            for (const [key, value] of fetchOptions.body.entries()) {
                console.log(`Key: ${key}, Value: ${value}`);
            }
        }

        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            return (`Error: Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    }

    catch (error) {
        return (`Error: ${error.message}`);
    }
}

export const registerUser = async (form_data) => {
    return sendAPI("POST", null, form_data, "user/register");
}

export const getBancoOptions = async () => {
    return sendAPI("GET", "application/json", null, "admin/bank");
}

export const getAccountTypeOptions = async () => {
    return sendAPI("GET", "application/json", null, "admin/account-type");
}