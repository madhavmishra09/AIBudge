import { useState } from "react";
import {Link} from "react-router-dom";
export default function Login(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange=(e)=>{
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Login Data:", formData)
    };
    return(
        <>
            <div className="font-roboto">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label htmlFor="emailID">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}