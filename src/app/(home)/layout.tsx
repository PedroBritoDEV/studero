import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      
      <Header />

      <div className="flex-1 w-full p-4 pt-0 flex justify-center overflow-hidden">
        {children}
      </div>

      <Footer />

    </div>
  );
}