import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">ModernShop</h1>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/shop" className="text-gray-600 hover:text-gray-900">
                Shop
              </Link>
              <Link to="/categories" className="text-gray-600 hover:text-gray-900">
                Categories
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">{user?.name}</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {user?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:block">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}