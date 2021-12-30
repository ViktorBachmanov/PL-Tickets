import React, { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FireContext } from "../index";



function Login() {
    const {auth} = useContext(FireContext);

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => console.log(result.user))
            .catch(error => console.error('GoogleAuthProvider', error));
    };

    return (
        <div className='login-outer'>
            <div className='login-dialog'>
                <button type="button" onClick={login}>Log in</button>
            </div>
        </div>
    )
}


export default Login;