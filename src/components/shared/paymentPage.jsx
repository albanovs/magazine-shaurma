'use client'

import React, { useState } from 'react';

export default function OrderForm() {
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedAddress, setSelectedAddress] = useState('ул. Мира, 30');

    return (
        <div className=" text-white mt-10 mb-20">
            <div className="w-full flex flex-col lg:flex-row gap-6">
                <div className="bg-[#2B445D] p-6 rounded-md flex-1">
                    <h2 className="text-xl font-semibold mb-4">Детали заказа</h2>

                    <div className="space-y-4">
                        <input type="text" placeholder="Ваше имя*" required className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                        <input type="tel" placeholder="Номер телефона*" required className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                        <input type="email" placeholder="E-mail*" required className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Детали доставки</h3>

                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => setDeliveryMethod('pickup')}
                            className={`px-4 py-1 rounded-lg border border-yellow-400 ${deliveryMethod === 'pickup' ? 'bg-yellow-400 text-black' : 'text-white'
                                }`}
                        >
                            Самовывоз
                        </button>
                        <button
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`px-4 py-1 rounded-lg border border-yellow-400 ${deliveryMethod === 'delivery' ? 'bg-yellow-400 text-black' : 'text-white'
                                }`}
                        >
                            Доставка
                        </button>
                    </div>

                    {deliveryMethod === 'delivery' && (
                        <div className="space-y-4">
                            <input type="text" placeholder="Город*" className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                            <input type="text" placeholder="Улица*" className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                            <input type="text" placeholder="Дом*" className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                            <input type="text" placeholder="Квартира*" className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                            <input type="text" placeholder="Время доставки*" className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                            <textarea placeholder="Комментарий курьеру" className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none" />
                        </div>
                    )}

                    {
                        deliveryMethod === 'pickup' && (
                            <div className="mt-4 space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="pickup-address"
                                        value="ул. Мира, 30"
                                        checked={selectedAddress === 'ул. Мира, 30'}
                                        onChange={() => setSelectedAddress('ул. Мира, 30')}
                                        className="accent-red-500"
                                    />
                                    <span>ул. Мира, 30</span>
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="pickup-address"
                                        value="ул. Куйбышева, 38"
                                        checked={selectedAddress === 'ул. Куйбышева, 38'}
                                        onChange={() => setSelectedAddress('ул. Куйбышева, 38')}
                                        className="accent-red-500"
                                    />
                                    <span>ул. Куйбышева, 38</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="pickup-address"
                                        value="ул. Екатерининская, 30"
                                        checked={selectedAddress === 'ул. Екатерининская, 30'}
                                        onChange={() => setSelectedAddress('ул. Екатерининская, 30')}
                                        className="accent-red-500"
                                    />
                                    <span>ул. Екатерининская, 30</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="pickup-address"
                                        value="ул. Ким, 69"
                                        checked={selectedAddress === 'ул. Ким, 69'}
                                        onChange={() => setSelectedAddress('ул. Ким, 69')}
                                        className="accent-red-500"
                                    />
                                    <span>ул. Ким, 69</span>
                                </label>
                            </div>
                        )
                    }
                </div>

                <div className="bg-[#2B445D] p-6 rounded-md lg:w-[50%]">
                    <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>

                    <div className="flex justify-between pb-2 border-b border-gray-600 mb-2 text-sm text-gray-300">
                        <span className="font-medium">Название</span>
                        <span className="font-medium">Цена</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <p>Шаурма “Мини” с курицей, 250 г ×1</p>
                        <p>240 ₽</p>
                    </div>

                    <div className="flex justify-between font-semibold border-t border-gray-600 pt-2 mt-4">
                        <span>Итого:</span>
                        <span>240 ₽</span>
                    </div>

                    <div className="mt-4 space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                                className="accent-red-500"
                            />
                            <span>Оплата картой онлайн</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                                className="accent-red-500"
                            />
                            <span>Оплата при доставке</span>
                        </label>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        Отправляя заявку, вы соглашаетесь с обработкой персональных данных в соответствии с{' '}
                        <a href="#" className="underline">политикой конфиденциальности</a>
                    </p>

                    <button className="mt-4 lg:w-[250px] w-full cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md">
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    );
}