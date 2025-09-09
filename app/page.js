import ButtonLogin from "@/components/ButtonLogin";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-center px-4">
        <div className="max-w-2xl mx-auto">
          {/* Заголовок */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Keep your money, <br /> not your subscriptions
          </h1>

          {/* Подзаголовок */}
          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            Track all your subscriptions in one place, get alerts before
            charges, and cancel unwanted ones with a single tap.
          </p>

          {/* Кнопка CTA */}
          <div className="mt-10 flex justify-center">
            <ButtonLogin className="hover:scale-105 hover:shadow-xl">
              Join the waitlist
            </ButtonLogin>
          </div>
        </div>
      </main>
    </>
  );
}
