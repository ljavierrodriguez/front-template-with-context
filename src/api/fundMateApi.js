export const BASE_URL = "https://fundmate.onrender.com/"

const sendAPI = async (method, contentType, authHeader, body, addToUri) => {

    try {

        let url = BASE_URL;

        if (addToUri) {
            url = BASE_URL + addToUri;
        }

        const headers = {};

        if (contentType !== null) {
          headers["Content-Type"] = contentType;
        }
        
        if (authHeader) {
          headers["Authorization"] = authHeader;
        }
        
        const fetchOptions = {
          method: method,
          headers: headers,
        };

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
            const errorResponseData = await response.json();
            const errorMessage = JSON.stringify(errorResponseData);
            return (`Error: Request failed with status: ${response.status}. ${errorMessage}`);
        }

        const responseData = await response.json();
        return responseData;
    }

    catch (error) {
        return (`Error: ${error.message}`);
    }
}

export const registerUser = async (form_data) => {
    return sendAPI("POST", null, null, form_data, "user/register");
}

export const loginUser = async (payload) => {
    return sendAPI("POST", "application/json", null, payload, "user/login");
}

export const getUser = async (authHeader, user_id) => {
    return sendAPI("GET", "application/json", authHeader, null, "user/" + user_id)
}

export const updateProfilePicture = async (authHeader, user_id, form_data) => {
    return sendAPI("PUT", null, authHeader, form_data, "user/" + user_id + "/profile-picture")
}

export const getLoanAdvertisements = async (authHeader) => {
    return sendAPI("GET", "application/json", authHeader, null, "loans/loan-advertisements");
}

export const getLoanAdvertisement = async(authHeader, loanAdvertisementID) => {
    return sendAPI("GET", "application/json", authHeader, null, "loans/loan-advertisements/" + loanAdvertisementID)
}

export const postLoanOffer = async(authHeader, payload, debtorID) => {
    return sendAPI("POST", "application/json", authHeader, payload, "debtor/" + debtorID + "/loan-offer")
}

export const getBancoOptions = async () => {
    return sendAPI("GET", "application/json", null, null, "admin/bank");
}

export const getAccountTypeOptions = async () => {
    return sendAPI("GET", "application/json", null, null, "admin/account-type");
}

export const getPaymentFrequencyTypesOptions = async () => {
    return sendAPI("GET", "application/json", null, null, "admin/payment-frequencies");
}