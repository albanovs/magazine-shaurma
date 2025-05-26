'use client'
import React, { useState } from 'react'

export default function Category() {

    const [activeCategory, setActiveCategory] = useState('Все');
    const categories = [
        'Все', 'Шаурма', 'Шаверма', 'Шашлык и Гриль',
        'Гарниры', 'Соусы и Добавки', 'Комбо', 'Напитки собственного производства'
    ];

    return (
        <div className='lg:mx-20 mx-5'>
            <div className="text-[16px]">
                <div className="container mx-auto">
                    <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-[10px] whitespace-nowrap transition-all ${activeCategory === category
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-[#EDF6FF] text-[#0F1F2F] hover:bg-gray-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
