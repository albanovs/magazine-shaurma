'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Button from '../ui/button';
import ProductModal from '../ui/ProductModal';

const ProductCard = () => {
  const products = [
    {
      id: 1,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 2,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 3,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 4,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 5,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 6,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 7,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
    {
      id: 8,
      name: 'Шаурма',
      weight: 250,
      image: '/images/DSC_0282 1.png',
      price: 220,
      link: '/detail'
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className='lg:mx-20 mx-10 mt-20'>
      <h1 className='text-3xl text-white font-extrabold mb-5'>МЕНЮ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#0F1F2F] text-white cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">
              <a href="/detail">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-[10px] h-48 object-cover"
                />
              </a>
            </div>
            <div className="mt-2">
              <a href="/order"><h3 className="text-xl font-[700]">{product.name}</h3></a>
              <p className="text-gray-300 text-sm mb-2">{product.weight} г</p>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold">{product.price} сом</span>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all">
                  В корзину
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
            {selectedProduct && (
              <ProductModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
