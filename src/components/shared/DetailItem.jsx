'use client';
import { useState, useEffect } from "react";
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import ProductModal from "../ui/ProductModal";

export default function DetailItem({ id }) {
    const [datas, setDatas] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('products')) || [];
        setDatas(stored);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const filteredProduct = datas.find(product => product.id === id);

    if (!filteredProduct) {
        return <div className="text-white">Товар не найден</div>;
    }

    return (
        <div className='mt-10 mb-20 text-white'>
            <div className='flex lg:flex-row flex-col gap-10'>
                <Image
                    src={filteredProduct.image ? filteredProduct.image : '/images/DSC_0282 1.png'}
                    alt={filteredProduct.name}
                    className='rounded-[20px]'
                    width={500}
                    height={500}
                />
                <div className='space-y-5'>
                    <h2 className='lg:text-[32px] text-[28px] uppercase font-extrabold'>{filteredProduct.name}</h2>
                    {/* <p>Состав: лаваш, помидоры....</p> */}
                    <h4 className='lg:text-[32px] text-[28px] font-bold'>{filteredProduct.sellPricePerUnit} ₽</h4>
                    <div className='flex items-center gap-5'>
                        <button
                            onClick={() => setSelectedProduct(filteredProduct)}
                            className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all">
                            В корзину
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-[28px] mt-20 md:text-4xl font-bold uppercase">добавьте к заказу</h2>
            <div className='mt-5'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {datas.slice(0, 4).map(product => (
                        <div
                            key={product.id}
                            className="bg-[#0F1F2F] text-white cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <a href={`/detail/${product.id}`} className="relative">
                                <img
                                    src={product.image || '/images/DSC_0282 1.png'}
                                    alt={product.name}
                                    className="w-full rounded-[10px] h-48 object-cover"
                                />
                            </a>
                            <div className="mt-2">
                                <h3 className="text-xl font-[700]">{product.name}</h3>
                                <p className="text-gray-300 text-sm mb-2">{product.weight} г</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-xl font-bold">{product.sellPricePerUnit} ₽</span>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all">
                                        В корзину
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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
    );
}
