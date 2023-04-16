import React from "react"
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Navbar() {

    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (
        <nav>
            <span id="navLeft">
                <img id="logo" src="./src/assets/flats.png" height="40px" width="40px"/>
                <h1 id="titleFirstHalf">apartments</h1><h1 id="titleSecondHalf">oakland</h1>
            </span>     
            <span id="navRight">
                <h2 className="navButtons">
                    <Link className="text-white" to={"/search"}>Search</Link>
                </h2>
                <h2 className="navButtons">
                    <Link className="text-white" to={"/browse"}>Browse</Link>
                </h2>
                <h2 className="navButtons">
                    <Link className="text-white" to={"/post"}>Post</Link>
                </h2>
                <h2 className="navButtons">
                    {!cookies.access_token ? (<Link className="text-white" to={"/auth"}>Login/Register</Link>) : <button onClick={logout}>Logout</button>}
                </h2>
            </span>
        </nav>
    )
}