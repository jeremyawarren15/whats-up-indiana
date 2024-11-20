import { getAllBills } from "@/services/legislativeApi";
import { db } from "@/db";
import { bills } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const newBills = await getAllBills("2024");

  for (const bill of newBills) {
    // const existingBill = await db.query.bills.findFirst({
    //   where: eq(schema.bills.name, bill.base_name),
    // });

    const [existingBill] = await db
      .select()
      .from(bills)
      .where(eq(bills.name, bill.name))
      .limit(1);

    console.log(
      `Bill ${bill.base_name}: ${existingBill ? "already exists" : "is new"}`
    );

    if (!existingBill) {
      console.log(`Creating record for bill ${bill.base_name}`);
      // Insert new bill
      await db.insert(bills).values({
        baseName: bill.base_name,
        originChamber: bill.chamber,
        name: bill.name,
        title: "",
        digest: "",
        shortDescription: "",
      });

      // This is probably where we want to call the LLM to generate the summary
      // and then insert the summary into the bill_summaries table
    }
  }

  return Response.json({
    status: "success",
    message: "Scraping completed",
  });
}
