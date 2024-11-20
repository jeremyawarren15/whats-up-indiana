import { StatusBadge } from "./components/StatusBadge";
import Link from "next/link";

export default async function BillPage({params}: {params: Promise<{id: string}>}) {
  // This would eventually come from your API/Lambda
  const bill = {
    id: (await params).id,
    title: "HB 1001 - State Budget",
    summary: `This bill appropriates money for capital expenditures, the operation of the state,
    K-12 and higher education, public safety, and various other expenses.

    Key Points:
    • Allocates $17.7 billion for K-12 education
    • Increases public safety funding by 8%
    • Establishes new infrastructure development fund
    • Provides property tax relief measures

    The bill passed with bipartisan support and includes provisions for fiscal years 2024-2025.`,
    status: "Passed",
    lastUpdated: "2024-03-20",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-blue-700 hover:text-blue-900 mb-6 inline-block"
        >
          ← Back to all bills
        </Link>

        <article className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {bill.title}
          </h1>

          <div className="flex gap-4 mb-6">
            <StatusBadge status={bill.status} />
            <span className="text-gray-500 text-sm">
              Last updated: {bill.lastUpdated}
            </span>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-800 whitespace-pre-line">
              {bill.summary}
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}