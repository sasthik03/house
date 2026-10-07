"use client";

import { Avatar } from "@/app/components/ui/avatar";
import { TPaymentStatus, TRentPayment } from "@/app/type/rent";
import { formatDate } from "@/app/utils";
import { ActionButton } from "@/components/action-button";
import { FilterSelect } from "@/components/filter-select";
import { StatusBadge } from "@/components/status-bagde";
import { SummaryCard } from "@/components/summary-card";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Eye,
  Filter,
  Search,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const initialPayments: TRentPayment[] = [
  {
    id: 1,
    tenant: "রাকিব হাসান",
    phone: "01712-345678",
    roomNumber: "১০১",
    month: "অক্টোবর ২০২৬",
    rent: 4500,
    paidAmount: 4500,
    dueDate: "2026-10-10",
    paidDate: "2026-10-05",
    status: "PAID",
    paymentMethod: "Cash",
  },
  {
    id: 2,
    tenant: "সুমাইয়া আক্তার",
    phone: "01812-456789",
    roomNumber: "১০২",
    month: "অক্টোবর ২০২৬",
    rent: 3500,
    paidAmount: 0,
    dueDate: "2026-10-10",
    status: "PENDING",
  },
  {
    id: 3,
    tenant: "আরিফুল ইসলাম",
    phone: "01912-567890",
    roomNumber: "১০৫",
    month: "অক্টোবর ২০২৬",
    rent: 3800,
    paidAmount: 3800,
    dueDate: "2026-10-10",
    paidDate: "2026-10-04",
    status: "PAID",
    paymentMethod: "bKash",
  },
  {
    id: 4,
    tenant: "মাহমুদা বেগম",
    phone: "01612-678901",
    roomNumber: "২০৩",
    month: "অক্টোবর ২০২৬",
    rent: 3000,
    paidAmount: 3000,
    dueDate: "2026-10-10",
    paidDate: "2026-10-06",
    status: "PAID",
    paymentMethod: "Cash",
  },
  {
    id: 5,
    tenant: "সজীব দাস",
    phone: "01512-789012",
    roomNumber: "৩০২",
    month: "অক্টোবর ২০২৬",
    rent: 4200,
    paidAmount: 0,
    dueDate: "2026-10-05",
    status: "OVERDUE",
    note: "ভাড়াটিয়ার সাথে যোগাযোগ করা হয়েছে।",
  },
  {
    id: 6,
    tenant: "তানভীর আহমেদ",
    phone: "01798-123456",
    roomNumber: "২০৫",
    month: "অক্টোবর ২০২৬",
    rent: 4000,
    paidAmount: 4000,
    dueDate: "2026-10-10",
    paidDate: "2026-10-03",
    status: "PAID",
    paymentMethod: "Cash",
  },
  {
    id: 7,
    tenant: "নুসরাত জাহান",
    phone: "01898-765432",
    roomNumber: "২০৬",
    month: "অক্টোবর ২০২৬",
    rent: 3500,
    paidAmount: 0,
    dueDate: "2026-10-10",
    status: "PENDING",
  },
  {
    id: 8,
    tenant: "ফারহান কবির",
    phone: "01722-445566",
    roomNumber: "৩০১",
    month: "অক্টোবর ২০২৬",
    rent: 5000,
    paidAmount: 5000,
    dueDate: "2026-10-10",
    paidDate: "2026-10-02",
    status: "PAID",
    paymentMethod: "bKash",
  },
];

const statusConfig: Record<
  TPaymentStatus,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle2;
  }
> = {
  PAID: {
    label: "পরিশোধিত",
    className: "border-emerald-100 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "অপেক্ষমাণ",
    className: "border-amber-100 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  OVERDUE: {
    label: "বকেয়া",
    className: "border-red-100 bg-red-50 text-red-700",
    icon: WalletCards,
  },
};

const formatMoney = (amount: number) => `৳${amount.toLocaleString("bn-BD")}`;

