import Link from "next/link";

export default async function Tos() {
  return (
    <main className="max-w-xl mx-auto p-5">
      <Link href="/dashboard" className="btn btn-ghost mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </Link>

      <h1 className="text-3xl font-extrabold pb-6">Privacy Policy</h1>

      <div className="leading-relaxed space-y-6 text-base-content/90">
        <p>
          <strong>Effective Date:</strong> February 17, 2026
        </p>

        <section>
          <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
          <p>
            Welcome to SubStop.cc. We respect your privacy and are committed to
            protecting your personal data. This policy explains how we handle
            your information when you use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Data:</strong> Name, email address, and payment
              information provided during account creation or subscription.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              application to improve our services.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">3. Why We Collect Data</h2>
          <p>
            We use your data to provide the service, process payments, and send
            you important updates regarding your account or upcoming
            subscription charges.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">4. Data Sharing</h2>
          <p>
            We do not sell your personal data. We only share information with
            third-party providers (like Stripe for payments) necessary to
            operate the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">5. Your Rights</h2>
          <p>
            Under GDPR, you have the right to access, export, or delete your
            personal data. You can do this directly from your Account Settings
            page.
          </p>
        </section>

        <section className="pt-6 border-t border-white/10">
          <p>
            If you have any questions, contact us at:{" "}
            <a
              href="mailto:margarita0work@gmail.com"
              className="link link-primary"
            >
              margarita0work@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
