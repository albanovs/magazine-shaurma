'use client';

import ProductCard from "../components/shared/ProductCart";
import Category from "../components/shared/Category";
import { useEffect, useState } from "react";

export default function GlobalPage() {
    const [shopId, setShopId] = useState(null);
    const [productGroups, setProductGroups] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // теперь может быть объект или массив
    const [activeCategory, setActiveCategory] = useState('Все');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchShops() {
            try {
                const res = await fetch('/api/shops');
                const data = await res.json();
                if (data?.items?.length > 0) {
                    setShopId(data.items[0].id);
                }
            } catch (error) {
                console.error('Ошибка загрузки магазинов:', error);
            }
        }
        fetchShops();
    }, []);

    useEffect(() => {
        async function fetchProductGroups() {
            if (!shopId) return;

            try {
                const res = await fetch(`/api/groups/${shopId}`);
                const data = await res.json();

                const uniqueGroups = [];
                const namesSet = new Set();

                (data.items || []).forEach(group => {
                    if (!namesSet.has(group.name)) {
                        namesSet.add(group.name);
                        uniqueGroups.push(group);
                    }
                });

                setProductGroups(uniqueGroups);
            } catch (error) {
                console.error('Ошибка загрузки групп продуктов:', error);
            }
        }

        fetchProductGroups();
    }, [shopId]);

    useEffect(() => {
        async function fetchAllProducts() {
            if (!shopId) return;
            setLoading(true);

            try {
                const res = await fetch(`/api/product/${shopId}`);
                const data = await res.json();
                const validProducts = data.items
                    .filter((product) =>
                        ['Product', 'TechCard', 'Softdrinks'].includes(product.productType) &&
                        Number(product.sellPricePerUnit) > 0
                    );

                setAllProducts(validProducts);
                setFilteredProducts(validProducts);
                localStorage.setItem('products', JSON.stringify(validProducts));
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAllProducts();
    }, [shopId]);

    useEffect(() => {
        if (activeCategory === 'Все') {
            // сгруппировать все продукты по категориям
            const grouped = {};
            productGroups.forEach(group => {
                grouped[group.name] = allProducts.filter(p => p.groupId === group.id);
            });
            setFilteredProducts(grouped);
        } else {
            const selectedGroup = productGroups.find(group => group.name === activeCategory);
            if (selectedGroup) {
                const filtered = allProducts.filter(product => product.groupId === selectedGroup.id);
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts([]);
            }
        }
    }, [activeCategory, allProducts, productGroups]);

    useEffect(() => {
        if (!productGroups.length || !allProducts.length) return;

        const addOnsGroup = productGroups.find(g => g.name === 'Добавки');
        const saucesGroup = productGroups.find(g => g.name === 'Соусы');

        if (addOnsGroup) {
            const addOnsProducts = allProducts.filter(p => p.groupId === addOnsGroup.id);
            localStorage.setItem('addOns', JSON.stringify(addOnsProducts));
        }

        if (saucesGroup) {
            const saucesProducts = allProducts.filter(p => p.groupId === saucesGroup.id);
            localStorage.setItem('sauces', JSON.stringify(saucesProducts));
        }
    }, [productGroups, allProducts]);

    return (
        <div className="pb-10">
            <Category
                productGroups={productGroups}
                onSelectCategory={setActiveCategory}
                loading={!productGroups.length}
            />
            <ProductCard name={activeCategory} loading={loading} product={filteredProducts} />
        </div>
    );
}
