import React from 'react';
import '../../styles/global.css'; // Import global styles
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="container max-w-md mx-auto px-4">
                {children}
            </div>
        </>
    );
}

export default RootLayout;