'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import ProductModal from '../ui/ProductModal';

const ProductCard = ({ name, product, loading }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const skeletons = Array(8).fill(null);

  const isGrouped = product && typeof product === 'object' && !Array.isArray(product);

  return (
    <div className="lg:mx-20 mx-5 mt-20">
      <h1 className="text-3xl text-white font-extrabold mb-5">{name}</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skeletons.map((_, i) => (
            <div
              key={i}
              className="bg-[#0F1F2F] rounded-lg p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-700 rounded-[10px] mb-4"></div>
              <div className="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-5 bg-gray-600 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-500 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {isGrouped ? (
            (() => {
              const order = ['Шаурма', 'Шаверма', 'Място', 'Комбо'];
              const groupedEntries = Object.entries(product);

              // Фильтруем группы, у которых есть товары
              const filteredEntries = groupedEntries.filter(([_, products]) => products.length > 0);

              // Сортируем с учётом order, оставшиеся идут в конец
              const sortedEntries = [
                ...order
                  .map((key) => filteredEntries.find(([groupName]) => groupName === key))
                  .filter(Boolean),
                ...filteredEntries.filter(([groupName]) => !order.includes(groupName)),
              ];

              return sortedEntries.map(([groupName, products]) => (
                <div key={groupName} className="mb-12 border border-y-[#ccc]/20 border-x-[#0F1F2F]">
                  <h2 className="text-2xl font-bold text-white mb-6">{groupName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductItem
                        key={product.id}
                        product={product}
                        onSelect={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>
                </div>
              ));
            })()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {product.length === 0
                ? null
                : product.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onSelect={() => setSelectedProduct(product)}
                  />
                ))}
            </div>
          )}
        </>
      )}

      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

const ProductItem = ({ product, onSelect }) => (
  <div
    className="bg-[#0F1F2F] text-white flex flex-col justify-between cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
  >
    <div className="relative">
      <a href={`/detail/${product.id}`}>
        <img
          src={product.image || 'images/DSC_0282 1.png'}
          alt={product.name}
          className="w-full rounded-[10px] h-48 object-cover"
        />
      </a>
    </div>
    <div className="mt-2 px-2 pb-3">
      <a href="/order">
        <h3 className="text-xl font-[700]">{product.name}</h3>
      </a>
      <div className="flex items-end mt-1 justify-between">
        <span className="text-xl font-bold">{product.sellPricePerUnit} ₽</span>
        <button
          onClick={onSelect}
          className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all"
        >
          В корзину
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
