import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

const Products = () => {
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const filtered = useMemo(() => {
    let data = products.filter((p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") data.sort((a,b) => a.price - b.price);
    if (sort === "high") data.sort((a,b) => b.price - a.price);
    return data;
  }, [category, search, sort]);
  return <section className="max-w-7xl mx-auto px-4 py-10">
    <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
      <div><h1 className="text-4xl font-black">All Products</h1><p className="text-slate-500 mt-2">Search, filter and sort products.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-auto">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search product" className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none" />
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none">{categories.map(c => <option key={c}>{c}</option>)}</select>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none"><option value="default">Default</option><option value="low">Price Low to High</option><option value="high">Price High to Low</option></select>
      </div>
    </div>
    {filtered.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{filtered.map((p)=><ProductCard key={p.id} product={p}/>)}</div> : <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl">No product found</div>}
  </section>
};
export default Products;
