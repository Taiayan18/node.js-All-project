import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
const Deals = () => {
  const deals = products.filter((p) => ((p.oldPrice - p.price) / p.oldPrice) * 100 >= 60);
  return <section className="max-w-7xl mx-auto px-4 py-10"><h1 className="text-4xl font-black">Deals 60% Off</h1><p className="text-slate-500 mt-2 mb-8">Only products with 60% or more discount.</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{deals.map((p)=><ProductCard key={p.id} product={p}/>)}</div></section>
};
export default Deals;
