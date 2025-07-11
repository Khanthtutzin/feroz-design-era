import { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import logo from '../images/logo-removebg-preview.png'

const navItems = ["Home", "About", "Projects", "Services", "Contact"];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#0a0f1c] text-white px-6 py-4 sticky top-0 z-50 shadow-md">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex">
                    <a href="/" className="flex">
                        <img src={logo} className="w-8 h-8" alt="" />
                        <h1 className="text-2xl font-bold">Feroz Design Era</h1>
                    </a>
                </div>
                <div className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={item.toLowerCase()}
                            smooth
                            duration={500}
                            offset={-80}
                            className="cursor-pointer hover:text-blue-400 transition"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden flex flex-col mt-4 space-y-2 px-6">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={item.toLowerCase()}
                            smooth
                            duration={500}
                            offset={-80}
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer hover:text-blue-400"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
