import { Header } from "../Component/HeaderCommerce";
import { Hero } from "../Component/HeroCommerce";
import { ProductSection } from "../Component/ProductSectionCommerce";
import {featuredProducts, newArrivals, popularItems} from "../../dataForCommerce";
import { Footer } from "../Component/FooterCommerce";
const JharkhandTreasuresPage: React.FC = () => {
  return (
    <div className="bg-secondary">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-public-sans">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          <main className="flex-1 px-24">
            <Hero />
            <ProductSection 
              title="Featured Products" 
              products={featuredProducts} 
              gridCols="md:grid-cols-2 lg:grid-cols-3"
              aspectRatio="aspect-[4/3]"
            />
            <ProductSection 
              title="New Arrivals" 
              products={newArrivals}
              gridCols="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              aspectRatio="aspect-square"
            />
            <ProductSection 
              title="Popular Items" 
              products={popularItems}
              gridCols="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              aspectRatio="aspect-square"
            />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default JharkhandTreasuresPage;
