import { LogoIcon } from "./IconsCommerce";

export const Footer: React.FC = () => (
  <footer className="bg-white">
    <div className="container mx-auto px-10 py-8">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-primary-color">
          <LogoIcon />
          <h2 className="text-text-primary text-xl font-bold tracking-tight">Jharkhand Treasures</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-base font-medium text-text-secondary">
          <a className="hover:text-primary-color transition-colors" href="#">About Us</a>
          <a className="hover:text-primary-color transition-colors" href="#">Contact</a>
          <a className="hover:text-primary-color transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-primary-color transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-6 pt-6 text-center text-sm text-text-secondary">
        <p>© 2024 Jharkhand Tribal Treasures. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
