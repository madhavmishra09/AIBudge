import {useState} from "react";
export default function SignUp(){
    const [formData,setFormData]=useState({
        fname:"",
        lname:"",
        mname:"",
        email:"",
        password:"",
        password2:""
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
        console.log("Signup Data:", formData)
    };
    return(<>
        <div className="font-roboto">
                <form onSubmit={handleSubmit}>
                    <h2>Create Your Account</h2>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" name="fname" id="fname" placeholder="Enter Your First Name" value={formData.fname} onChange={handleChange} required />
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="mname" id="mname" placeholder="Enter Your Middle Name" value={formData.mname} onChange={handleChange} />
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="lname" id="lname" placeholder="Enter Your Last Name" value={formData.lname} onChange={handleChange} required />
                    <label htmlFor="emailID">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" id="password2" placeholder="Confirm Your Password" value={formData.password2} onChange={handleChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
    </>)
}