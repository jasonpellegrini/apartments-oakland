import React from "react"
import './login.css'
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-md-4 col-md-4">
                    <h2 className="text-black">Login</h2>
                    <div className="col-md-12">
                        <form action="">
                            <div className="form-group">
                                <label className="text-md-left" for="">Username</label>
                                <input type="text" className="form-control" />  
                            </div>
                            <div className="form-group">
                                <label className="text-left" for="">Password</label>
                                <input type="password" className="form-control" />    
                            </div>
                            <button id="login-submit-btn" type="submit" className="btn btn-primary">
                                <Link className="text-white" to={"/home"}>Login</Link>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            
    )
}