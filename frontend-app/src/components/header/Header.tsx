import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import '../../i18n/i18n';
import { useTranslation } from "react-i18next";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>
}

const LogoutButton = () => {
    const { logout } = useAuth0();
    return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout </button>
}



const Header: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { t, i18n: { changeLanguage, language } } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(language);
    const handleChangeLanguage = () => {
      const newLanguage = currentLanguage === "en" ? "pt" : "en";
      setCurrentLanguage(newLanguage);
      changeLanguage(newLanguage);
    }
  

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleScroll = () => {
        const offset = window.scrollY;
        setIsScrolled(offset > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                {t('headerTitle', { appName: "App for Translations" })}
                </h1>
                <button
                    className="md:hidden p-2"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
                <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row md:space-x-4">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"
                            >
                                Home
                            </a>
                        </li>

                        <li className="relative">
                            <select
                                value={currentLanguage}
                                onChange={() => handleChangeLanguage()}
                                className="block bg-transparent border border-gray-300 rounded p-2 text-gray-800"
                            >
                                <option value="en">English</option>
                                <option value="es">Portugese</option>
                                {/* Add more languages as needed */}
                            </select>
                        </li>


                        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;