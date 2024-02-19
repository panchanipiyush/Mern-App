import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = React.createContext();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationtoken = `Bearer ${token}`

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem('token', serverToken)
    }

    let isLoggedin = !!token;
    // console.log("isLoggedIN ",isLoggedin);
    // tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    // jwt authentication to get currently loggedin user data
    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:9000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationtoken,
                },
            })
            if (response.ok) {
                const data = await response.json();
                // console.log("user data :", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            } else {
                console.log("Error fatching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fatching user data");
        }
    }

    // to fatch the srivices data from yhe databse
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/data/service", {
                method: "GET",
            })
            if (response.ok) {
                const data = await response.json();
                // console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`server fronted error: ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    }, []);



    return <AuthContext.Provider 
    value={{ 
        isLoggedin, 
        storeTokenInLS, 
        LogoutUser, 
        user, 
        services, 
        authorizationtoken,
        isLoading,
         }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
    // const authContextValue = useContext(AuthContext);
    // if(!authContextValue){
    //     throw new Error("useAuth used outside of the Provider")
    // }
}