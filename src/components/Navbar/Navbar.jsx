import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import club from "../../assets/club.png";

const Navbar = () => {
    const navbarRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        let prevScrollY = window.scrollY;
        let accumulatedDiff = 0;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            const scrollDiff = prevScrollY - currentScrollY; // Positive when scrolling up
            
            accumulatedDiff = Math.min(
                Math.max(accumulatedDiff + scrollDiff, -navbarHeight),
                0
            );

            setTranslateY(accumulatedDiff);
            prevScrollY = currentScrollY;
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [navbarHeight]);

    return (
        <div 
            ref={navbarRef}
            style={{
                position: 'fixed',
                top: 0,
                transform: `translateY(${translateY}px)`,
                transition: 'none'
            }}
            className="navbar w-full flex flex-row justify-between px-4 py-3 md:py-6 lg:py-3 bg-orange-500 shadow-md z-50"
        >
            <div className="nav-left flex flex-row justify-center items-center gap-5">
                <img src={logo} alt="Icon" className='icon w-12 h-12 md:w-12 md:h-12 lg:w-15 lg:h-15' />
                <img src={club} alt="Icon" className='w-34 h-10' />
            </div>
            <div className="nav-right flex items-start">
                <a
                    href="https://devfolio.co/discover" // Link to open
                    target="_blank" // Opens link in a new tab
                    rel="noopener noreferrer" // Security feature for external links
                    style={{
                        textDecoration: "none" // Removes underline from the link
                    }}
                >
                    <button
                        style={{
                            padding: "8px 16px", // Smaller padding for mobile screens
                            backgroundColor: "rgba(51, 51, 51, 0.8)", // Darker color with reduced opacity
                            border: "2px solid #ff7200", // Yellow border like Call of Duty color theme
                            borderRadius: "10px", // Subtle rounded edges for a more rugged feel
                            color: "#ff7200", // Bright yellow text to match the theme
                            fontSize: "14px", // Smaller font size for mobile
                            cursor: "pointer",
                            letterSpacing: "2px",
                            transition: "background-color 0.3s, box-shadow 0.3s",
                            boxShadow: "0 0 15px 3px rgba(255, 204, 0, 0.7)",
                            position: "relative",
                            overflow: "hidden",
                            marginLeft: window.innerWidth <= 640 ? "25px" : "0px", // Apply left margin on mobile
                            marginTop: "4px" // 4px top margin for the button
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "rgba(34, 34, 34, 0.9)"; // Slightly darker on hover
                            e.target.style.boxShadow = "0 0 20px 6px rgba(255, 204, 0, 0.9)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "rgba(51, 51, 51, 0.8)"; // Original dark background with reduced opacity
                            e.target.style.boxShadow = "0 0 15px 3px rgba(255, 204, 0, 0.7)";
                        }}
                    >
                        Register Now
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Navbar;
