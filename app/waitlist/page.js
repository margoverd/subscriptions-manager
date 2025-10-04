import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Waitlist() {
  return (
    <>
      <Header />
      <main className="mt-13 sm:pb-27 pb-14 sm:pt-28 pt-16 *:bg-custom-gradient min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-14 lg:px-20 relative">
        <div className="max-w-2xl w-full">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdg4oK71AoKVffrCGgD_N6t_6VWXOdmpQadZXMs4KBfsg_J9g/viewform?embedded=true"
            width="640"
            height="472"
          >
            Loading…
          </iframe>

          <Link
            href="/"
            className="btn btn-primary rounded-lg shadow-none py-2 px-6 sm:py-3 sm:px-8 bg-primary hover:opacity-70 transition font-normal text-base-content text-base sm:text-lg mt-8"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
