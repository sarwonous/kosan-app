const AuthenticatedLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) => {
  return (
    <html lang="en">
      <head>
        <title>Authenticated Layout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="app-container">{children}</div>
      </body>
    </html>
  );
};
export default AuthenticatedLayout;
