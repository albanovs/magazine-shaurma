'use client';

import ProductCard from "../components/shared/ProductCart";
import Category from "../components/shared/Category";
import Loader from "../components/ui/loader";
import { useEffect, useState } from "react";

export default function GlobalPage() {
    const [shopId, setShopId] = useState(null);
    const [productGroups, setProductGroups] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Все');
    const [loading, setLoading] = useState(false); // состояние загрузки

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
                setProductGroups(data.items || []);
            } catch (error) {
                console.error('Ошибка загрузки групп продуктов:', error);
            }
        }

        fetchProductGroups();
    }, [shopId]);

    useEffect(() => {
        async function fetchProducts() {
            if (!shopId) return;
            setLoading(true); // показать прелоадер

            try {
                const url =
                    activeCategory === 'Все'
                        ? `/api/product/${shopId}`
                        : `/api/category/${shopId}/products/${activeCategory}`;

                const res = await fetch(url);
                const data = await res.json();
                setProducts(data.items || []);
                localStorage.setItem('products', JSON.stringify(data.items));
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
            } finally {
                setLoading(false); // скрыть прелоадер
            }
        }

        fetchProducts();
    }, [shopId, activeCategory]);

    return (
        <div className="pb-10">
            <Category
                productGroups={productGroups}
                onSelectCategory={setActiveCategory}
                loading={!productGroups.length}
            />
            <ProductCard loading={loading} product={products} />
        </div>
    );
}