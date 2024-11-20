import { getAllBills, getBill } from "@/services/legislativeApi"

export async function GET() {
  const bills = await getAllBills("2024")
  const bill = await getBill("2024", bills[0].billName)

  return Response.json({
    status: 'success',
    message: 'Scraping completed',
    digest: bill.latestVersion.digest,
  })
}
