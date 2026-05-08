import { useState } from "react";
import {Link} from "react-router-dom";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-purple-500 glass glass-card p-4">
            <div className="font-mont text-white flex items-center justify-between">
                <h1 className="font-mont text-white text-2xl font-bold"><Link to="/">AIBudge</Link></h1>
                <button className="font-mont text-white text-2xl md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
                <ul className="hidden md:flex space-x-6 text-white font-medium">
                    <li><a href="#About" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">About</a></li>
                    <li><Link to="/login" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Login</Link></li>
                    <li><Link to="/signup" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Sign Up</Link></li>
                    <li><a href="#Contact" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Contact</a></li>
                </ul>
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 mt-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col space-y-3 md:hidden text-white font-medium">
                    <li><a href="#About" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">About</a></li>
                    <li><Link to="/login" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Login</Link></li>
                    <li><Link to="/signup" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Sign Up</Link></li>
                    <li><a href="#Contact" className="font-mont hover:text-fuchsia-200 transition-all duration-300 transform hover:scale-110">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}