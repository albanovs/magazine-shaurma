'use client';
import { useState } from "react";

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Minus, Plus } from "lucide-react";
import ProductModal from "../ui/ProductModal";

export default function DetailItem() {

    const [count, setCount] = useState(1);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        {
            id: 1,
            name: 'Шаурма',
            weight: 250,
            image: '/images/DSC_0282 1.png',
            price: 220,
        },
        {
            id: 2,
            name: 'Шаурма',
            weight: 250,
            image: '/images/DSC_0282 1.png',
            price: 220,
        },
        {
            id: 3,
            name: 'Шаурма',
            weight: 250,
            image: '/images/DSC_0282 1.png',
            price: 220,
        },
        {
            id: 4,
            name: 'Шаурма',
            weight: 250,
            image: '/images/DSC_0282 1.png',
            price: 220,
        },
    ];

    return (
        <div className='mt-10 mb-20 text-white'>
            <div className='flex lg:flex-row flex-col gap-10'>
                <Image src="/images/shaur.png" alt="logo" className='rounded-[20px]' width={500} height={500} />
                <div className='space-y-5'>
                    <h2 className='lg:text-[32px] text-[28px] uppercase font-extrabold'>Шаурма “Мини” с курицей</h2>
                    <p>Состав: лаваш, помидоры....</p>
                    <p>250 г</p>
                    <h4 className='lg:text-[32px] text-[28px] font-bold'>240 ₽</h4>
                    <div className='flex items-center gap-5'>
                        <button
                            className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all">
                            В корзину
                            <ShoppingCart size={18} />
                        </button>
                        <div>
                            <div className="flex items-center border border-white text-white rounded-lg px-4 py-1 space-x-4">
                                <button onClick={decrement}>
                                    <Minus className="cursor-pointer" size={20} />
                                </button>
                                <span className="text-xl">{count}</span>
                                <button onClick={increment}>
                                    <Plus className="cursor-pointer" size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-[28px] mt-20 md:text-4xl font-bold uppercase">добавьте к заказу</h2>
            <div className='mt-5'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#0F1F2F] text-white cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full rounded-[10px] h-48 object-cover"
                                />
                            </div>
                            <div className="mt-2">
                                <h3 className="text-xl font-[700]">{product.name}</h3>
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
        </div>
    )
}