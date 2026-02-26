import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
      </head>

      <body
        className="max-h-screen flex flex-col md:flex-row bg-background"
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
