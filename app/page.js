import ButtonLogin from "@/components/ButtonLogin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneDemoBlock from "@/components/PhoneDemoBlock";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main>
        {/* =======HERO===== */}
        <section className="bg-[#080816] pt-6 z-0">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto flex flex-col items-center sm:text-center lg:text-left lg:items-end lg:flex-row lg:justify-between text-left">
            <div className="max-w-140 mt-13 sm:pb-27 pb-14 sm:pt-28 pt-16 ">
              {/* или можно поставить text-6xl */}
              <h1 className="font-bold text-[clamp(38px,4.6vw,42px)] sm:text-[clamp(48px,4.6vw,60px)] leading-[1.2] mb-3 text-base-content max-w-112.5 lg:max-w-none">
                Keep your money, not subscriptions
              </h1>
              <p className="font-primary text-base-content/70 lg:text-xl sm:text-lg text-base max-w-100 sm:mx-auto lg:mx-0 sm:mb-12 mb-9 ">
                Track all your subscriptions in one place and get notified
                before any payment — all for free.
              </p>
              <div className="flex flex-row flex-wrap gap-4 sm:gap-8 text-base-content items-center justify-start sm:justify-center lg:justify-start relative z-10">
                <ButtonLogin session={session}>Join the waitlist</ButtonLogin>
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
        <section className="bg-[#0a0d16]">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20 relative z-5">
            <h2
              className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-md
  lg:max-w-2xl mx-auto"
            >
              Subscriptions are built to make you forget
            </h2>
            <p className="font-primary text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
              Companies make subscriptions automatic, piling up quietly while
              you lose money without noticing
            </p>
            <div className="font-primary flex flex-row flex-wrap lg:flex-nowrap gap-5 justify-center">
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
              ].map((item, i) => (
                <div
                  key={`problem-block-${i}`}
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
          </div>
        </section>

        {/* SOLUTION */}
        <section className="bg-custom-gradient">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20">
            <div className="flex flex-column justify-between items-end flex-wrap sm:gap-3 gap-1 mb-8 sm:mb-10 lg:mb-12">
              <h2
                className="text-[28px] sm:text-4xl lg:text-5xl font-bold sm:mb-3 max-w-md
    lg:max-w-2xl"
              >
                No more charges for forgotten subscriptions
              </h2>
              <ButtonLogin session={session} className="sm:flex hidden">
                Join the waitlist
              </ButtonLogin>
            </div>
            <div className="flex justify-between sm:gap-6 flex-wrap lg:flex-nowrap sm:mb-0 mb-8">
              <div className="flex flex-col lg:gap-12 gap-5 sm:py-6 py-0">
                <div className="font-primary">
                  <div className="flex gap-[clamp(20px,2.8vw,46px)] sm:items-center items-start">
                    <p className="text-[28px] sm:text-4xl text-base-content">
                      01/
                    </p>
                    <div>
                      <p className="text-xl">Add your subscriptions</p>
                      <p className="text-base-content/70 text-lg">
                        Easily track every subscription from a single dashboard
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-primary">
                  <div className="flex gap-[clamp(12px,2vw,34px)] sm:items-center items-start">
                    <p className="text-[28px] sm:text-4xl text-base-content">
                      02/
                    </p>
                    <div>
                      <p className="text-xl">See your stats</p>
                      <p className="text-base-content/70 text-lg">
                        Track spending and see how much you’ve saved
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-primary">
                  <div className="flex gap-[clamp(12px,2vw,34px)] sm:items-center items-start">
                    <p className="text-[28px] sm:text-4xl text-base-content">
                      03/
                    </p>
                    <div>
                      <p className="text-xl">Get smart reminders</p>
                      <p className="text-base-content/70 text-lg">
                        Get smart reminders before any charge hits your card.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ЗАМЕНЕНО: Видео плеер с автозапуском при скролле и контроллами */}
              <div className="lg:flex hidden justify-center items-center max-w-lg w-full bg-base-300 border-1 rounded-2xl border-base-100 overflow-hidden shadow-lg">
                <video
                  ref={(videoRef) => {
                    if (!videoRef) return;
                    const observer = new IntersectionObserver(
                      ([entry]) => {
                        if (entry.isIntersecting) {
                          videoRef.play().catch(() => {
                            // Автовоспроизведение заблокировано браузером (если вдруг без muted)
                          });
                        } else {
                          videoRef.pause();
                        }
                      },
                      { threshold: 0.5 }, // Срабатывает, когда видео видно на 50%
                    );
                    observer.observe(videoRef);
                  }}
                  src="/substop-darbiba.mp4" // Замените на путь к вашему видео
                  controls
                  muted
                  playsInline
                  loop
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>
            <ButtonLogin session={session} className="sm:hidden flex">
              Join the waitlist
            </ButtonLogin>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-[#0a0d16]">
          <div
            id="pricing"
            className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20"
          >
            <h2
              className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-md
  lg:max-w-2xl mx-auto"
            >
              100% Free. Forever.
            </h2>
            <p className="text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
              No hidden fees. No trials. No limits. Just powerful tools to keep
              your money where it belongs — with you.
            </p>
            <div
              className="max-w-99 mx-auto p-[1px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(to bottom right, #F43098 0%, #4D4ACC 50%, #F34700 100%)",
              }}
            >
              <div className="pt-8 pb-6 lg:px-12 sm:px-10 px-8 bg-base-300 rounded-2xl text-center">
                <p className="text-xl sm:mb-2 mb-0.5 font-bold">Free Plan</p>
                <p className="sm:text-5xl text-4xl font-bold">0$</p>
                <p className="text-base-content/70 sm:text-lg text-sm mb-8">
                  forever
                </p>
                <ul className="flex flex-col gap-2 text-sm mb-8 text-left">
                  {[
                    { pricingText: "Track unlimited subscriptions" },
                    { pricingText: "Smart reminders before charges" },
                    { pricingText: "All features included — no paywalls" },
                    { pricingText: "Lifetime access" },
                  ].map((item, i) => (
                    <li key={i}>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2 inline-block"
                      >
                        <path
                          d="M18.9418 7.20986C18.8476 7.11613 18.7357 7.04174 18.6123 6.99097C18.4889 6.9402 18.3566 6.91406 18.223 6.91406C18.0893 6.91406 17.957 6.9402 17.8336 6.99097C17.7103 7.04174 17.5983 7.11613 17.5042 7.20986L9.96192 14.6699L6.79316 11.5299C6.69545 11.4366 6.5801 11.3633 6.45369 11.3141C6.32729 11.2649 6.19232 11.2408 6.05648 11.2431C5.92063 11.2454 5.78658 11.2741 5.66198 11.3276C5.53738 11.3811 5.42466 11.4583 5.33027 11.5549C5.23588 11.6514 5.16166 11.7653 5.11184 11.8902C5.06203 12.015 5.0376 12.1484 5.03995 12.2825C5.0423 12.4167 5.07138 12.5491 5.12554 12.6722C5.1797 12.7953 5.25786 12.9066 5.35558 12.9999L9.24313 16.8399C9.33725 16.9336 9.44922 17.008 9.57258 17.0588C9.69595 17.1095 9.82828 17.1357 9.96192 17.1357C10.0956 17.1357 10.2279 17.1095 10.3513 17.0588C10.4746 17.008 10.5866 16.9336 10.6807 16.8399L18.9418 8.67986C19.0445 8.58622 19.1265 8.47257 19.1826 8.34607C19.2387 8.21957 19.2677 8.08296 19.2677 7.94486C19.2677 7.80676 19.2387 7.67015 19.1826 7.54365C19.1265 7.41715 19.0445 7.3035 18.9418 7.20986Z"
                          fill="#00D390"
                        />
                      </svg>
                      <span>{item.pricingText}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLogin session={session} className="w-full">
                  Join the waitlist
                </ButtonLogin>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-custom-gradient">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20">
            <h2
              className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-md
lg:max-w-2xl mx-auto"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
              Here’s everything you need to know before you start saving money
              with SubStop
            </p>
            <div className="flex flex-col sm:gap-3 gap-2">
              {[
                {
                  q: "How do I create an account?",
                  a: "No complicated sign-ups — just join the waitlist and you’ll be first to try SubStop when it’s ready.",
                },
                {
                  q: "Why should I track subscriptions at all?",
                  a: "Most people forget at least one subscription and waste money every month. SubStop keeps everything visible in one place so you stay in control.",
                },
                {
                  q: "How will SubStop save me money?",
                  a: "By reminding you before charges hit and showing all your active subscriptions, so you can decide what to keep or cancel.",
                },
                {
                  q: "What makes SubStop different from just writing notes?",
                  a: "Notes get messy fast. SubStop organizes subscriptions, sends reminders, and gives a clear overview in one place.",
                },
                {
                  q: "Why is it free?",
                  a: "I’m under 18 and can’t create a Stripe account yet 😅. But it’s a joy to build something useful and share it for free — so you get SubStop without paying a dime!",
                },
                {
                  q: "Is my data safe?",
                  a: "Absolutely. Your subscription data stays private and secure. It’s never sold or shared with anyone.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="max-w-198.5 mx-auto collapse collapse-arrow bg-base-300 border border-base-100 font-primary"
                >
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title sm:text-xl text-lg">
                    {item.q}
                  </div>
                  <div className="collapse-content text-sm">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a0d16]">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto pt-20 sm:pt-25 lg:pt-30 pb-15 sm:pb-18 lg:pb-20 flex flex-col">
            <h2
              className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-2xl
  lg:max-w-172.5 mx-auto"
            >
              Ready to stop wasting money on forgotten subscriptions?
            </h2>
            <p className="text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
              Join early users and take control of your subscriptions today —
              it’s free forever.
            </p>
            <ButtonLogin session={session} className="self-center">
              Join the waitlist
            </ButtonLogin>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
