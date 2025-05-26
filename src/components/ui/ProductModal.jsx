// components/ProductModal.jsx
import React from 'react';
import { Dialog } from '@headlessui/react';
import { ShoppingCart } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, product }) => {
    const spices = ['Острый соус', 'Чесночный соус', 'Сырный соус'];
    const drinks = ['Coca-Cola', 'Fanta', 'Sprite'];

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white w-full max-w-md rounded-2xl p-6">
                    <Dialog.Title className="text-xl font-bold mb-4">Добавить к заказу</Dialog.Title>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Специи</h3>
                        <div className="flex flex-wrap gap-3">
                            {spices.map((item) => (
                                <label key={item} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer shadow-sm">
                                    <input type="checkbox" className="accent-yellow-500" />
                                    <span className="text-sm font-medium">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Напитки</h3>
                        <div className="flex flex-wrap gap-3">
                            {drinks.map((item) => (
                                <label key={item} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer shadow-sm">
                                    <input type="checkbox" className="accent-yellow-500" />
                                    <span className="text-sm font-medium">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Отмена
                        </button>
                        <button
                            className="cursor-pointer inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all"
                        >
                            В корзину <ShoppingCart size={18} />
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProductModal;