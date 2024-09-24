import React from 'react'

export const PageLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader border-t-4 border-b-4 border-blue-600 rounded-full w-16 h-16 animate-spin"></div>
            <style>{`
                .loader {
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
            `}</style>
        </div>
    );
};
