import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../../AppContext';

import "../login/Login.css";

const SecondPage = () => {

    const { setUserData } = useContext(AppContext);
    const [redirectVar, setRedirectVar] = useState(false);

    if (redirectVar) {
        return (<Redirect to={`/`} replace />);
    }
    return (
        <div className="signinWrapper">
            <div style={{ display: "block" }}>
                <h2>Hi Marcus</h2>
                <button className="button" onClick={() => { setRedirectVar(true); setUserData({ type: 'logout' }); }}>
                    Logout
            </button>
            </div>
        </div>
    )
}

export default SecondPage;