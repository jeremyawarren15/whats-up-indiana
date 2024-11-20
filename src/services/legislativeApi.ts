import axios from 'axios';

interface BillResponse {
  bill: Bill;
}

interface Bill {
  base_name: string;
  origin_chamber: string; // should be either "house" or "senate"
  title: string;
  name: string; // this looks like HB1001.07.ENRS
  digest: string;
  short_description: string;
}

interface BillList {
  name: string;
  base_name: string;
  chamber: string; // should be either "house" or "senate"
}

// Define interfaces for the API response
interface BillsResponse {
  bills: BillList[];
  itemCount: number;
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_IGA_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Session parameter should be the year (e.g. "2024")
export const getAllBills = async (session: string) => {
  try {
    const response = await api.get<BillsResponse>('/getBills', {
      params: {
        session_lpid: `session_${session}`
      }
    });
    return response.data.bills;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};

export const getBill = async (session: string, billName: string) => {
  try {
    const session_lpid = `session_${session}`;
    const response = await api.get<BillResponse>(`/getBillDetails`, {
      params: {
        session_lpid,
        bill_basename: billName
      }
    });
    return response.data.bill;
  } catch (error) {
    console.error('Error fetching bill:', error);
    throw error;
  }
};

export const getLatestBillPdfUrl = async (session: string, billName: string) => {
  const bill = await getBill(session, billName)
  return `${process.env.IN_GOV_WEBSITE_URL}/pdf-documents/123/${session}/${bill.origin_chamber}/bills/${billName}/${bill.name}.pdf`
}
