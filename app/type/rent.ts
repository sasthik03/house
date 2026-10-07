export type TPaymentStatus = "PAID" | "PENDING" | "OVERDUE";

export type TRentPayment = {
  id: number;
  tenant: string;
  phone: string;
  roomNumber: string;
  month: string;
  rent: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: TPaymentStatus;
  paymentMethod?: string;
  note?: string;
};
