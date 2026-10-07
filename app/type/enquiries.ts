export type TEnquiry = {
  id: number;
  name: string;
  phone: string;
  roomNumber: string;
  subject: string;
  message: string;
  date: string;
  status: TEnquiryStatus;
  followUpDate?: string;
};
export type TEnquiryStatus = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";
