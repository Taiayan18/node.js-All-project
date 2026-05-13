import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Search, ShoppingCart, Sun, User, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const links = [
  ["/", "Home"], ["/products", "Products"], ["/deals", "Deals"], ["/about", "About"], ["/contact", "Contact"]
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navClass = ({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400";

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white grid place-items-center font-black">Z</div>
          <div>
            <h1 className="text-xl font-black leading-none">Zenvy</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Online Store</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([to, label]) => <NavLink key={to} to={to} className={navClass}>{label}</NavLink>)}
        </nav>

        <div className="hidden md:flex items-center max-w-sm flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl px-4 py-2 border border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-500" />
          <input placeholder="Search products..." className="w-full bg-transparent outline-none px-3 text-sm" />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/admin" className="hidden sm:block p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"><LayoutDashboard className="w-5 h-5" /></Link>
          <Link to="/login" className="hidden sm:block p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"><User className="w-5 h-5" /></Link>
          <Link to="/cart" className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs grid place-items-center">{count}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800">{open ? <X /> : <Menu />}</button>
        </div>
      </div>

      {open && <div className="lg:hidden px-4 pb-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-2xl px-4 py-2 my-3">
          <Search className="w-4 h-4 text-slate-500" /><input placeholder="Search..." className="w-full bg-transparent outline-none px-3 text-sm" />
        </div>
        <div className="grid gap-3">
          {links.map(([to, label]) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className={navClass}>{label}</NavLink>)}
          <NavLink to="/admin" onClick={() => setOpen(false)} className={navClass}>Admin</NavLink>
          <NavLink to="/login" onClick={() => setOpen(false)} className={navClass}>Login</NavLink>
        </div>
      </div>}
    </header>
  );
};
export default Header;
