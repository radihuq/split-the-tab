import React, {useReducer, createContext} from 'react';

export const CTX = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FEED':
            let newFeed = state.data.feed;
            newFeed.push(action.payload);
        
            return {
                ...state,
                data: {
                    ...state.data,
                    feed: newFeed
                }
            }

        default:
            return state;
    }
}

export default function TabData (props) {

    const [tabDetails, dispatch] = useReducer(reducer, props.tabdata);

    function updateFeed (data) {
        dispatch({type: 'UPDATE_FEED', payload: data});
    }

    // console.log(tabDetails);
    return (
        <CTX.Provider value={{tabDetails, updateFeed}}>
            {props.children}
        </CTX.Provider>
    )
}