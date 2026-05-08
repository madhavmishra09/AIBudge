import { useState } from "react";
import {Link} from "react-router-dom";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-gradient-to-b from-blue-500 to-indigo-600 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold">AIBudge</h1>
                <button className="text-white text-2xl md:hidden" onClick={() => setIsOpen(!isOpen)}>☰</button>
                <ul className="hidden md:flex space-x-6 text-white font-medium">
                    <li><a href="#About" className="hover:text-gray-200">About</a></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 mt-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col space-y-3 md:hidden text-white font-medium">
                    <li><a href="#About" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-110">About</a></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><a href="#Contact" className="hover:text-gray-200 transition-all duration-300 transform hover:scale-110">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}