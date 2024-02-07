import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth"

export const Navbar = () => {
    const { isLoggedin } = useAuth();

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Mearn App</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            {isLoggedin ? <li><NavLink to="/logout">Logout</NavLink></li>
                                : <>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                </>}






                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}