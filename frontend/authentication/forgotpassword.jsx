import { useState } from "react";
export default function ForgotPassword(){
    const [formData,setFormData]=useState({
        email:"",
        password1:"",
        password2:""
    })
    const handleChange=(e)=>{
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
    };
    return<>
        <div className="font-mont flex flex-col items-center justify-center min-h-screen px-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
                <h2 className="font-mont text-2xl text-center p-2 font-bold">Change Your Password</h2>
                <label htmlFor="email" className="font-mont font-bold mb-4 block">Email Address</label>
                <input type="email" name="email" id="email" placeholder="Enter your Email Address" className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" value={formData.email} onChange={handleChange} required />
                <label htmlFor="password1" className="font-mont font-bold mb-4 block">Set Up Your New Password</label>
                <input type="password" name="password1" id="password1" placeholder="Enter Your New Password" className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" value={formData.password1} onChange={handleChange} required />
                <label htmlFor="password2" className="font-mont font-bold mb-4 block">Confirm Your Password</label>
                <input type="password" name="password2" id="password2" placeholder="Confirm Your New Password" className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" value={formData.password2} onChange={handleChange} required />
                <button type="submit" className="font-mont bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-110 mx-auto block">
                    Confirm
                </button>
            </form>
        </div>
    </>
}