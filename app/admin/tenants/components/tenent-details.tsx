"use client";

import {
  CalendarDays,
  Edit3,
  Home,
  Phone,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type TenantStatus = "ACTIVE" | "PREVIOUS";

type Tenant = {
  id: number;
  name: string;
  phone: string;
  roomNumber: string;
  floor: string;
  rent: number;
  rentStatus: "PAID" | "PENDING";
  moveInDate: string;
  status: TenantStatus;
};

interface TenantDetailsModalProps {
  tenant: Tenant | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (tenant: Tenant) => void;
}

export default function TenantDetailsModal({
  tenant,
  open,
  onClose,
  onEdit,
}: TenantDetailsModalProps) {
  if (!open || !tenant) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-xl  h-screen overflow-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Avatar name={tenant.name} />

            <div>
              <h2 className="text-base font-semibold text-[#112233]">
                {tenant.name}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                ভাড়াটিয়ার বিস্তারিত তথ্য
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="p-4 sm:p-6">
          <div className="rounded-xl bg-[#F7FBF9] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-gray-500">বর্তমান রুম</p>

                <p className="mt-1 flex items-center gap-2 text-lg font-bold text-[#112233]">
                  <Home className="h-5 w-5 text-[#00875A]" />
                  {tenant.roomNumber}
                </p>

                <p className="mt-1 text-xs text-gray-500">{tenant.floor}</p>
              </div>

              <RentStatus status={tenant.rentStatus} />
            </div>
          </div>

          {/* Info */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <InfoCard icon={<Phone />} label="মোবাইল" value={tenant.phone} />

            <InfoCard
              icon={<WalletCards />}
              label="মাসিক ভাড়া"
              value={`৳${tenant.rent.toLocaleString("bn-BD")}`}
            />

            <InfoCard
              icon={<CalendarDays />}
              label="যোগদানের তারিখ"
              value={formatDate(tenant.moveInDate)}
            />

            <InfoCard
              icon={<UserRound />}
              label="স্ট্যাটাস"
              value={tenant.status === "ACTIVE" ? "বর্তমান" : "পূর্ববর্তী"}
            />
          </div>

          {/* Rent history preview */}
          <div className="mt-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-[#112233]">
                  সাম্প্রতিক ভাড়া
                </h3>

                <p className="mt-0.5 text-[11px] text-gray-500">
                  শেষ কয়েকটি payment status
                </p>
              </div>

              <button className="text-xs font-medium text-[#00875A] hover:underline">
                সব দেখুন
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              <RentRow
                month="অক্টোবর ২০২৬"
                amount={tenant.rent}
                status={tenant.rentStatus}
              />

              <RentRow
                month="সেপ্টেম্বর ২০২৬"
                amount={tenant.rent}
                status="PAID"
              />

              <RentRow month="আগস্ট ২০২৬" amount={tenant.rent} status="PAID" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              বন্ধ করুন
            </button>

            <button
              type="button"
              onClick={() => onEdit?.(tenant)}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#00875A] px-5 text-sm font-medium text-white hover:bg-[#007A50]"
            >
              <Edit3 className="h-4 w-4" />
              তথ্য পরিবর্তন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("");

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4EF] text-xs font-semibold text-[#00875A]">
      {initials}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
      <div className="flex items-center gap-1.5 text-gray-400">
        <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>

        <span className="text-[10px]">{label}</span>
      </div>

      <p className="mt-1.5 truncate text-sm font-semibold text-[#112233]">
        {value}
      </p>
    </div>
  );
}

function RentStatus({ status }: { status: "PAID" | "PENDING" }) {
  return status === "PAID" ? (
    <span className="rounded-full bg-[#EAF4EF] px-2.5 py-1 text-[10px] font-medium text-[#00875A]">
      পরিশোধিত
    </span>
  ) : (
    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700">
      বকেয়া
    </span>
  );
}

function RentRow({
  month,
  amount,
  status,
}: {
  month: string;
  amount: number;
  status: "PAID" | "PENDING";
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-xs font-medium text-[#112233]">{month}</p>

        <p className="mt-0.5 text-[11px] text-gray-400">
          ৳{amount.toLocaleString("bn-BD")}
        </p>
      </div>

      <RentStatus status={status} />
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
