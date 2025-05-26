'use client';
import { useState } from "react";
import HeroSection from "./HeroSection";
import { MapPin, Phone, ShoppingCart, Menu, X, ShoppingBasket } from "lucide-react";
import Button from "../ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  const mobilemenu = [
    { name: 'Главная', link: '/' },
    { name: 'О комапании', link: '/about' },
    { name: 'Доставка и оплата', link: '/payment' },
    { name: 'Вакансии', link: '/vacancy' },
    { name: 'Отзывы', link: '/notif' }
  ]

  const addressOptions = [
    { address: 'ул. Мира, 30', phone: '202-39-93' },
    { address: 'ул. Куйбышева, 38', phone: '243-39-93' },
    { address: 'ул. Екатерининская, 30', phone: '203-39-93' },
    { address: 'ул. Ким, 69', phone: '202-99-33' }
  ];

  const [selected, setSelected] = useState(addressOptions[0]);


  return (
    <div className="bg-[#0F1F2F] lg:px-20 text-white relative z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-y-4">
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <a href="/"><Image src="/images/IMG_0218-Photoroom 1.png" alt="logo" width={124} height={78} /></a>
          <div className="flex gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="md:hidden text-white"
            >
              <ShoppingBasket className="cursor-pointer" size={28} />
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden text-white"
            >
              <Menu className="cursor-pointer" size={28} />
            </button>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center md:ml-10 gap-6 text-sm">
          <div className="flex rounded-[10px] px-4 py-2.5 border border-[#364A5E] items-center gap-2">
            <MapPin color="#FECE00" size={16} />
            <select
              value={selected.address}
              onChange={(e) => {
                const found = addressOptions.find(a => a.address === e.target.value);
                if (found) setSelected(found);
              }}
              className="bg-transparent focus:outline-none"
            >
              {addressOptions.map(({ address }) => (
                <option key={address} value={address} className="text-black">
                  {address}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-full bg-[#FECE00] rounded-[10px] px-4 py-2.5 items-center gap-2">
            <Phone size={16} color="#0F1F2F" />
            <span className="bg-yellow-400 text-black">{selected.phone}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <a href="/about" className="bg-[#2B445D] px-4 py-2 rounded-[10px] hover:text-yellow-400 transition-colors">
            О компании
          </a>
          <a href="/vacancy" className="bg-[#2B445D] px-4 py-2 rounded-[10px] hover:text-yellow-400 transition-colors">
            Вакансии
          </a>
          <a href="/payment" className="bg-[#2B445D] px-4 py-2 rounded-[10px] hover:text-yellow-400 transition-colors">
            Оплата и доставка
          </a>
          <a href="/notif" className="bg-[#2B445D] px-4 py-2 rounded-[10px] hover:text-yellow-400 transition-colors">
            Отзывы
          </a>
          <div className="w-[150px] h-[40px] bg-yellow-400 text-[#0F1F2F] flex items-center justify-center rounded-md">
            <Button onClick={() => setIsCartOpen(true)} className="text-sm" variant="primary" size="sm" >
              Корзина
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>
      {pathname === '/' && <HeroSection />}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative bg-[#0F1F2F] w-64 p-6 shadow-lg z-50">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsDrawerOpen(false)}
            >
              ✕
            </button>
            <nav className="mt-10 space-y-4">
              {mobilemenu.map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  onClick={() => setIsDrawerOpen(false)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${activeCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 bg-opacity-30"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative bg-white w-80 h-full shadow-lg z-50 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white ">Корзина</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <p className="text-gray-500">Ваша корзина пуста.</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
              <a href="/basket" className="w-full text-center cursor-pointer bg-gray-100 text-gray-800 font-medium py-2 rounded hover:bg-gray-200 transition">
                Перейти в корзину
              </a>
              <a href="/order" className="w-full block text-center cursor-pointer bg-yellow-400 text-white font-medium py-2 rounded hover:bg-yellow-500 transition">
                Оформить заказ
              </a>
            </div>
          </div>
        </div>

      )}

    </div>
  );
};

export default Navigation;
