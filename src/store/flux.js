import { BASE_URL, getBancoOptions, getAccountTypeOptions } from '../api/fundMateApi.js';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            bancoOptions: [],
            accountTypeOptions: [],
        },
        actions: {
            greetings: () => {
                const store = getStore();
                console.log(store.name)
            },

            getBancoOptions: async () => {
                const apiResponse = await getBancoOptions();
                if (getActions().valiateApiResponse(apiResponse, "Success, bank options fetched from api")) {
                    setStore({ bancoOptions: apiResponse });
                    return;
                }
            },
            
            getAccountTypeOptions: async () => {
                const apiResponse = await getAccountTypeOptions();
                if (getActions().valiateApiResponse(apiResponse, "Success, bank options fetched from api")) {
                    setStore({ accountTypeOptions: apiResponse });
                    return;
                }
            },

            valiateApiResponse: (apiResponse, successMessage) => {
				if (String(apiResponse).startsWith("Error:")) {
					//getActions().pushNotfication(apiResponse, "danger");
					return false;
				}

				else {
					//getActions().pushNotfication(successMessage, "success");
					return true;
				}
			}
        }
    }
}

export default getState;