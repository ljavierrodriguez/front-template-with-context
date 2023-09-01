const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            name: 'John Doe'
        },
        actions: {
            greetings: () => {
                const store = getStore();
                console.log(store.name)
            }
        }
    }
}

export default getState;