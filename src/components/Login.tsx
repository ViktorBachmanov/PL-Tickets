import React from 'react';
import { connect } from 'react-redux';

import { loginGoogle as loginGoogleAction } from '../features/firebase/firebaseSlice';

/*
interface Props {
    loginGoogle?: typeof loginGoogleAction;
}*/

const mapDispatchToProps = {
    loginGoogle: loginGoogleAction,
};

function Login(props: any) {

    return (
        <div className='screen-bounds'>
            <div className='login-dialog'>
                <button type="button" onClick={props.loginGoogle}>Log in</button>
            </div>
        </div>
    )
}


export default connect(null, mapDispatchToProps)(Login);