import ButtonLogin from "@/components/ButtonLogin";
import Header from "@/components/Header";
import FaqListItem from "@/components/FaqListItem";
import Footer from "@/components/Footer";
import Image from "next/image";
import productPhoneDemo from "./productPhoneDemo.png";
import PhoneDemoBlock from "@/components/PhoneDemoBlock";

export default function Home() {
  const name = "Marc";
  const isLoggedIn = true;

  return (
    <>
      <Header />
      <main>
        {/* =======HERO===== */}
        <section className="bg-[#080816] pt-6 z-0">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto flex flex-col items-center sm:text-center lg:text-left lg:items-end lg:flex-row lg:justify-between text-left">
            <div className="max-w-140 mt-13 sm:pb-27 pb-14 sm:pt-28 pt-16 ">
              {/* или можно поставить text-6xl */}
              <h1 className="font-bold text-[clamp(38px,4.6vw,42px)] sm:text-[clamp(48px,4.6vw,60px)] leading-[1.2] mb-3 text-base-content max-w-112.5 lg:max-w-none">
                Keep your money, not subscriptions
              </h1>
              <p className="text-base-content/70 lg:text-xl sm:text-lg text-base max-w-100 sm:mx-auto lg:mx-0 sm:mb-12 mb-9 ">
                Track all your subscriptions in one place and get notified
                before any payment — all for free.
              </p>
              <div className="flex flex-row flex-wrap gap-4 sm:gap-8 text-base-content items-center justify-start sm:justify-center lg:justify-start">
                <ButtonLogin>Join the waitlist</ButtonLogin>
                <p>
                  🚀 <span className="opacity-60">Join before launch</span>
                </p>
              </div>
            </div>
            <PhoneDemoBlock />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
