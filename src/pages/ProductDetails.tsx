import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: {
    id: number;
    name: string;
  };
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (product) {
      const newQuantity = Math.max(1, Math.min(value, product.stock));
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="mt-4 h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="mt-4 h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="mt-6 h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-500">Category: {product.category.name}</p>
          <p className="mt-4 text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>

            {product.stock > 0 && product.stock <= 5 && (
              <p className="mt-2 text-sm text-red-600">
                Only {product.stock} items left in stock!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}