export default function RentPage() {
  const [payments, setPayments] = useState<TRentPayment[]>(initialPayments);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<"ALL" | TPaymentStatus>(
    "ALL",
  );

  const [monthFilter, setMonthFilter] = useState("অক্টোবর ২০২৬");

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState<TRentPayment | null>(
    null,
  );

  const filteredPayments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !keyword ||
        payment.tenant.toLowerCase().includes(keyword) ||
        payment.phone.toLowerCase().includes(keyword) ||
        payment.roomNumber.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || payment.status === statusFilter;

      const matchesMonth = payment.month === monthFilter;

      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [payments, search, statusFilter, monthFilter]);

  const stats = useMemo(() => {
    const total = payments.reduce((sum, item) => sum + item.rent, 0);

    const collected = payments.reduce((sum, item) => sum + item.paidAmount, 0);

    const pending = payments
      .filter((item) => item.status === "PENDING")
      .reduce((sum, item) => sum + item.rent - item.paidAmount, 0);

    const overdue = payments
      .filter((item) => item.status === "OVERDUE")
      .reduce((sum, item) => sum + item.rent - item.paidAmount, 0);

    return {
      total,
      collected,
      pending,
      overdue,
      collectionRate: total > 0 ? Math.round((collected / total) * 100) : 0,
    };
  }, [payments]);

  const markAsPaid = (paymentId: number) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              paidAmount: payment.rent,
              paidDate: "2026-10-06",
              status: "PAID",
              paymentMethod: "Cash",
            }
          : payment,
      ),
    );

    setSelectedPayment((prev) =>
      prev && prev.id === paymentId
        ? {
            ...prev,
            paidAmount: prev.rent,
            paidDate: "2026-10-06",
            status: "PAID",
            paymentMethod: "Cash",
          }
        : prev,
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-[#00875A]">ফাইন্যান্স</p>

          <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#112233] sm:text-2xl">
            ভাড়া ও পেমেন্ট
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            মাসিক ভাড়া, বকেয়া এবং পেমেন্টের হিসাব পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
          <CalendarDays className="h-4 w-4 text-[#00875A]" />
          অক্টোবর ২০২৬
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard
          label="মোট ভাড়া"
          value={formatMoney(stats.total)}
          icon={CreditCard}
        />

        <SummaryCard
          label="আদায় হয়েছে"
          value={formatMoney(stats.collected)}
          icon={CheckCircle2}
          variant="success"
          subtitle={`${stats.collectionRate}% আদায়`}
        />

        <SummaryCard
          label="অপেক্ষমাণ"
          value={formatMoney(stats.pending)}
          icon={Clock3}
          variant="warning"
        />

        <SummaryCard
          label="বকেয়া"
          value={formatMoney(stats.overdue)}
          icon={WalletCards}
          variant="destructive"
        />
      </div>

      {/* Collection Progress */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#112233]">
              এই মাসের ভাড়া আদায়
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {formatMoney(stats.collected)} / {formatMoney(stats.total)}
            </p>
          </div>

          <span className="text-sm font-semibold text-[#00875A]">
            {stats.collectionRate}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#00875A] transition-all"
            style={{
              width: `${stats.collectionRate}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
          <span>আদায় হয়েছে</span>
          <span>
            বাকি {formatMoney(Math.max(stats.total - stats.collected, 0))}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ভাড়াটিয়া, ফোন বা রুম দিয়ে খুঁজুন..."
              className="input pl-9"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 lg:hidden"
          >
            <Filter className="h-4 w-4" />
            ফিল্টার
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                mobileFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`${
              mobileFilterOpen ? "grid" : "hidden"
            } grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:w-auto lg:flex`}
          >
            <FilterSelect
              value={monthFilter}
              onChange={setMonthFilter}
              options={[
                {
                  value: "অক্টোবর ২০২৬",
                  label: "অক্টোবর ২০২৬",
                },
                {
                  value: "সেপ্টেম্বর ২০২৬",
                  label: "সেপ্টেম্বর ২০২৬",
                },
              ]}
            />

            <FilterSelect
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(value as "ALL" | TPaymentStatus)
              }
              options={[
                {
                  value: "ALL",
                  label: "সব স্ট্যাটাস",
                },
                {
                  value: "PAID",
                  label: "পরিশোধিত",
                },
                {
                  value: "PENDING",
                  label: "অপেক্ষমাণ",
                },
                {
                  value: "OVERDUE",
                  label: "বকেয়া",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  ভাড়াটিয়া
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  রুম
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  মাসিক ভাড়া
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  Due Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  স্ট্যাটাস
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">
                  অ্যাকশন
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={payment.tenant} />

                      <div>
                        <p className="text-sm font-medium text-[#112233]">
                          {payment.tenant}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          {payment.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                      রুম {payment.roomNumber}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#112233]">
                      {formatMoney(payment.rent)}
                    </p>

                    {payment.paidAmount > 0 &&
                      payment.paidAmount < payment.rent && (
                        <p className="mt-0.5 text-[11px] text-amber-600">
                          পরিশোধ: {formatMoney(payment.paidAmount)}
                        </p>
                      )}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                    {formatDate(payment.dueDate)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={payment.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        icon={Eye}
                        label="বিস্তারিত"
                        onClick={() => setSelectedPayment(payment)}
                      />

                      {payment.status !== "PAID" && (
                        <button
                          type="button"
                          onClick={() => markAsPaid(payment.id)}
                          className="h-8 rounded-lg bg-[#00875A] px-3 text-xs font-medium text-white hover:bg-[#007A50]"
                        >
                          Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && <EmptyState />}
      </div>

      {/* Mobile */}
      <div className="space-y-3 lg:hidden">
        {filteredPayments.map((payment) => (
          <div
            key={payment.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={payment.tenant} />

                <div>
                  <p className="text-sm font-semibold text-[#112233]">
                    {payment.tenant}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    রুম {payment.roomNumber}
                  </p>
                </div>
              </div>

              <StatusBadge status={payment.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Info label="মাসিক ভাড়া">{formatMoney(payment.rent)}</Info>

              <Info label="Due Date">{formatDate(payment.dueDate)}</Info>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <span className="text-xs text-gray-500">পরিশোধিত</span>

              <span className="text-sm font-semibold text-[#112233]">
                {formatMoney(payment.paidAmount)}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPayment(payment)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600"
              >
                <Eye className="h-4 w-4" />
                বিস্তারিত
              </button>

              {payment.status !== "PAID" ? (
                <button
                  type="button"
                  onClick={() => markAsPaid(payment.id)}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#00875A] text-xs font-medium text-white"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Paid করুন
                </button>
              ) : (
                <div className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  সম্পন্ন
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredPayments.length === 0 && <EmptyState />}
      </div>

      {/* Details Modal */}
      <PaymentDetailsModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
        onMarkPaid={markAsPaid}
      />
    </div>
  );
}

function Info({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p className="text-[10px] font-medium text-gray-400">{label}</p>

      <p className="mt-1 text-sm font-semibold text-[#112233]">{children}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <WalletCards className="h-5 w-5 text-gray-400" />
      </div>

      <p className="mt-3 text-sm font-medium text-gray-700">
        কোনো পেমেন্ট পাওয়া যায়নি
      </p>

      <p className="mt-1 text-xs text-gray-400">
        Search বা filter পরিবর্তন করে আবার চেষ্টা করুন।
      </p>
    </div>
  );
}

function PaymentDetailsModal({
  payment,
  onClose,
  onMarkPaid,
}: {
  payment: TRentPayment | null;
  onClose: () => void;
  onMarkPaid: (id: number) => void;
}) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div>
            <p className="text-xs text-gray-400">পেমেন্ট বিস্তারিত</p>

            <h2 className="mt-1 text-base font-semibold text-[#112233]">
              {payment.tenant}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Main Amount */}
          <div className="rounded-xl bg-[#F7FBF9] p-5 text-center">
            <p className="text-xs text-gray-500">{payment.month}</p>

            <p className="mt-2 text-3xl font-semibold text-[#112233]">
              {formatMoney(payment.rent)}
            </p>

            <div className="mt-3 flex justify-center">
              <StatusBadge status={payment.status} />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <Info label="রুম">{payment.roomNumber}</Info>

            <Info label="ফোন">{payment.phone}</Info>

            <Info label="Due Date">{formatDate(payment.dueDate)}</Info>

            <Info label="Paid Date">{formatDate(payment?.paidDate || "")}</Info>

            <Info label="পরিশোধিত">{formatMoney(payment.paidAmount)}</Info>

            <Info label="Payment Method">{payment.paymentMethod || "—"}</Info>
          </div>

          {/* Payment history */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#112233]">
                পেমেন্ট হিস্ট্রি
              </p>

              <span className="text-xs text-gray-400">সর্বশেষ</span>
            </div>

            <div className="space-y-2">
              <HistoryItem
                month="অক্টোবর ২০২৬"
                amount={payment.rent}
                status={payment.status}
              />

              <HistoryItem
                month="সেপ্টেম্বর ২০২৬"
                amount={payment.rent}
                status="PAID"
              />

              <HistoryItem
                month="আগস্ট ২০২৬"
                amount={payment.rent}
                status="PAID"
              />
            </div>
          </div>

          {/* Note */}
          {payment.note && (
            <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
              <p className="text-xs font-medium text-amber-800">নোট</p>

              <p className="mt-1 text-xs leading-5 text-amber-700">
                {payment.note}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 border-t border-gray-100 pt-4">
            {payment.status !== "PAID" && (
              <button
                type="button"
                onClick={() => onMarkPaid(payment.id)}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#00875A] text-sm font-medium text-white hover:bg-[#007A50]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Paid হিসেবে মার্ক করুন
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg border border-gray-200 bg-white px-5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              বন্ধ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryItem({
  month,
  amount,
  status,
}: {
  month: string;
  amount: number;
  status: TPaymentStatus;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-3">
      <div>
        <p className="text-xs font-medium text-[#112233]">{month}</p>

        <p className="mt-0.5 text-[11px] text-gray-400">মাসিক ভাড়া</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-[#112233]">
          {formatMoney(amount)}
        </p>

        <StatusBadge status={status} />
      </div>
    </div>
  );
}
