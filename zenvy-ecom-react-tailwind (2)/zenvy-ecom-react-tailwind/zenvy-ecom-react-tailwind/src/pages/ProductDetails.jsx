import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-20">Product not found</div>;
  return <section className="max-w-7xl mx-auto px-4 py-10">
    <Link to="/products" className="inline-flex gap-2 items-center mb-6 text-blue-600 font-bold"><ArrowLeft/> Back</Link>
    <div className="grid lg:grid-cols-2 gap-10 bg-white dark:bg-slate-900 rounded-[2rem] p-5 md:p-8 border border-slate-200 dark:border-slate-800 shadow-soft">
      <img src={product.image} alt={product.name} className="w-full h-[360px] md:h-[520px] object-cover rounded-[2rem]" />
      <div className="flex flex-col justify-center">
        <p className="text-blue-600 font-bold">{product.category}</p>
        <h1 className="text-3xl md:text-5xl font-black mt-3">{product.name}</h1>
        <p className="flex items-center gap-2 mt-4"><Star className="fill-yellow-400 text-yellow-400"/> {product.rating} Rating • {product.stock} in stock</p>
        <p className="text-slate-600 dark:text-slate-300 mt-6 text-lg">{product.desc}</p>
        <div className="mt-7"><span className="text-4xl font-black">₹{product.price}</span><span className="text-xl text-slate-400 line-through ml-3">₹{product.oldPrice}</span></div>
        <button onClick={()=>addToCart(product)} className="mt-8 px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700"><ShoppingCart/> Add to Cart</button>
      </div>
    </div>
  </section>
};
export default ProductDetails;
