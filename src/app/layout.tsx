import React from 'react';
import '../styles/global.css'; // Import global styles
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
        <head>
            <title>My App</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
            <div className="app-container">
            {children}
            </div>
        </body>
        </html>
    );
}

export default RootLayout;