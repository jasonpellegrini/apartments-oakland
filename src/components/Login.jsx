import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';

export default function Login() {
    return (
        <div>
            <AuthLogin />
            <AuthRegister />
        </div>   
    )
};

const AuthLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            });
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (err){
            console.error(err);
            alert("Username or password incorrect.")
        }
    }

    return (
        <Form
        label="Login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmitHandler = {onSubmit} />
    )
};

const AuthRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            });
            alert("Registration Complete!")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Form
        label="Register"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword} 
        onSubmitHandler = {onSubmit} />
    )
}
const Form = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-md-4 col-md-4">
                    <h2 className="text-black">{props.label}</h2>
                    <div className="col-md-12">
                        <form onSubmit={props.onSubmitHandler} action="">
                            <div className="form-group">
                                <label className="text-md-left" htmlFor="">Username</label>
                                <input type="text" className="form-control" onChange={(event) => props.setUsername(event.target.value)} />  
                            </div>
                            <div className="form-group">
                                <label className="text-left" htmlFor="">Password</label>
                                <input type="password" className="form-control" onChange={(event) => props.setPassword(event.target.value)} />    
                            </div>
                            <button type="submit" className="btn btn-primary">{props.label}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>   
    )
};