import React from "react";
import "../styles/global.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Provider from "./provider";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="app-container">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
