import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Headphones } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { categories, products } from "../data/products";

const Home = () => {
  const featured = products.slice(0, 8);
  return <>
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-sm">Mega Sale Live Now</span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mt-5">Shop smarter with <span className="text-blue-600">Zenvy</span> modern store.</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-5">Discover mobiles, fashion, electronics, home products and daily deals in one beautiful responsive e-commerce app.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/products" className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold flex items-center gap-2 hover:bg-blue-700">Shop Now <ArrowRight /></Link>
            <Link to="/deals" className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-900">View Deals</Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-8 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <img className="relative rounded-[2rem] shadow-soft w-full h-[420px] object-cover" src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200" alt="Shopping" />
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[ [Truck,"Free Delivery"], [ShieldCheck,"Secure Payment"], [RefreshCcw,"Easy Returns"], [Headphones,"24/7 Support"] ].map(([Icon, text]) => <div key={text} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft flex items-center gap-4"><Icon className="text-blue-600"/><b>{text}</b></div>)}
    </section>

    <section className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle small="Categories" title="Shop by Category" text="Choose your favorite category and start shopping instantly." />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.slice(1).map((cat) => <Link to={`/products?category=${cat}`} key={cat} className="bg-white dark:bg-slate-900 rounded-3xl p-5 text-center border border-slate-200 dark:border-slate-800 hover:-translate-y-1 duration-300 shadow-soft"><div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 mx-auto grid place-items-center text-blue-600 font-black">{cat[0]}</div><p className="font-bold mt-3 text-sm">{cat}</p></Link>)}
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle small="Featured" title="Popular Products" text="Best selling products selected for your modern online store." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </section>
  </>
};
export default Home;
