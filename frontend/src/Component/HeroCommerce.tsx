export const Hero: React.FC = () => (
  <div className="py-12">
    <div 
      className="flex min-h-[520px] flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-lg items-center justify-center p-8 text-center" 
      style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBaPzXEofYeQwTXJRNHoVo9s86-mfJGVNnU5qEFi8PRUI2okLY_EmNF8a9zc1NwgtXWBeaQQ5Zfq5F9vdnxCxznICwnNssnpbbhCteW7SelUWlyXdDjQLVshHBt3p5pQMzQZrWI7Zz410H5vUvrWrBl-iWOLExvBn71YMq9s3NMEVbn-uLbdVS0Rd0yDDjuRxjuSXzfaZx4Bi13MUH_5dsTHV-3TJYj2J7AinElu-4OT6c3alR8csWGGR9gMBAVegJJ-xcGi7blA")' }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-5xl font-black leading-tight tracking-tighter">
          Discover the Soul of Jharkhand
        </h1>
        <h2 className="text-white text-lg font-normal leading-normal max-w-2xl mx-auto">
          Explore authentic tribal handicrafts, textiles, and art, crafted with passion and tradition.
        </h2>
      </div>
      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-primary-color text-white text-base font-bold leading-normal tracking-wide hover:bg-[#c0630f] transition-colors shadow-lg">
        <span className="truncate">Shop Now</span>
      </button>
    </div>
  </div>
);
