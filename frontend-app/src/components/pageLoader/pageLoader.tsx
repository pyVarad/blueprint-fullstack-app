import React from 'react'
import ReactDOM from 'react-dom';

export const PageLoader: React.FC = () => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="loader border-t-4 border-b-4 border-blue-600 rounded-full w-16 h-16 animate-spin"></div>
            <style>{`
                .loader {
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
            `}</style>
        </div>,
        document.getElementById('portal-root') as HTMLElement
    );
};
