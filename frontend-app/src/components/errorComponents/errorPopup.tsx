import React, { useState } from 'react'

export const ErrorPopUp: React.FC<{ title: string, message: string }> = ({ title, message }: { title: string, message: string }) => {
    const [showError, setShowError] = useState(true);

    const handleClose = () => {
        setShowError(false); // Close the modal
    };
    return (
        <>
            {showError && (<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">{title}
                    </h2>
                    <p className="mb-6 text-gray-700">{message}</p>
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>)}
        </>
    )
}
