export default function Home() {
  // This would eventually come from your API/Lambda
  const bills = [
    {
      id: 1,
      title: "HB 1001 - State Budget",
      excerpt: "Appropriates money for capital expenditures, the operation of the state, K-12 and higher education, public safety, and various other expenses.",
    },
    {
      id: 2,
      title: "SB 2023 - Education Reform",
      excerpt: "Implements changes to the state's education system including teacher pay and classroom size requirements.",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          What's Up, Indiana?
        </h1>

        <div className="space-y-6">
          {bills.map((bill) => (
            <article
              key={bill.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-50"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{bill.title}</h2>
              <p className="text-gray-800">{bill.excerpt}</p>
              <button className="mt-4 text-blue-700 hover:text-blue-900">
                Read full summary →
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
