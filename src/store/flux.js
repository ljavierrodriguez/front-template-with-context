import { BASE_URL, registerUser, loginUser, getUser, updateProfilePicture, getLoanAdvertisements, getLoanAdvertisement, postLoanOffer, getBancoOptions, getAccountTypeOptions, getPaymentFrequencyTypesOptions } from '../api/fundMateApi.js';
import Cookies from 'js-cookie';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            loanAdvertisement: null,
            loanAdvertisements: null,
            latestLoanOffer: null,
            bancoOptions: [],
            accountTypeOptions: [],
            paymentFrequencyTypeOptions: [],
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

                    Cookies.set('sessionToken', apiResponse.access_token, { secure: true, expires: 1 })
                    Cookies.set('userID', apiResponse.user.userID);
                    getActions().saveToSessionStorage('user', apiResponse)
                    return true;
                }

                else {
                    return false;
                }
            },

            getUser: async () => {
                getActions().setLoading(true);
                if (!Cookies.get('userID') || !getActions().hasAccessToken()) {
                    getActions().setLoading(false);
                    getActions().valiateApiResponse("Error: Failed to get user", "", true);
                    return false;
                }

                const apiResponse = await getUser(getStore().user.access_token, Cookies.get('userID'));
                getActions().setLoading(false);

                if (getActions().valiateApiResponse(apiResponse, "Success, got user", false)) {
                    getActions().saveToSessionStorage('user', apiResponse)
                    setStore({ user: { ...getStore().user, user: apiResponse } });
                    return true;
                }

                else {
                    return false;
                }
            },

            updateProfilePicture: async (form_data) => {
                getActions().setLoading(true);
                if (!Cookies.get('userID') || !getActions().hasAccessToken()) {
                    getActions().setLoading(false);
                    getActions().valiateApiResponse("Error: Failed to get user", "", true);
                    return false;
                }

                const apiResponse = await updateProfilePicture(getStore().user.access_token, Cookies.get('userID'), form_data);
                getActions().setLoading(false);

                if (getActions().valiateApiResponse(apiResponse, "Success, updated profile picture", true)) {
                    return await getActions().getUser();
                }

                else {
                    return false;
                }
            },

            getLoanAdvertisements: async () => {
                getActions().setLoading(true);

                if (!getActions().hasAccessToken()) {
                    return false;
                }

                const apiResponse = await getLoanAdvertisements(getStore().user.access_token);
                getActions().setLoading(false);

                if (getActions().valiateApiResponse(apiResponse, "Success, fetched loan advertisements successfully", false)) {
                    setStore({loanAdvertisements: apiResponse})
                    return true;
                }

                else {
                    return false;
                }
            },

            getLoanAdvertisement: async (loan_advertisement_id) => {
                getActions().setLoading(true);

                if (!getActions().hasAccessToken()) {
                    getActions().setLoading(false);
                    return false;
                }

                const apiResponse = await getLoanAdvertisement(getStore().user.access_token, loan_advertisement_id);
                getActions().setLoading(false);

                if (getActions().valiateApiResponse(apiResponse, "Success, fetched loan advertisement successfully", false)) {
                    setStore({loanAdvertisement: apiResponse})
                    return true;
                }

                else {
                    return false;
                }
            },

            postLoanOffer: async (payload) => {
                getActions().setLoading(true);

                if (!getActions().hasAccessToken() || !getActions().getSessionStorage('user').user.debtor.debtorID) {
                    getActions().setLoading(false);
                    getActions().valiateApiResponse("Error: Failed to post proposal", "", true)
                    return false;
                }

                // get the debtor ID
                const debtorID = getActions().getSessionStorage('user').user.debtor.debtorID;

                const apiResponse = await postLoanOffer(getStore().user.access_token, payload, debtorID);
                getActions().setLoading(false);

                if (getActions().valiateApiResponse(apiResponse, "Success, posted loan proposal", true)) {
                    setStore({latestLoanOffer: apiResponse})
                    return true;
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

            getPaymentFrequencyTypesOptions: async () => {
                const apiResponse = await getPaymentFrequencyTypesOptions();
                if (getActions().valiateApiResponse(apiResponse, "Success, payment frequency options fetched from api", false)) {
                    setStore({ paymentFrequencyTypeOptions: apiResponse });
                    return;
                }
            },

            getSessionStorage: (filename) => {
                return JSON.parse(sessionStorage.getItem(filename));
            },

            saveToSessionStorage: (filename, data) => {
                sessionStorage.setItem(filename, JSON.stringify(data));
            },

            getLocalStorageItem: (fileName) => {
                return JSON.parse(localStorage.getItem(fileName));
            },

            saveToLocalStorage: (fileName, data) => {
                localStorage.setItem(fileName, JSON.stringify(data));
            },

            hasAccessToken: () => {
                // Check if the user object exists and has an 'access_token' property
                if (getStore().user && getStore().user.access_token) {
                    return true;
                }

                else {
                    // Access token not found in the user object, check cookies
                    const storedAccessToken = Cookies.get('sessionToken');

                    if (storedAccessToken) {
                        // Access token found in local storage, update the user object
                        setStore({ user: { ...getStore().user, access_token: storedAccessToken } });
                        return true;
                    }

                    else {
                        // Neither user object nor local storage contains an access token
                        return false;
                    }
                }
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