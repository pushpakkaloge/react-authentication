import React, { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(id)=>{},
    logout:()=>{
    }
})


export const AuthContextProvider=(props)=>{

    const currentToken = localStorage.getItem('tokenValue');

    const [token,setToken] = useState(currentToken);
    const userIsLoggedIn= !!token;

    const loginHandler=(token)=>{
        localStorage.setItem('tokenValue',token);
        setToken(token);
    } 

    const logoutHandler=()=>{
        localStorage.removeItem('tokenValue');
        setToken(null);
    }


    const contextValue={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;


