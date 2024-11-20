import { getAllBills, getBill, getLatestBillPdfUrl } from "@/services/legislativeApi"

export async function GET() {
  const bills = await getAllBills("2024")

  return Response.json({
    status: 'success',
    message: 'Scraping completed',
    bills
   })
}
