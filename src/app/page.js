
// import AboutCompany from "@/components/shared/AboutCompany";
// import Navigation from "@/components/shared/Navigation";
// import Notification from "@/components/shared/Notification";
// import Payment from "@/components/shared/Payment";
// import ProductCard from "@/components/shared/ProductCart";
// import Vacancy from "@/components/shared/Vacancy";
import ProductCard from "../components/shared/ProductCart";
import Category from "../components/shared/Category";

export default function Home() {

  return (
    <div className="pb-10">
      <Category />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
