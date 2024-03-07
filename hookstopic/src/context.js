import React, { createContext, useContext, useReducer } from "react";
import {reducer} from "./reducer"
const AppContext = createContext();

const AppProvider = ({ children }) => {

    const initialState = {
        name: "",
        Age: "",
    }

    const updateHomePage = () => {
        return dispatch(
            {
                type: "HOME_UPDATE",
                payload: {
                    name: "piyush",
                    Age: "32",
                }
            }
        )
    };

    const updateAboutPage = () => {
        return dispatch({
            type: "ABOUT_UPDATE",
            payload: {
                name: "Bhumi",
                Age: "32",
            }
        })
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    // const biodata = {
    //     fname: "Piyush",
    //     lname: "Panchani",
    //     Age:"32 Year old"
    // };

    // in context api pass value as biodata
    return (<AppContext.Provider value={{ ...state, updateHomePage ,updateAboutPage }}>
        {children}
    </AppContext.Provider>
    )
}
const useGlobaleContext = () => {
    return useContext(AppContext)
};


export { useGlobaleContext, AppContext, AppProvider }