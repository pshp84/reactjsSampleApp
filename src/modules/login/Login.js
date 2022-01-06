import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';

import { AppContext } from '../../AppContext';

import './Login.css';

const LoginPage = () => {
    const [authObj, setAuthObj] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [invalidemail, setInvalidemail] = useState(false);
    const [redirectVar, setRedirectVar] = useState(false);

    const { setUserData } = useContext(AppContext);

    const setDataForAuth = (value, name) => {
        if (name === 'email') {
            let re = /[^@]+@[^@]+\.[^@]+/;
            if (re.test(value)) {
                authObj[name] = value;
                setAuthObj({ ...authObj });
                setInvalidemail(false);
            } else {
                authObj[name] = value;
                setAuthObj({ ...authObj });
                setInvalidemail(true);
            }
        } else {
            authObj[name] = value;
            setAuthObj({ ...authObj });
        }
    }

    const submit = () => {
        setSubmitted(true);
        if (!authObj.password || !authObj.email || invalidemail) {
            return;
        } else {
            setSubmitted(false);
            sessionStorage.setItem('authUser', JSON.stringify(authObj));
            setUserData({type: 'login'});
            setRedirectVar(true);
        }

    }

    if (redirectVar || JSON.parse(sessionStorage.getItem('authUser'))) {
        return (<Redirect to={`/${'Hi Marcus'}`} replace />);
    }

    return (
        <div className="signinWrapper">
            <div className="loginPage">
                <div className="loginLbl">Sign In</div>
                <div className="spacing">
                    <div className="inputLable">
                        <label>Email</label>
                    </div>
                    <input
                        onChange={e => setDataForAuth(e.target.value, "email")}
                        autoComplete="off"
                        className="input"
                        placeholder="Enter email"
                        value={authObj.email ? authObj.email : ""}
                    />
                    {invalidemail && (
                        <div className="errorMsg">Enter a valid email</div>
                    )}
                    {submitted && !authObj.email && (
                        <div className="errorMsg">
                            Email is required<sup>*</sup>
                        </div>
                    )}
                </div>

                <div className="spacing">
                    <div className="inputLable">
                        <label>Password</label>
                    </div>
                    <input
                        onChange={e => setDataForAuth(e.target.value, "password")}
                        autoComplete="off"
                        className="input"
                        type="password"
                        placeholder="Enter password"
                        value={authObj.password ? authObj.password : ""}
                    />
                    {submitted && !authObj.password && (
                        <div className="errorMsg">
                            Password is required<sup>*</sup>
                        </div>
                    )}
                </div>

                <div className="spacing">
                    <button className="button" onClick={() => submit()}>
                        Login
              </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;