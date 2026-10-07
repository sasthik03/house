export type TTenantFormData = {
  name: string;
  phone: string;
  email: string;
  roomNumber: string;
  rent: string;
  floor: string;
  moveInDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  occupation: string;
  familyMembers: string;
  status: "ACTIVE" | "PREVIOUS";
};

export type TTenant = {
  id: number;
  name: string;
  phone: string;
  roomNumber: string;
  floor: string;
  rent: number;
  rentStatus: "PAID" | "PENDING";
  moveInDate: string;
  status: "ACTIVE" | "PREVIOUS";
};
export type TTenantStatus = "ACTIVE" | "PREVIOUS";
