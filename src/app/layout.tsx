import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

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

      <body className="min-h-screen flex flex-col md:flex-row bg-background" cz-shortcut-listen="true">
        <Header />
          <div className="flex-1 flex items-center justify-center ">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
