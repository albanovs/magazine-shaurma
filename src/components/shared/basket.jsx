'use client';

import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../ui/button';

export default function Basket() {

    const [count, setCount] = useState(1);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className='text-white mb-20'>
            <h2 className="text-[28px] mb-10 lg:mt-20 md:text-4xl font-extrabold uppercase">Корзина</h2>
            <div className='flex lg:flex-row flex-col gap-10'>
                <div className='lg:w-[70%] p-5 min-h-[250px] h-full bg-[#2B445D] rounded-[20px]'>
                    <div className='flex justify-between pb-5 border-b border-[#ccc]'>
                        <p className='uppercase text-[20px] font-semibold'>Товар</p>
                        <p className='uppercase text-[20px] font-semibold'>Итого</p>
                    </div>
                    <div className='flex lg:flex-row flex-col lg:pb-0 lg:border-0 pb-5 border-b border-[#ccc] justify-between items-center'>
                        <div className='py-5 flex gap-5'>
                            <Image className=' object-cover rounded-[6px]' src="/images/shaur.png" alt="logo" width={100} height={100} />
                            <div className='flex flex-col justify-between'>
                                <h5>Шаурма “Мини” с курицей</h5>
                                <div className="flex lg:w-30 mt-2 mr-5  items-center border border-white text-white rounded-lg p-0 px-4 py-1 space-x-4">
                                    <button onClick={decrement}>
                                        <Minus className="cursor-pointer" size={20} />
                                    </button>
                                    <span className="text-sm">{count}</span>
                                    <button onClick={increment}>
                                        <Plus className="cursor-pointer" size={20} />
                                    </button>
                                </div>
                                <p className='mt-2 text-[#FF5050] cursor-pointer underline'>Удалить товар</p>
                            </div>
                        </div>
                        <h6>240 ₽</h6>
                    </div>
                </div>
                <div className='lg:w-[30%] p-5 min-h-[250px] h-full bg-[#2B445D] rounded-[20px]'>
                    <div className='flex justify-between pb-5 border-b border-[#ccc]'>
                        <p className='uppercase text-[20px] font-semibold'>Сумма заказа</p>
                    </div>
                    <div className='flex justify-between py-5 border-b border-[#ccc]'>
                        <p className=' text-[16px]'>Подытог</p>
                        <p className=' text-[16px]'>240 ₽</p>
                    </div>
                    <div className='flex justify-between py-5 border-b border-[#ccc]'>
                        <p className='uppercase text-[20px] font-semibold'>Итого</p>
                        <p className='uppercase text-[20px] font-semibold'>240 ₽</p>
                    </div>
                    <a href='/order' className='w-full block text-center text-[#0F1F2F] font-semibold cursor-pointer px-5 mt-10 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg'>Перейти к оформлению заказа</a>
                </div>
            </div>
        </div>
    )
}