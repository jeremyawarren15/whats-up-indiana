import { db } from "@/db";

async function getBillSummaries() {
  const summariesWithBills = await db.query.billSummaries.findMany({
    with: {
      bill: true,
    },
  });

  return summariesWithBills;
}

export default async function Home() {
  // This would eventually come from your API/Lambda
  const bills = await getBillSummaries();
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
          What&apos;s Up, Indiana?
        </h1>

        <div className="space-y-6">
          {bills.map((bill) => (
            <article
              key={bill.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-50"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {bill.bill}
              </h2>
              <p className="text-gray-800">{bill.bill}</p>
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
