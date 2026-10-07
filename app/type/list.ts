export type RoomStatus = "খালি আছে" | "বুকড";

export type TRoomType = "ফুল-ফার্নিশড" | "সেমি-ফার্নিশড" | "নন-ফার্নিশড";

export type TRentType = "মাসিক";

export type TParkingType = "আছে" | "নেই";

export type TRoom = {
  id: number;
  title: string;
  price: string;
  status: RoomStatus;

  image: string;
  gallery: string[];

  beds: string;
  baths: string;
  balcony: string;
  size: string;

  type: TRoomType;
  rentType: TRentType;
  parking: TParkingType;
  electricity: string;
};
