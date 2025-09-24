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
        <section className="bg-[#080816] pt-6">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto flex lg:row justify-between">
            <div className="max-w-140 mt-13 pb-27 pt-28">
              <h1 className="font-bold text-6xl mb-3 text-base-content">
                Keep your money, not subscriptions
              </h1>
              <p className="text-base-content/70 text-xl mb-12">
                Track all your subscriptions in one place and get notified
                before any payment — all for free.
              </p>
              <div className="flex row gap-8 text-base-content items-center">
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
