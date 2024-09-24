import React from 'react'
import { NavBarButtons } from '../auth/navbuttons'
import { useAuth0 } from '@auth0/auth0-react';

const NavBarComponent: React.FC = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold">MyApp</h1>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                {isAuthenticated && (
                                    <>
                                        <a href="#" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Admin</a>
                                        <a href="#" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Protected</a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex space-x-4">
                            <NavBarButtons />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBarComponent