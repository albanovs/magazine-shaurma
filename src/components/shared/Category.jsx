'use client'
import React from 'react'

export default function Category({ productGroups, onSelectCategory, loading }) {
    const [activeCategory, setActiveCategory] = React.useState('Все');

    const orderedCategories = [
        'Шаурма',
        'Шаверма',
        'Шашлык',
        'КОМБО',
        'Гарниры',
        'Добавки',
        'Напитки',
        'Холодные напитки',
        'Мясо',
        'Лаваши',
        'Соусы',
    ];

    function handleClick(category) {
        setActiveCategory(category);
        onSelectCategory(category);
    }

    const skeletons = Array(10).fill(null);

    const filteredAndSortedCategories = React.useMemo(() => {
        if (!productGroups) return [];

        const filtered = productGroups.filter(
            cat => cat.name !== 'Воды минеральные и сладкие' && cat.name !== 'Пиво' && cat.name !== 'Овощи' && cat.name !== 'Другие блюда' && cat.name !== 'Соусы'
        );

        const orderMap = new Map(orderedCategories.map((cat, i) => [cat.toLowerCase(), i]));

        const inOrder = [];
        const others = [];

        filtered.forEach(cat => {
            const nameLower = cat.name.toLowerCase();
            if (orderMap.has(nameLower)) {
                inOrder[orderMap.get(nameLower)] = cat;
            } else {
                others.push(cat);
            }
        });

        const filteredInOrder = inOrder.filter(Boolean);
        others.sort((a, b) => a.name.localeCompare(b.name));

        return [...filteredInOrder, ...others];
    }, [productGroups]);

    return (
        <div className="sticky border border-y-[#ccc]/20 border-x-[#0F1F2F] top-0 bg-[#0F1F2F] z-10 lg:mx-20 mx-5 py-3">
            <div className="text-[16px]">
                <div className="flex lg:gap-4 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {loading ? (
                        <>
                            {skeletons.map((_, i) => (
                                <div
                                    key={i}
                                    className="w-[100px] h-[40px] bg-gray-300 rounded-[10px] animate-pulse"
                                ></div>
                            ))}
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleClick('Все')}
                                className={`px-6 py-2 rounded-[10px] whitespace-nowrap transition-all ${activeCategory === 'Все'
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-[#EDF6FF] text-[#0F1F2F] hover:bg-gray-600'
                                    }`}
                            >
                                Все
                            </button>

                            {filteredAndSortedCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => handleClick(category.name)}
                                    className={`px-6 py-2 rounded-[10px] whitespace-nowrap transition-all ${activeCategory === category.name
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-[#EDF6FF] text-[#0F1F2F] hover:bg-gray-600'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
