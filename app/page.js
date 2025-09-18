import ButtonLogin from "@/components/ButtonLogin";
import Header from "@/components/Header";
import FaqListItem from "@/components/FaqListItem";
import Footer from "@/components/Footer";

export default function Home() {
  const name = "Marc";
  const isLoggedIn = true;

  return (
    <>
      <Header />
      <main>
        {/* =======HERO===== */}
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
              Keep your money, <br /> not your subscriptions
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
              Track all your subscriptions in one place, get alerts before
              charges, and cancel unwanted ones with a single tap.
            </p>

            <div className="mt-10 flex justify-center">
              <ButtonLogin className="shadow-lg font-semibold transition-all hover:scale-105 hover:shadow-xl">
                Join the waitlist
              </ButtonLogin>
            </div>
          </div>
        </section>

        {/* =======PROBLEM===== */}
        <section id="problem" className="py-20 bg-base-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
              Why this matters
            </h2>
            <p className="text-base-content/70 mb-12 text-lg">
              Forgotten subscriptions waste your money every month. Managing
              multiple services across different platforms is hard and
              time-consuming.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-base-200 p-6 rounded shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Stop Wasting Money
                </h3>
                <p className="text-base-content/70">
                  Get notified before any charge and avoid unwanted automatic
                  payments.
                </p>
              </div>
              <div className="bg-base-200 p-6 rounded shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Track Everything in One Place
                </h3>
                <p className="text-base-content/70">
                  See all your subscriptions together without logging into
                  multiple accounts.
                </p>
              </div>
              <div className="bg-base-200 p-6 rounded shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Take Control
                </h3>
                <p className="text-base-content/70">
                  Cancel or manage subscriptions easily with a single click —
                  simple and stress-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======HOW IT WORKS===== */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200"
        >
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
              How SubStop Works
            </h2>
            <p className="text-base-content/70 mb-12 text-lg">
              Managing your subscriptions is simple, fast, and stress-free.
            </p>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-base-100 p-8 rounded shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-content text-lg font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Add Your Subscriptions
                </h3>
                <p className="text-base-content/70">
                  Connect your accounts and see all active subscriptions in one
                  beautiful dashboard.
                </p>
              </div>
              <div className="flex-1 bg-base-100 p-8 rounded shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-content text-lg font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Get Smart Alerts
                </h3>
                <p className="text-base-content/70">
                  Receive timely notifications before charges so you can avoid
                  unwanted payments.
                </p>
              </div>
              <div className="flex-1 bg-base-100 p-8 rounded shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-content text-lg font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Take Control
                </h3>
                <p className="text-base-content/70">
                  Cancel subscriptions with a single click and manage your
                  spending effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====PRICING==== */}
        <section id="pricing" className="py-20 bg-base-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
              100% Free. Forever.
            </h2>
            <p className="text-base-content/70 mb-12 text-lg">
              No hidden fees, no subscriptions, no limits. Just powerful tools
              to manage your subscriptions — completely free.
            </p>

            <div className="bg-base-100 shadow-md hover:shadow-xl transition-all p-10 rounded border border-primary max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-base-content">
                Free Plan
              </h3>
              <p className="mt-2 text-5xl font-bold text-primary">$0</p>
              <p className="text-base-content/70 mb-8">forever</p>

              <ul className="text-left space-y-3 mb-8">
                {[
                  "Track unlimited subscriptions",
                  "Smart reminders before charges",
                  "Cancel unwanted subscriptions in 1 click",
                  "All features included — no paywall",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base-content">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="btn btn-primary w-full text-lg font-semibold transition-all hover:scale-105">
                Start for Free
              </button>
            </div>
          </div>
        </section>

        {/* ====FAQ==== */}
        <section id="faq" className="py-20 bg-base-200">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <ul>
              {[
                {
                  question: "What is SubStop?",
                  answer:
                    "SubStop is a free app that helps you track all your subscriptions in one place, get reminders before charges, and cancel unwanted ones with a single tap.",
                },
                {
                  question: "Is it really free?",
                  answer:
                    "Yes! SubStop is 100% free — no hidden fees, no trials, no paywalls. You get access to all features without paying anything.",
                },
                {
                  question: "Do I need to add my credit card?",
                  answer:
                    "Nope. SubStop does not require your credit card to get started. You simply connect your subscriptions and start managing them right away.",
                },
                {
                  question: "Can I use it on my phone?",
                  answer:
                    "Yes. SubStop works perfectly on both desktop and mobile, so you can manage your subscriptions anytime, anywhere.",
                },
                {
                  question: "How does SubStop help me save money?",
                  answer:
                    "By reminding you before payments are due and showing all your active subscriptions in one dashboard, SubStop helps you avoid surprise charges and cancel services you don’t use.",
                },
                {
                  question: "Is my data safe?",
                  answer:
                    "Absolutely. We take privacy seriously — your subscription data is stored securely, and we never sell your information to third parties.",
                },
              ].map((qa) => (
                <FaqListItem key={qa.question} qa={qa} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
