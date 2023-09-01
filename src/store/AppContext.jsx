import { createContext, useEffect, useState } from "react";
import getState from "./flux";


export const Context = createContext()

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updateStore => setState({
                store: Objec.assign(state.store, updateStore),
                actions: { ...state.actions }
            })
        }))

        useEffect(() => {
            // here execute functions when load webpage 
        }, [])


        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        )
    }

    return StoreWrapper;
}

export default injectContext;