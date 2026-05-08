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
        <div className="font-mont flex flex-col items-center justify-center min-h-screen px-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
                    <h2 className="font-mont text-2xl text-center p-2 font-bold">Create Your Account</h2>
                    <label htmlFor="fname" className="font-mont font-bold mb-4 block">First Name</label>
                    <input type="text" name="fname" id="fname" placeholder="Enter Your First Name" value={formData.fname} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 p    x-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
                    <label htmlFor="mname" className="font-mont font-bold mb-4 block">Middle Name</label>
                    <input type="text" name="mname" id="mname" placeholder="Enter Your Middle Name" value={formData.mname} onChange={handleChange} className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
                    <label htmlFor="lname" className="font-mont font-bold mb-4 block">Last Name</label>
                    <input type="text" name="lname" id="lname" placeholder="Enter Your Last Name" value={formData.lname} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
                    <label htmlFor="emailID" className="font-mont font-bold mb-4 block">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
                    <label htmlFor="password" className="font-mont font-bold mb-4 block">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
                    <label htmlFor="password2" className="font-mont font-bold mb-4 block">Confirm Password</label>
                    <input type="password" name="password2" id="password2" placeholder="Confirm Your Password" value={formData.password2} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
                    <button type="submit" className="font-mont bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-110 mx-auto block">
                        Sign Up
                    </button>
                </form>
            </div>
    </>)
}