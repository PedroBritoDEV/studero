import "./globals.css";
import Header from "@/components/header";

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

      <body className="min-h-screen flex flex-col md:flex-row">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
