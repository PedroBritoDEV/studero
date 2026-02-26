"use client";

import { useRouter } from "next/navigation";

export default function FullScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      
      <div className="p-4 shrink-0">
        <i
          onClick={() => router.back()}
          className="fa-solid fa-arrow-left bg-gray-300 p-4 rounded-full cursor-pointer hover:bg-gray-400 transition"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </div>
  );
}