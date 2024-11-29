import axios from "axios";
import { OpenAI } from "openai";
import pdf from "pdf-parse";

interface BillResponse {
  bill: Bill;
}

// Define interfaces for the API response
interface BillsResponse {
  bills: BillList[];
  itemCount: number;
}

export interface Bill {
  base_name: string;
  origin_chamber: string; // should be either "house" or "senate"
  title: string;
  name: string; // this looks like HB1001.07.ENRS
  digest: string;
  short_description: string;
}

export interface BillList {
  name: string;
  base_name: string;
  chamber: string; // should be either "house" or "senate"
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_IGA_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Session parameter should be the year (e.g. "2024")
export const getAllBills = async (session: string) => {
  try {
    const response = await api.get<BillsResponse>("/getBills", {
      params: {
        session_lpid: `session_${session}`,
      },
    });
    return response.data.bills;
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw error;
  }
};

export const getBill = async (session: string, billName: string) => {
  try {
    const session_lpid = `session_${session}`;
    const response = await api.get<BillResponse>(`/getBillDetails`, {
      params: {
        session_lpid,
        bill_basename: billName,
      },
    });
    return response.data.bill;
  } catch (error) {
    console.error("Error fetching bill:", error);
    throw error;
  }
};

export const extractBillText = async (pdfUrl: string) => {
  try {
    // Download the PDF file
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfBuffer = Buffer.from(response.data);

    // Extract text from PDF
    const pdfData = await pdf(pdfBuffer);
    return pdfData.text;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw error;
  }
};

export const analyzeBillText = async (billText: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that analyzes legislative bills. Please provide a concise summary and digest of the following bill text.",
        },
        {
          role: "user",
          content: billText,
        },
      ],
      temperature: 0.3,
    });

    return {
      title: response.choices[0].message.content?.split("\n")[0] || "",
      digest: response.choices[0].message.content || "",
    };
  } catch (error) {
    console.error("Error analyzing bill text with OpenAI:", error);
    throw error;
  }
};

// Modify getLatestBillPdfUrl to include text extraction and analysis
export const getLatestBillPdfUrl = async (
  session: string,
  billName: string
) => {
  const bill = await getBill(session, billName);
  return `${process.env.IN_GOV_WEBSITE_URL}/pdf-documents/123/${session}/${bill.origin_chamber}/bills/${billName}/${bill.name}.pdf`;
};
