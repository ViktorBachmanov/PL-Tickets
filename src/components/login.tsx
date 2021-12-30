import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FireContext } from "../index";
import { RoutesPathes } from "../constants";



function Login() {
    const {auth} = useContext(FireContext);

    let navigate = useNavigate();

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result.user);
                if(result.user)
                    navigate(RoutesPathes.DASHBOARD, { replace: true });
            })
            .catch(error => { 
                console.error('GoogleAuthProvider', error);
                navigate(RoutesPathes.NOT_FOUND, { replace: true });
            });
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