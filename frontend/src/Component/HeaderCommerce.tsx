import { CartIcon, LogoIcon, SearchIcon, WishlistIcon } from "./IconsCommerce";

export const Header: React.FC = () => {
  const navLinks = ["Home", "Handicrafts", "Textiles", "Art", "About", "Contact"];
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-secondary px-10 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-primary-color">
          <LogoIcon />
          <h2 className="text-text-primary text-xl font-bold tracking-tight">Jharkhand Treasures</h2>
        </div>
        <nav className="flex items-center gap-8 text-base font-medium text-text-primary">
          {navLinks.map((link) => (
            <a key={link} className="hover:text-primary-color transition-colors" href="#">{link}</a>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <label className="flex flex-col min-w-40 !h-11 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-md h-full">
            <div className="text-text-secondary flex border-none bg-secondary items-center justify-center pl-3.5 rounded-l-md border-r-0">
                <SearchIcon />
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-text-primary focus:outline-0 focus:ring-0 border-none bg-secondary focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" 
              placeholder="Search products..." 
            />
          </div>
        </label>
        <div className="flex gap-2">
            <button className="flex cursor-pointer items-center justify-center rounded-md h-11 bg-secondary text-text-primary min-w-0 px-3 hover:bg-[#e9e6e3] transition-colors">
                <WishlistIcon />
            </button>
            <button className="flex cursor-pointer items-center justify-center rounded-md h-11 bg-secondary text-text-primary min-w-0 px-3 hover:bg-[#e9e6e3] transition-colors">
                <CartIcon />
            </button>
        </div>
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 border-2 border-white shadow-md" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCE1GNqcRsovPuwKBeb29Z1YnCNXHGvePFKmyVYCTmv4SrUC1uosWW8SnWgbVTWTLXs1E9FF0vF7bfGfynoYfq9L6xZ_OMs_qHkQRwO6-Qnx1U77CeKzxzg493F8TXjVSqQYqOR_vvK7bnnn-hDZBtYM2mleOjvlOUYbxzh-cL-LMdrxYVLzAUtAx80pvIH5-Gl53ORMuXY6W5Kegf9YTWsJXJpmKlwB73Nl1OBtt3lhEMdrDrfiP9Sk8u6DiyrnhOVUlIAs4PtBg")' }}>
        </div>
      </div>
    </header>
  );
};
