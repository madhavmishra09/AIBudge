import { useState } from "react";
import {Link} from "react-router-dom";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-gray-500 glass glass-card p-4">
            <div className="font-mont text-black flex items-center justify-between">
                <h1 className="font-mont text-black text-2xl font-bold"><Link to="/">AIBudge</Link></h1>
                <button className="font-mont text-black text-2xl md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
                <ul className="hidden md:flex space-x-6 text-black font-medium">
                    <li><a href="#About" className="font-mont hover:text-gray-200">About</a></li>
                    <li><Link to="/login" className="font-mont">Login</Link></li>
                    <li><Link to="/signup" className="font-mont">Sign Up</Link></li>
                    <li><a href="#Contact" className="font-mont hover:text-gray-200">Contact</a></li>
                </ul>
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 mt-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col space-y-3 md:hidden text-black font-medium">
                    <li><a href="#About" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">About</a></li>
                    <li><Link to="/login" className="font-mont">Login</Link></li>
                    <li><Link to="/signup" className="font-mont">Sign Up</Link></li>
                    <li><a href="#Contact" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}