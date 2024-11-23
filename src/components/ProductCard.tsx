import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            {name}
          </h3>
        </Link>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}