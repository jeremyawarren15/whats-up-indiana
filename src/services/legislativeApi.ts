import axios from 'axios';
import { Bill } from './types';

// Define interfaces for the API response
interface BillsResponse {
  items: Bill[];
  itemCount: number;
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_IGA_API_URL,
  headers: {
    'Accept': 'application/json',
    'x-api-key':`${process.env.REACT_APP_IGA_API_TOKEN}`,
    'User-Agent': `iga-api-client-Token ${process.env.REACT_APP_IGA_API_TOKEN}`,
  },
});

// Session parameter should be the year (e.g. "2024")
export const getAllBills = async (session: string) => {
  try {
    const response = await api.get<BillsResponse>(`/${session}/bills`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};

export const getBill = async (session: string, billName: string) => {
  try {
    console.log(`/${session}/bills/${billName}`)
    const response = await api.get<Bill>(`/${session}/bills/${billName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bill:', error);
    throw error;
  }
};
