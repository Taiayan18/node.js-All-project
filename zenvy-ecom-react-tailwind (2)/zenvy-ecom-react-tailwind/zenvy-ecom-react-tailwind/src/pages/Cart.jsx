import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
const Cart = () => {
  const { cart, total, updateQty, removeFromCart, clearCart } = useCart();
  if (!cart.length) return <section className="max-w-7xl mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-black">Cart is Empty</h1><p className="text-slate-500 mt-3">Add products to your cart.</p><Link to="/products" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold">Shop Products</Link></section>;
  return <section className="max-w-7xl mx-auto px-4 py-10">
    <h1 className="text-4xl font-black mb-8">My Cart</h1>
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 grid gap-4">{cart.map((item)=><div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
        <img src={item.image} className="w-full sm:w-32 h-32 object-cover rounded-2xl" />
        <div className="flex-1"><h3 className="font-bold text-lg">{item.name}</h3><p className="text-slate-500">₹{item.price}</p><div className="flex items-center gap-3 mt-4"><button onClick={()=>updateQty(item.id,item.qty-1)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><Minus size={16}/></button><b>{item.qty}</b><button onClick={()=>updateQty(item.id,item.qty+1)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><Plus size={16}/></button><button onClick={()=>removeFromCart(item.id)} className="ml-auto p-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-950"><Trash2 size={18}/></button></div></div>
      </div>)}</div>
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 h-fit shadow-soft"><h2 className="text-2xl font-black">Order Summary</h2><div className="flex justify-between mt-6"><span>Subtotal</span><b>₹{total}</b></div><div className="flex justify-between mt-3"><span>Delivery</span><b className="text-green-600">Free</b></div><hr className="my-5 border-slate-200 dark:border-slate-800"/><div className="flex justify-between text-xl"><span>Total</span><b>₹{total}</b></div><button className="w-full mt-6 py-3 rounded-2xl bg-blue-600 text-white font-bold">Checkout</button><button onClick={clearCart} className="w-full mt-3 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold">Clear Cart</button></div>
    </div>
  </section>
};
export default Cart;
