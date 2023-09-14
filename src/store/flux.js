import { BASE_URL, registerUser, loginUser, getLoanAdvertisements, getBancoOptions, getAccountTypeOptions } from '../api/fundMateApi.js';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            bancoOptions: [],
            accountTypeOptions: [],
            notifications: [],
            loading: false,
            notificationPage: {
                message: null,
                confirmButtonText: null,
                confirmButtonPath: null
            }
        },
        actions: {

            setNotificationPage: (_message, _confirmButtonText, _confirmButtonPath) => {
                const notificationPageTemp = getStore().notificationPage;
                notificationPageTemp.message = _message
                notificationPageTemp.confirmButtonText = _confirmButtonText;
                notificationPageTemp.confirmButtonPath = _confirmButtonPath
                setStore({ notificationPage: notificationPageTemp });
            },

            resetNotificationPage: () => {
                const notificationPageTemp = getStore().notificationPage;
                notificationPageTemp.message = null
                notificationPageTemp.confirmButtonText = null
                notificationPageTemp.confirmButtonPath = null
                setStore({ notificationPage: notificationPageTemp });
            },

            setLoading: (operation) => {
                setStore({ loading: operation })
            },

            setNotificationTrigger: (trigger) => {
                const notificationStore = getStore().notification;
                notificationStore.triggerNotification = trigger;
                setStore(notificationStore);
                getActions().pushNotfication(notificationStore);
            },

            getNotifications: () => {
                return getStore().notifications;
            },

            pushNotfication: (_message, _notificationType) => {
                let today = new Date();
                let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                let updatedNotifications = getActions().getNotifications();
                updatedNotifications.push({ message: _message, notificationType: _notificationType, id: getActions().getNotifications().length, time: currentTime });
                setStore({ notifications: updatedNotifications });
            },

            removeNotification: (id) => {
                const updatedNotifications = getStore().notifications.filter((notification) => notification.id !== id);
                setStore({ notifications: updatedNotifications });
            },

            registerUser: async (form_data) => {
                getActions().setLoading(true);
                const apiResponse = await registerUser(form_data);
                getActions().setLoading(false);
                if (getActions().valiateApiResponse(apiResponse, "Success, registration successful", true)) {
                    return true;
                }

                else {
                    return false;
                }
            },

            logInUser: async (payload) => {
                getActions().setLoading(true);
                const apiResponse = await loginUser(payload);
                getActions().setLoading(false);
                if (getActions().valiateApiResponse(apiResponse, "Success, login successful", true)) {
                    //store the user response in user object
                    apiResponse.access_token = "Bearer " + apiResponse.access_token;
                    setStore({ user: apiResponse });
                    getActions().saveToLocalStorage('access_token', apiResponse.access_token);
                    return true;
                }

                else {
                    return false;
                }
            },

            getLoanAdvertisements: async () => {
                getActions().setLoading(true);
                let access_token_temp = null;

                if (getStore().user){
                    access_token_temp = getStore().user.access_token;
                }

                access_token_temp =  getActions().getLocalStorageItem('access_token');

                if (access_token_temp === null || access_token_temp === undefined){
                    getActions().setLoading(false);
                    getActions().valiateApiResponse("Error", "Require Access Token, please re-login", true)
                    return false;
                }

                const apiResponse = await getLoanAdvertisements(access_token_temp);
                getActions().setLoading(false);

                if (getActions().valiateApiResponse(apiResponse, "Success, fetched loan advertisements successfully", false)) {
                    return apiResponse;
                }

                else {
                    return false;
                }
            },

            getBancoOptions: async () => {
                const apiResponse = await getBancoOptions();
                if (getActions().valiateApiResponse(apiResponse, "Success, bank options fetched from api", false)) {
                    setStore({ bancoOptions: apiResponse });
                    return;
                }
            },

            getAccountTypeOptions: async () => {
                const apiResponse = await getAccountTypeOptions();
                if (getActions().valiateApiResponse(apiResponse, "Success, account options fetched from api", false)) {
                    setStore({ accountTypeOptions: apiResponse });
                    return;
                }
            },

            getLocalStorageItem: (fileName) => {
				return JSON.parse(localStorage.getItem(fileName));
			},

			saveToLocalStorage: (fileName, data) => {
				localStorage.setItem(fileName, JSON.stringify(data));
			},

            valiateApiResponse: (apiResponse, successMessage, showNotification) => {

                if (String(apiResponse).startsWith("Error:")) {
                    if (showNotification) {
                        getActions().pushNotfication(apiResponse, "danger");
                    }
                    return false;
                }

                else {
                    if (showNotification) {
                        getActions().pushNotfication(successMessage, "success");
                    }
                    return true;
                }
            }
        }
    }
}

export default getState;