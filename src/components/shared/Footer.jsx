'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer({ onCategoryClick }) {
  const [productGroups, setProductGroups] = useState([]);

  useEffect(() => {
    async function fetchProductGroups() {
      try {
        const shopRes = await fetch('/api/shops');
        const shopData = await shopRes.json();
        const shopId = shopData?.items?.[0]?.id;

        if (!shopId) return;

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
        console.error('Ошибка загрузки категорий в футере:', error);
      }
    }

    fetchProductGroups();
  }, []);

  return (
    <footer className="bg-[#162C52] lg:px-20 px-5 text-white text-sm">
      <div className=" mx-auto pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:flex lg:justify-between">
          <div className="space-y-2">
            <p><a href="/about">О компании</a></p>
            <p><a href="/payment">Оплата и доставка</a></p>
            <p><a href="/vacancy">Вакансии</a></p>
            <p><a href="/notif">Отзывы</a></p>
            <p><a href="/contact">Контакты</a></p>
          </div>

          <div className="space-y-2">
            <p>
              <button
                onClick={() => onCategoryClick('Все')}
                className="hover:underline text-left"
              >
                Все
              </button>
            </p>
            {productGroups.map(group => (
              <p key={group.id}>
                <button
                  onClick={() => onCategoryClick(group.name)}
                  className="hover:underline text-left"
                >
                  {group.name}
                </button>
              </p>
            ))}
          </div>

          <div className="space-y-1">
            <p><a href="#" className="underline">Политика конфиденциальности</a></p>
            <p><a href="#" className="underline">Договор оферты</a></p>
          </div>

          <div className="space-y-3">
            <div className="text-white/90 space-y-1 text-sm mt-3">
              <p className="font-bold text-xl">📞 202-39-93</p>
              <p>Пн-Вс: 24 часа</p>
              <p>ул. Мира, 30 </p>
              <p>ул. Куйбышева, 38 </p>
              <p>ул. Екатерининская, 30 </p>
              <p>ул. Ким, 69 </p>
              <p>Почта для заявок </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center mb-5 gap-3">
              <Image src="/images/image 3.png" alt="Visa" width={40} height={25} />
              <Image src="/images/image 1.png" alt="MIR" width={70} height={25} />
              <Image src="/images/image 2.png" alt="Mastercard" width={70} height={25} />
            </div>
            <span className="font-semibold">202-39-93</span>
            <span className="font-semibold">243-39-93</span>
            <span className="font-semibold">203-39-93</span>
            <span className="font-semibold">202-99-93</span>
            <a href="mailto:erevanvip@ya.ru" className="underline">erevanvip@ya.ru</a>
          </div>
        </div>

        <div className="mt-10 pb-5 border-t border-[#29446d] pt-4 text-xs flex flex-col sm:flex-row justify-between items-center gap-2 opacity-80">
          <p>©2024 «Ереван». Все права защищены.</p>
          <a href="https://xo-webstudio.ru">
            <div className="flex gap-2">
              <Image src="/images/Group 1171275597.png" alt="ds" width={40} height={35} />
              <p>Разработано маркетинговым <br /> агенством XO-STUDIO</p>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}