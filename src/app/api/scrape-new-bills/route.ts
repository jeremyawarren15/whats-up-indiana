import {
  analyzeBillText,
  extractBillText,
  getAllBills,
  getLatestBillPdfUrl,
} from "@/services/legislativeApi";
import { db } from "@/db";
import { bills } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const newBills = await getAllBills("2024");

  for (const bill of newBills) {
    const [existingBill] = await db
      .select()
      .from(bills)
      .where(eq(bills.name, bill.name))
      .limit(1);

    const pdfUrl = await getLatestBillPdfUrl("2024", bill.name);
    const billText = await extractBillText(pdfUrl);
    const summary = await analyzeBillText(billText);

    if (!existingBill) {
      await db.insert(bills).values({
        baseName: bill.base_name,
        originChamber: bill.chamber,
        name: bill.name,
        title: "",
        digest: "",
        shortDescription: "",
        summary,
      });
    }
  }

  return Response.json({
    status: "success",
    message: "Scraping completed",
  });
}
