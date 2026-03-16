import { Outlet } from "react-router";
import logoImage from "figma:asset/ca6dd4800b2ade3a8cd3a93e8df06dcb51f53fd0.png";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#7cb342] to-[#689f38] p-12 items-center justify-center">
        <div className="max-w-md text-white">
          <img src={logoImage} alt="El Mascotario" className="w-48 h-48 mx-auto mb-8" />
          <h1 className="text-4xl font-bold mb-4 text-center">El Mascotario</h1>
          <p className="text-xl text-center opacity-90">
            Sistema integral de gestión veterinaria
          </p>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={logoImage} alt="El Mascotario" className="w-32 h-32 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">El Mascotario</h1>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
}
