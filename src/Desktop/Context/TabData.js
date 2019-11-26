import React, {useReducer, createContext} from 'react';

export const CTX = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default function TabData (props) {

    const [tabData, dispatch] = useReducer(reducer, props.tabdata);

    console.log(tabData);
    return (
        <CTX.Provider value={tabData}>
            {props.children}
        </CTX.Provider>
    )
}