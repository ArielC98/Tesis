import React, { useContext } from "react";

export async function loginUser(credentials) {
    console.log(credentials);
    
    return fetch('https://sismds.herokuapp.com/api/login', {
        method: 'POST',
    
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export const AuthContext = React.createContext({loggedIn:false, role:"teacher"})

export function useAuth(){
    
    return useContext(AuthContext);
}