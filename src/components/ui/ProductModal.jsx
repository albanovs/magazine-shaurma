import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ShoppingCart, Minus, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductModal = ({ isOpen, onClose, product }) => {
    const router = useRouter();

    const spices = [
        { id: 1, name: 'Острый соус', price: 15 },
        { id: 2, name: 'Чесночный соус', price: 15 },
        { id: 3, name: 'Сырный соус', price: 20 },
        { id: 4, name: 'Барбекю соус', price: 20 },
        { id: 5, name: 'Кисло-сладкий соус', price: 15 },
        { id: 6, name: 'Унаги соус', price: 25 },
        { id: 7, name: 'Соус терияки', price: 20 },
        { id: 8, name: 'Сливочно-чесночный', price: 20 },
        { id: 9, name: 'Соус спайси', price: 15 },
        { id: 10, name: 'Соус васаби', price: 10 },
        { id: 11, name: 'Имбирь', price: 10 },
    ];

    const [quantity, setQuantity] = useState(1);
    const [selectedSpices, setSelectedSpices] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const toggleSpice = (id) => {
        setSelectedSpices((prev) =>
            prev.includes(id)
                ? prev.filter((spiceId) => spiceId !== id)
                : [...prev, id]
        );
    };

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const totalSpicesPrice = spices
        .filter(spice => selectedSpices.includes(spice.id))
        .reduce((sum, spice) => sum + spice.price, 0);

    const totalPrice = (product.sellPricePerUnit * quantity) + (totalSpicesPrice * quantity);

    const handleAddToCart = () => {
        setIsAdding(true);

        const selectedSpicesDetails = spices
            .filter(spice => selectedSpices.includes(spice.id))
            .map(spice => ({ id: spice.id, name: spice.name, price: spice.price }));

        const orderItem = {
            id: product.id,
            name: product.name,
            uuid: Math.random().toString(36).substring(2, 9),
            image: product.image || 'images/DSC_0282 1.png',
            price: product.sellPricePerUnit,
            quantity,
            spices: selectedSpicesDetails,
        };

        const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCart = [...existingCart, orderItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        setTimeout(() => {
            setIsAdding(false);
            router.push('/basket');
        }, 500);
    };


    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white w-full min-full overflow-hidden flex flex-col max-w-md lg:max-w-2xl rounded-2xl p-6">
                    <Dialog.Title className="text-xl font-bold mb-4">Добавить к заказу</Dialog.Title>

                    <div className="flex flex-col lg:flex-row items-center gap-4 border rounded-xl p-4 mb-6 shadow-sm">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{product?.name}</h2>
                            <Image className='rounded-lg' src={`${product?.image ? product?.image : '/images/DSC_0282 1.png'}`} alt={product?.name} width={100} height={100} />
                            <p className="text-gray-500 mt-1">Цена: {product?.sellPricePerUnit} ₽</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decrease}
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                onClick={increase}
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Дополнительно</h3>
                        <div className="grid grid-cols-3 gap-5 max-h-40 lg:max-h-60 overflow-y-auto pr-1">
                            {spices.map(({ id, name, price }) => {
                                const isSelected = selectedSpices.includes(id);
                                return (
                                    <div
                                        key={id}
                                        onClick={() => toggleSpice(id)}
                                        className={`flex items-center justify-center text-center px-3 py-2 h-20 rounded-lg cursor-pointer shadow-sm transition-colors font-medium text-sm ${isSelected ? 'bg-yellow-400 text-black' : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        <div>
                                            {name}
                                            <div className="text-xs text-gray-500">{price} ₽</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                        <span>К оплате:</span>
                        <span>{totalPrice} ₽</span>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Отмена
                        </button>
                        <button
                            disabled={isAdding}
                            onClick={handleAddToCart}
                            className="cursor-pointer inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isAdding ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Добавление...
                                </>
                            ) : (
                                <>
                                    В корзину <ShoppingCart size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProductModal;
