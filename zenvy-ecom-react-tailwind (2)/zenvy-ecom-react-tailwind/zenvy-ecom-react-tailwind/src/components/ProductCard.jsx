import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const off = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  return <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-soft border border-slate-200 dark:border-slate-800 overflow-hidden group">
    <Link to={`/products/${product.id}`} className="block relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 duration-500" />
      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{product.tag}</span>
      <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">{off}% OFF</span>
    </Link>
    <div className="p-5">
      <div className="flex justify-between gap-3"><p className="text-sm text-slate-500">{product.category}</p><p className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {product.rating}</p></div>
      <Link to={`/products/${product.id}`}><h3 className="font-bold mt-2 line-clamp-2 hover:text-blue-600">{product.name}</h3></Link>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{product.desc}</p>
      <div className="flex items-end justify-between mt-4">
        <div><span className="text-xl font-black">₹{product.price}</span><span className="text-sm text-slate-400 line-through ml-2">₹{product.oldPrice}</span></div>
        <button onClick={() => addToCart(product)} className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"><ShoppingCart className="w-5 h-5" /></button>
      </div>
    </div>
  </div>
};
export default ProductCard;
