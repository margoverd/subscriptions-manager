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
                  🚀{" "}
                  <span className="opacity-60 text-sm sm:text-base">
                    Join before launch
                  </span>
                </p>
              </div>
            </div>
            <PhoneDemoBlock />
          </div>
        </section>

        {/* ======PROBLEM===== */}
        <section className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20 relative z-5">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-md
lg:max-w-2xl mx-auto"
          >
            Subscriptions are built to make you forget
          </h2>
          <p className="text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
            Companies make subscriptions automatic, piling up quietly while you
            lose money without noticing
          </p>
          <div className="flex flex-row flex-wrap lg:flex-nowrap gap-5 justify-center">
            {[
              {
                icon: "💸",
                text: "You keep paying for stuff you forgot",
              },
              {
                icon: "😪",
                text: "Tracking everything is a mess",
              },
              {
                icon: "😭",
                text: "Charges hit when you least expect them",
              },
            ].map((item) => (
              <div
                key={`problem-block-${item}`}
                className="pt-6 pb-6.5 sm:pt-8 sm:pb-8.5 px-8 flex items-center flex-col gap-4 sm:gap-6 bg-base-300 border-1 rounded-2xl border-base-100 max-w-xs lg:max-w-none w-full"
              >
                <span className="text-5xl lg:text-[64px] leading-none">
                  {item.icon}
                </span>
                <p className="text-base lg:text-xl opacity-70 max-w-44.5 lg:max-w-52 text-center">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SOLUTION */}
        <section className="bg-custom-gradient">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20">
            <div className="flex flex-column justify-between items-end flex-wrap sm:gap-3 gap-1 mb-8 sm:mb-10 lg:mb-12">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 max-w-md
  lg:max-w-2xl"
              >
                No more charges for forgotten subscriptions
              </h2>
              <ButtonLogin>Join the waitlist</ButtonLogin>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-12 py-6">
                <div className="font-primary">
                  <div className="flex gap-11.5 items-center">
                    <p className="text-4xl text-base-content">01/</p>
                    <div>
                      <p className="text-xl">Add your subscriptions</p>
                      <p className="text-base-content/70 text-lg">
                        Easily track every subscription from a single dashboard
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-primary">
                  <div className="flex gap-8.5 items-center">
                    <p className="text-4xl text-base-content">02/</p>
                    <div>
                      <p className="text-xl">See your stats</p>
                      <p className="text-base-content/70 text-lg">
                        Track spending and see how much you’ve saved
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-primary">
                  <div className="flex gap-8.5 items-center">
                    <p className="text-4xl text-base-content">03/</p>
                    <div>
                      <p className="text-xl">Get smart reminders</p>
                      <p className="text-base-content/70 text-lg">
                        Get smart reminders before any charge hits your card.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center max-w-lg w-full bg-base-300 border-1 rounded-2xl border-base-100">
                <p className="text-base-content/20 text-sm max-w-xs text-center">
                  Oops, no demo yet :( <br />
                  The final details are still being polished before showing how
                  SubStop works!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
