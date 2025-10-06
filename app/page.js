import Contact from "@/components/Contacts";
import ButtonWaitlist from "@/components/ButtonWaitlist";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneDemoBlock from "@/components/PhoneDemoBlock";

export default async function Home() {
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
              <p className="font-primary text-base-content/70 lg:text-xl sm:text-lg text-base max-w-120 sm:mx-auto lg:mx-0 sm:mb-12 mb-9 ">
                Track all your subscriptions and get notified before any payment
                — all in one place .
              </p>
              <div className="flex flex-row flex-wrap gap-4 sm:gap-5 text-base-content items-center justify-start sm:justify-center lg:justify-start relative z-10">
                <ButtonWaitlist>Join before launch</ButtonWaitlist>
                <p>
                  🚀{" "}
                  <span className="opacity-60 text-sm sm:text-base">
                    Get 67% off{" "}
                    <span className="hidden sm:inline">
                      ($8 instead of $24)
                    </span>
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
            className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-md
lg:max-w-2xl mx-auto"
          >
            Subscriptions are built to make you forget
          </h2>
          <p className="font-primary text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
            Companies make subscriptions automatic, piling up quietly while you
            lose money without noticing
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
        </section>

        {/* PROBLEM COMPARE */}
        <section className="bg-[#080816] max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20">
          <h2 className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center mx-auto mb-8 sm:mb-10 lg:mb-12">
            Why SubStop Makes a Difference
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 w-fit mx-auto gap-5">
            <div className="pt-8 pb-8 lg:px-12 sm:px-10 px-8 bg-success/20 rounded-2xl relative">
              <p className="text-xl mb-2 font-bold">With SubStop</p>
              <ul className="flex flex-col gap-2 text-sm text-left">
                {[
                  {
                    text: "Track all subscriptions and save money",
                  },
                  {
                    text: "Get reminders before any charge",
                  },
                  {
                    text: "One clear dashboard with stats",
                  },
                  {
                    text: "Know exactly how much you’ve spend",
                  },
                ].map((item, i) => {
                  return (
                    <li
                      key={`problemSolText${i}`}
                      className="flex items-center gap-3"
                    >
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block flex-shrink-0"
                      >
                        <path
                          d="M18.9418 7.20986C18.8476 7.11613 18.7357 7.04174 18.6123 6.99097C18.4889 6.9402 18.3566 6.91406 18.223 6.91406C18.0893 6.91406 17.957 6.9402 17.8336 6.99097C17.7103 7.04174 17.5983 7.11613 17.5042 7.20986L9.96192 14.6699L6.79316 11.5299C6.69545 11.4366 6.5801 11.3633 6.45369 11.3141C6.32729 11.2649 6.19232 11.2408 6.05648 11.2431C5.92063 11.2454 5.78658 11.2741 5.66198 11.3276C5.53738 11.3811 5.42466 11.4583 5.33027 11.5549C5.23588 11.6514 5.16166 11.7653 5.11184 11.8902C5.06203 12.015 5.0376 12.1484 5.03995 12.2825C5.0423 12.4167 5.07138 12.5491 5.12554 12.6722C5.1797 12.7953 5.25786 12.9066 5.35558 12.9999L9.24313 16.8399C9.33725 16.9336 9.44922 17.008 9.57258 17.0588C9.69595 17.1095 9.82828 17.1357 9.96192 17.1357C10.0956 17.1357 10.2279 17.1095 10.3513 17.0588C10.4746 17.008 10.5866 16.9336 10.6807 16.8399L18.9418 8.67986C19.0445 8.58622 19.1265 8.47257 19.1826 8.34607C19.2387 8.21957 19.2677 8.08296 19.2677 7.94486C19.2677 7.80676 19.2387 7.67015 19.1826 7.54365C19.1265 7.41715 19.0445 7.3035 18.9418 7.20986Z"
                          fill="#00D390"
                        />
                      </svg>
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="pt-8 pb-8 lg:px-12 sm:px-10 px-8 bg-error/20 rounded-2xl relative">
              <p className="text-xl mb-2 font-bold">Old Way</p>
              <ul className="flex flex-col gap-2 text-sm text-left">
                {[
                  {
                    text: "You don’t know how many subscriptions you actually have",
                  },
                  {
                    text: "No clear picture of your monthly or yearly spending",
                  },
                  {
                    text: "Get surprise charges with no warning",
                  },
                  {
                    text: "Keep paying for apps you no longer use",
                  },
                ].map((item, i) => {
                  return (
                    <li
                      key={`problemText${i}`}
                      className="flex items-center gap-3"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-error"
                      >
                        <path
                          className="fill-error"
                          d="M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z"
                          fill="black"
                        />
                      </svg>
                      <span>{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="about" className="bg-custom-gradient">
          <div className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20">
            <div className="flex flex-column justify-between items-end flex-wrap sm:gap-3 gap-1 mb-8 sm:mb-10 lg:mb-12">
              <h2
                className="text-[28px] sm:text-4xl lg:text-5xl font-bold sm:mb-3 max-w-md
    lg:max-w-2xl"
              >
                No more charges for forgotten subscriptions
              </h2>
              <ButtonWaitlist className="sm:flex hidden">
                Stop Wasting Money
              </ButtonWaitlist>
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
                        Get reminders before any charge hits your card.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:flex hidden justify-center items-center max-w-lg w-full bg-base-300 border-1 rounded-2xl border-base-100">
                <p className="text-base-content/20 text-sm max-w-xs text-center">
                  Oops, no demo yet :( <br />
                  The final details are still being polished before showing how
                  SubStop works!
                </p>
              </div>
            </div>
            <ButtonWaitlist className="sm:hidden flex">
              Stop Wasting Money
            </ButtonWaitlist>
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto py-15 sm:py-18 lg:py-20"
        >
          <h2 className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center mx-auto">
            Join now and get 67% discount!
          </h2>
          <p className="text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-140 mx-auto opacity-70">
            We’re all tired of endless subscriptions. Pay once and take full
            control of your spending — early birds get a special discount
          </p>
          <div
            className="max-w-99 mx-auto p-[1px] rounded-2xl"
            style={{
              background:
                "linear-gradient(to bottom right, #F43098 0%, #4D4ACC 50%, #F34700 100%)",
            }}
          >
            <div className="pt-8 pb-6 lg:px-12 sm:px-10 px-8 bg-base-300 rounded-2xl text-center relative">
              <div className="absolute w-max -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-base-300 font-semibold rounded-lg text-sm bg-gradient-to-r from-[#ff54af] to-[#6563c5]">
                Exclusive Early Bird Offer
              </div>

              <p className="text-xl sm:mb-2 mb-0.5 font-bold">PRO Plan</p>

              <div className="relative inline-block gap-3 mb-2">
                <p className="absolute sm:-left-10 -left-8 bottom-1 sm:text-lg text-sm text-base-content/70 line-through">
                  $24
                </p>
                <p className="sm:text-5xl text-4xl font-bold z-10">$8</p>
              </div>

              <p className="text-base-content/70 sm:text-lg text-sm mb-8">
                forever
              </p>

              <ul className="flex flex-col gap-2 text-sm mb-8 text-left">
                {[
                  { pricingText: "Track unlimited subscriptions" },
                  { pricingText: "Smart reminders before charges" },
                  { pricingText: "Detailed spending stats and savings" },
                  { pricingText: "Lifetime access" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block flex-shrink-0"
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

              <ButtonWaitlist className="w-full mb-2">
                Claim Your Discount
              </ButtonWaitlist>

              <p className="text-[12px] text-base-content/70">
                One payment. Full subscription control.
              </p>
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
                  q: "What is SubStop?",
                  a: "SubStop is a tool that helps you track all your subscriptions in one place, see how much you spend, and get reminders before charges — so you stay in control of your money.",
                },
                {
                  q: "How do I create an account?",
                  a: "No complicated sign-ups — join the waitlist and receive your exclusive early bird link with a special discount before launch.",
                },
                {
                  q: "Why should I track subscriptions at all?",
                  a: "Most people forget at least one subscription and waste money every month. SubStop keeps everything visible in one place so you never get surprised by charges.",
                },
                {
                  q: "How will SubStop save me money?",
                  a: "By reminding you before payments are due and showing all your active subscriptions, you can decide which ones to keep and which to cancel.",
                },
                {
                  q: "What makes SubStop different from just writing notes?",
                  a: "Notes get messy fast. SubStop organizes subscriptions, provides smart reminders, and gives a clear overview in one place.",
                },
                {
                  q: "Have more questions?",
                  a: `Just reach out! You can DM me on <a href="${Contact.twitter}" target="_blank" class="underline">X</a> or email me at <a href="mailto:${Contact.email}" class="underline">${Contact.email}</a>.`,
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
                  <div
                    className="collapse-content text-sm"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1320px] w-full px-5 sm:px-14 lg:px-20 mx-auto pt-20 sm:pt-25 lg:pt-30 pb-15 sm:pb-18 lg:pb-20 flex flex-col">
          <h2
            className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3 text-center max-w-2xl
lg:max-w-172.5 mx-auto"
          >
            Ready to stop wasting money on forgotten subscriptions?
          </h2>
          <p className="text-base lg:text-lg mb-8 sm:mb-10 lg:mb-12 text-center max-w-115 lg:max-w-130 mx-auto opacity-70">
            Take full control of your subscriptions — join early and lock in 67%
            off!
          </p>
          <ButtonWaitlist className="self-center">
            Join the waitlist
          </ButtonWaitlist>
        </section>
      </main>
      <Footer />
    </>
  );
}
