"use client";

import { siteConfig } from "@/app/config";
import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  Edit3,
  ImageIcon,
  MapPin,
  Maximize2,
  Save,
  SquareStack,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

type RoomStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";

export type Room = {
  id: number;
  roomNumber: string;
  floor: string;
  title: string;
  rent: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  furnishing: string;
  parking: boolean;
  utility: string;
  status: RoomStatus;
  tenant?: string;
  image?: string;
  updatedAt?: string;
};

interface RoomDetailsModalProps {
  room: Room | null;
  open: boolean;
  onClose: () => void;
  onSave?: (room: Room) => void;
}

export default function RoomDetailsModal({
  room,
  open,
  onClose,
  onSave,
}: RoomDetailsModalProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Room | null>(room);

  if (!open || !room) return null;

  const currentRoom = form ?? room;

  const updateField = <K extends keyof Room>(field: K, value: Room[K]) => {
    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleEdit = () => {
    setForm(room);
    setEditing(true);
  };

  const handleCancel = () => {
    setForm(room);
    setEditing(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form) return;

    onSave?.({
      ...form,
      updatedAt: new Date().toISOString(),
    });

    setEditing(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EF] text-[#00875A]">
              <Building2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-base font-semibold text-[#112233] sm:text-lg">
                  {currentRoom.title || `রুম ${currentRoom.roomNumber}`}
                </h2>

                <StatusBadge status={currentRoom.status} />
              </div>

              <p className="mt-0.5 text-xs text-gray-500">
                রুম #{currentRoom.roomNumber} • {currentRoom.floor}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {!editing && (
              <button
                type="button"
                onClick={handleEdit}
                className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-[#00875A]"
              >
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline">এডিট</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
          {/* Room Image / Overview */}
          <div className="border-b border-gray-100 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[220px_1fr]">
              {/* Image */}
              <div className="relative h-44 overflow-hidden rounded-xl bg-gray-100">
                {currentRoom.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentRoom.image}
                    alt={currentRoom.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="h-8 w-8" />
                    <span className="mt-2 text-xs">কোনো ছবি নেই</span>
                  </div>
                )}

                <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#112233] shadow-sm">
                  {currentRoom.roomNumber}
                </div>
              </div>

              {/* Overview */}
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    মাসিক ভাড়া
                  </p>

                  {editing ? (
                    <div className="mt-1 flex items-center">
                      <span className="text-lg font-semibold text-[#112233]">
                        ৳
                      </span>

                      <input
                        type="number"
                        value={currentRoom.rent}
                        onChange={(e) =>
                          updateField("rent", Number(e.target.value))
                        }
                        className="ml-1 w-32 border-b border-gray-300 bg-transparent text-xl font-bold text-[#112233] outline-none focus:border-[#00875A]"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-2xl font-bold text-[#112233]">
                      ৳{currentRoom.rent.toLocaleString("bn-BD")}
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        /মাস
                      </span>
                    </p>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 md:mt-0">
                  <MiniStat
                    icon={<Maximize2 />}
                    label="আয়তন"
                    value={`${currentRoom.size} sqft`}
                  />

                  <MiniStat
                    icon={<BedDouble />}
                    label="Bedroom"
                    value={currentRoom.bedrooms}
                  />

                  <MiniStat
                    icon={<Bath />}
                    label="Bathroom"
                    value={currentRoom.bathrooms}
                  />

                  <MiniStat
                    icon={<SquareStack />}
                    label="Balcony"
                    value={currentRoom.balconies}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 px-4 py-5 sm:px-6">
            {/* Basic Information */}
            <section>
              <SectionTitle title="রুমের তথ্য" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailField label="রুম / ফ্ল্যাট নম্বর">
                  {editing ? (
                    <input
                      value={currentRoom.roomNumber}
                      onChange={(e) =>
                        updateField("roomNumber", e.target.value)
                      }
                      className="input"
                    />
                  ) : (
                    <DetailValue>{currentRoom.roomNumber}</DetailValue>
                  )}
                </DetailField>

                <DetailField label="ফ্লোর">
                  {editing ? (
                    <select
                      value={currentRoom.floor}
                      onChange={(e) => updateField("floor", e.target.value)}
                      className="input"
                    >
                      <option value="GROUND">গ্রাউন্ড ফ্লোর</option>
                      <option value="1ST">১ম ফ্লোর</option>
                      <option value="2ND">২য় ফ্লোর</option>
                      <option value="3RD">৩য় ফ্লোর</option>
                      <option value="4TH">৪র্থ ফ্লোর</option>
                      <option value="5TH">৫ম ফ্লোর</option>
                    </select>
                  ) : (
                    <DetailValue>{currentRoom.floor}</DetailValue>
                  )}
                </DetailField>

                <DetailField label="রুমের নাম">
                  {editing ? (
                    <input
                      value={currentRoom.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="input"
                    />
                  ) : (
                    <DetailValue>{currentRoom.title || "—"}</DetailValue>
                  )}
                </DetailField>

                <DetailField label="স্ট্যাটাস">
                  {editing ? (
                    <select
                      value={currentRoom.status}
                      onChange={(e) =>
                        updateField("status", e.target.value as RoomStatus)
                      }
                      className="input"
                    >
                      <option value="AVAILABLE">খালি আছে</option>
                      <option value="RENTED">ভাড়া দেওয়া</option>
                      <option value="MAINTENANCE">রক্ষণাবেক্ষণ</option>
                    </select>
                  ) : (
                    <DetailValue>
                      <StatusBadge status={currentRoom.status} />
                    </DetailValue>
                  )}
                </DetailField>
              </div>
            </section>

            {/* Facilities */}
            <section>
              <SectionTitle title="সুবিধাসমূহ" />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Facility
                  icon={<BedDouble />}
                  label="Bedroom"
                  value={currentRoom.bedrooms}
                />

                <Facility
                  icon={<Bath />}
                  label="Bathroom"
                  value={currentRoom.bathrooms}
                />

                <Facility
                  icon={<SquareStack />}
                  label="Balcony"
                  value={currentRoom.balconies}
                />

                <Facility
                  icon={<Car />}
                  label="Parking"
                  value={currentRoom.parking ? "আছে" : "নেই"}
                />
              </div>
            </section>

            {/* Other Information */}
            <section>
              <SectionTitle title="অন্যান্য তথ্য" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <DetailField label="Furnishing">
                  {editing ? (
                    <select
                      value={currentRoom.furnishing}
                      onChange={(e) =>
                        updateField("furnishing", e.target.value)
                      }
                      className="input"
                    >
                      <option value="NON_FURNISHED">নন-ফার্নিশড</option>
                      <option value="SEMI_FURNISHED">সেমি-ফার্নিশড</option>
                      <option value="FULLY_FURNISHED">ফুল-ফার্নিশড</option>
                    </select>
                  ) : (
                    <DetailValue>
                      {formatFurnishing(currentRoom.furnishing)}
                    </DetailValue>
                  )}
                </DetailField>

                <DetailField label="Utility">
                  {editing ? (
                    <select
                      value={currentRoom.utility}
                      onChange={(e) => updateField("utility", e.target.value)}
                      className="input"
                    >
                      <option value="SUB_METER">সাব-মিটার</option>
                      <option value="SEPARATE_METER">আলাদা মিটার</option>
                      <option value="INCLUDED">ভাড়ার মধ্যে অন্তর্ভুক্ত</option>
                    </select>
                  ) : (
                    <DetailValue>
                      {formatUtility(currentRoom.utility)}
                    </DetailValue>
                  )}
                </DetailField>

                <DetailField label="বর্তমান Tenant">
                  <DetailValue>{currentRoom.tenant || "কেউ নেই"}</DetailValue>
                </DetailField>
              </div>
            </section>

            {/* Location */}
            <div className="flex items-start gap-3 rounded-xl bg-[#F7FBF9] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
                <MapPin className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-medium text-[#112233]">
                  {siteConfig.name}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {siteConfig.location.address} ,{siteConfig.location.city} ,
                  {siteConfig.location.division}, {siteConfig.location.country},
                </p>
              </div>
            </div>

            {/* Updated info */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CalendarDays className="h-3.5 w-3.5" />
              সর্বশেষ আপডেট:{" "}
              {currentRoom.updatedAt
                ? new Date(currentRoom.updatedAt).toLocaleDateString("bn-BD")
                : "আজ"}
            </div>
          </div>

          {/* Footer */}
          {editing ? (
            <div className="flex flex-col-reverse gap-2 border-t border-gray-100 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={handleCancel}
                className="h-10 rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                বাতিল
              </button>

              <button
                type="submit"
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#00875A] px-5 text-sm font-medium text-white hover:bg-[#007A50]"
              >
                <Save className="h-4 w-4" />
                পরিবর্তন সংরক্ষণ
              </button>
            </div>
          ) : (
            <div className="flex justify-end border-t border-gray-100 px-4 py-4 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="h-10 rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                বন্ধ করুন
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SectionTitle({ title }: { title: string }) {
  return <h3 className="mb-3 text-sm font-semibold text-[#112233]">{title}</h3>;
}

function DetailField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-gray-500">{label}</p>
      {children}
    </div>
  );
}

function DetailValue({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-10 items-center rounded-lg bg-gray-50 px-3 text-sm text-[#112233]">
      {children}
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-2.5">
      <div className="flex items-center gap-1.5 text-gray-400">
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
        <span className="text-[10px]">{label}</span>
      </div>

      <p className="mt-1 text-sm font-semibold text-[#112233]">{value}</p>
    </div>
  );
}

function Facility({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A] [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] text-gray-500">{label}</p>
        <p className="truncate text-sm font-semibold text-[#112233]">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: RoomStatus }) {
  const config = {
    AVAILABLE: {
      label: "খালি",
      className: "bg-[#EAF4EF] text-[#00875A]",
    },
    RENTED: {
      label: "ভাড়া দেওয়া",
      className: "bg-blue-50 text-blue-700",
    },
    MAINTENANCE: {
      label: "রক্ষণাবেক্ষণ",
      className: "bg-amber-50 text-amber-700",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${item.className}`}
    >
      <CheckCircle2 className="h-3 w-3" />
      {item.label}
    </span>
  );
}

function formatFurnishing(value: string) {
  const values: Record<string, string> = {
    NON_FURNISHED: "নন-ফার্নিশড",
    SEMI_FURNISHED: "সেমি-ফার্নিশড",
    FULLY_FURNISHED: "ফুল-ফার্নিশড",
  };

  return values[value] ?? value;
}

function formatUtility(value: string) {
  const values: Record<string, string> = {
    SUB_METER: "সাব-মিটার",
    SEPARATE_METER: "আলাদা মিটার",
    INCLUDED: "ভাড়ার মধ্যে অন্তর্ভুক্ত",
  };

  return values[value] ?? value;
}
