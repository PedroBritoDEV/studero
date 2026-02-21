"use client";



export default function Profile() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-2">
        <img src="/images/logo-studero.png" alt="logo-studero" className="w-12"/>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-tertiary font-bold">1</span>
        <div className="flex justify-center items-center rounded-full bg-gray-300 w-10 h-10">
          <i className="fa-sharp-duotone fa-solid fa-fire text-tertiary"></i>
        </div>
      </div>
      
    </header>
  );
}
