export default function Dashboard() {
  const subscriptions = [
    {
      name: "Netflix",
      price: 15,
      period: "/mo",
      nextCharge: "Sep 23",
      status: "upcoming",
      logo: "🎬",
    },
    {
      name: "Spotify",
      price: 10,
      period: "/mo",
      nextCharge: "Sep 28",
      status: "active",
      logo: "🎵",
    },
    {
      name: "YouTube Premium",
      price: 12,
      period: "/mo",
      nextCharge: "Oct 2",
      status: "active",
      logo: "▶️",
    },
    {
      name: "Dropbox",
      price: 9,
      period: "/mo",
      nextCharge: "Sep 20",
      status: "warning",
      logo: "☁️",
    },
  ];

  const totalSpend = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-base-200 rounded-lg p-4 shadow">
            <p className="text-sm text-base-content/70">This month you saved</p>
            <p className="text-2xl font-bold text-primary">$24</p>
          </div>
          <div className="bg-base-200 rounded-lg p-4 shadow">
            <p className="text-sm text-base-content/70">Active subscriptions</p>
            <p className="text-2xl font-bold">{subscriptions.length}</p>
          </div>
          <div className="bg-base-200 rounded-lg p-4 shadow">
            <p className="text-sm text-base-content/70">Total spend / month</p>
            <p className="text-2xl font-bold text-error">${totalSpend}</p>
          </div>
          <div className="bg-base-200 rounded-lg p-4 shadow">
            <p className="text-sm text-base-content/70 mb-1">
              Savings progress
            </p>
            <progress
              className="progress progress-primary w-full"
              value="40"
              max="100"
            ></progress>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex gap-3">
          <button className="btn btn-sm btn-outline">Sort by price</button>
          <button className="btn btn-sm btn-outline">Sort by date</button>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-sm btn-primary">Upcoming charges</button>
        </div>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((sub, i) => (
          <div
            key={i}
            className="relative p-6 rounded-lg shadow bg-base-200 border border-base-300 transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            {/* Badge */}
            <div className="absolute top-3 right-3">
              {sub.status === "warning" && (
                <span className="badge badge-error">Warning</span>
              )}
              {sub.status === "upcoming" && (
                <span className="badge badge-primary">Upcoming</span>
              )}
              {sub.status === "active" && (
                <span className="badge badge-success">Active</span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{sub.logo}</div>
              <h3 className="text-xl font-semibold">{sub.name}</h3>
            </div>
            <p className="text-lg font-bold text-primary">
              ${sub.price} {sub.period}
            </p>
            <p className="text-sm text-base-content/70">
              Next charge: {sub.nextCharge}
            </p>
          </div>
        ))}

        {/* Add Subscription Card */}
        <div className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-base-300 text-base-content/70 hover:border-primary hover:text-primary transition-all cursor-pointer">
          <span className="text-4xl mb-2">＋</span>
          <p className="font-semibold">Add Subscription</p>
        </div>
      </div>

      {/* Floating Action Button (mobile style) */}
      <button className="btn btn-primary btn-lg rounded-full shadow-lg fixed bottom-6 right-6 hover:scale-110 transition-transform">
        ＋
      </button>
    </div>
  );
}
