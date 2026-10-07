"use client";

import { Avatar } from "@/app/components/ui/avatar";
import { TEnquiry, TEnquiryStatus } from "@/app/type/enquiries";
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
  Eye,
  Filter,
  MessageSquare,
  Phone,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const initialEnquiries: TEnquiry[] = [
  {
    id: 1,
    name: "মোঃ রাকিব হাসান",
    phone: "01712-345678",
    roomNumber: "১০২",
    subject: "রুম ভাড়া সম্পর্কে জানতে চাই",
    message:
      "রুমটি কি এখনো খালি আছে? পরিবার নিয়ে উঠতে চাই। ভাড়ার সাথে গ্যাস ও পানির খরচ কীভাবে হিসাব করা হয়?",
    date: "2026-10-06",
    status: "NEW",
  },
  {
    id: 2,
    name: "সুমাইয়া আক্তার",
    phone: "01812-456789",
    roomNumber: "২০৩",
    subject: "ফ্ল্যাট দেখতে চাই",
    message: "ফ্ল্যাটটি দেখতে চাই। আগামীকাল বিকেলে কি এসে দেখা সম্ভব?",
    date: "2026-10-05",
    status: "CONTACTED",
    followUpDate: "2026-10-07",
  },
  {
    id: 3,
    name: "আরিফুল ইসলাম",
    phone: "01912-567890",
    roomNumber: "১০৫",
    subject: "ভাড়া ও সুবিধা",
    message: "মাসিক ভাড়া এবং পার্কিং সুবিধা সম্পর্কে বিস্তারিত জানতে চাই।",
    date: "2026-10-04",
    status: "CONVERTED",
  },
  {
    id: 4,
    name: "মাহমুদা বেগম",
    phone: "01612-678901",
    roomNumber: "৩০২",
    subject: "রুম বুকিং",
    message: "রুমটি নভেম্বর মাস থেকে নিতে আগ্রহী। অগ্রিম কত টাকা দিতে হবে?",
    date: "2026-10-03",
    status: "CONTACTED",
    followUpDate: "2026-10-08",
  },
  {
    id: 5,
    name: "তানভীর আহমেদ",
    phone: "01798-123456",
    roomNumber: "২০৫",
    subject: "বাসা সম্পর্কে তথ্য",
    message:
      "বিল্ডিংয়ের নিরাপত্তা ব্যবস্থা এবং বিদ্যুৎ ব্যবস্থার বিষয়ে জানতে চাই।",
    date: "2026-10-02",
    status: "CLOSED",
  },
  {
    id: 6,
    name: "নুসরাত জাহান",
    phone: "01898-765432",
    roomNumber: "১০১",
    subject: "ফ্ল্যাট ভাড়া",
    message: "১ বেডরুমের ফ্ল্যাটটি কি পরিবার নিয়ে থাকার জন্য উপযুক্ত?",
    date: "2026-10-01",
    status: "NEW",
  },
];

const statusConfig: Record<
  TEnquiryStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  NEW: {
    label: "নতুন",
    className: "bg-blue-50 text-blue-700 border-blue-100",
    icon: MessageSquare,
  },
  CONTACTED: {
    label: "যোগাযোগ হয়েছে",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    icon: Phone,
  },
  CONVERTED: {
    label: "ভাড়াটিয়া হয়েছে",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: CheckCircle2,
  },
  CLOSED: {
    label: "বন্ধ",
    className: "bg-gray-100 text-gray-600 border-gray-200",
    icon: XCircle,
  },
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<TEnquiry[]>(initialEnquiries);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TEnquiryStatus>(
    "ALL",
  );
  const [roomFilter, setRoomFilter] = useState("ALL");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [selectedEnquiry, setSelectedEnquiry] = useState<TEnquiry | null>(null);

  const rooms = useMemo(
    () => Array.from(new Set(enquiries.map((item) => item.roomNumber))),
    [enquiries],
  );

  const filteredEnquiries = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const matchesSearch =
        !keyword ||
        enquiry.name.toLowerCase().includes(keyword) ||
        enquiry.phone.toLowerCase().includes(keyword) ||
        enquiry.roomNumber.toLowerCase().includes(keyword) ||
        enquiry.subject.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || enquiry.status === statusFilter;

      const matchesRoom =
        roomFilter === "ALL" || enquiry.roomNumber === roomFilter;

      return matchesSearch && matchesStatus && matchesRoom;
    });
  }, [enquiries, search, statusFilter, roomFilter]);

  const stats = useMemo(
    () => ({
      total: enquiries.length,
      new: enquiries.filter((item) => item.status === "NEW").length,
      contacted: enquiries.filter((item) => item.status === "CONTACTED").length,
      converted: enquiries.filter((item) => item.status === "CONVERTED").length,
    }),
    [enquiries],
  );

  const updateStatus = (enquiryId: number, status: TEnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === enquiryId ? { ...item, status } : item)),
    );

    setSelectedEnquiry((prev) =>
      prev && prev.id === enquiryId ? { ...prev, status } : prev,
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-[#00875A]">যোগাযোগ ও অনুরোধ</p>

          <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#112233] sm:text-2xl">
            ভাড়ার অনুরোধ
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আগ্রহী ভাড়াটিয়াদের অনুরোধ দেখুন এবং যোগাযোগ পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
          <MessageSquare className="h-4 w-4 text-[#00875A]" />
          মোট {stats.total}টি অনুরোধ
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label="মোট অনুরোধ" value={stats.total} icon={Users} />

        <SummaryCard
          label="নতুন"
          value={stats.new}
          icon={MessageSquare}
          variant="success"
        />

        <SummaryCard
          label="যোগাযোগ হয়েছে"
          value={stats.contacted}
          icon={Phone}
          variant="info"
        />

        <SummaryCard
          label="ভাড়াটিয়া হয়েছে"
          value={stats.converted}
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম, ফোন, রুম বা বিষয় দিয়ে খুঁজুন..."
              className="input pl-9"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 lg:hidden"
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
            } grid-cols-1 gap-3 sm:grid-cols-2   lg:w-auto lg:flex`}
          >
            <FilterSelect
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(value as "ALL" | TEnquiryStatus)
              }
              options={[
                { value: "ALL", label: "সব স্ট্যাটাস" },
                { value: "NEW", label: "নতুন" },
                { value: "CONTACTED", label: "যোগাযোগ হয়েছে" },
                { value: "CONVERTED", label: "ভাড়াটিয়া হয়েছে" },
                { value: "CLOSED", label: "বন্ধ" },
              ]}
            />

            <FilterSelect
              value={roomFilter}
              onChange={setRoomFilter}
              options={[
                { value: "ALL", label: "সব রুম" },
                ...rooms.map((room) => ({
                  value: room,
                  label: `রুম ${room}`,
                })),
              ]}
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  আগ্রহী ব্যক্তি
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  রুম
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  বিষয়
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                  তারিখ
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
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={enquiry.name} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#112233]">
                          {enquiry.name}
                        </p>

                        <a
                          href={`tel:${enquiry.phone}`}
                          className="mt-0.5 block text-xs text-gray-500 hover:text-[#00875A]"
                        >
                          {enquiry.phone}
                        </a>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                      রুম {enquiry.roomNumber}
                    </span>
                  </td>

                  <td className="max-w-65 px-5 py-4">
                    <p className="truncate text-sm text-gray-700">
                      {enquiry.subject}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-400">
                      {enquiry.message}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                    {formatDate(enquiry.date)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={enquiry.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        icon={Eye}
                        label="দেখুন"
                        onClick={() => setSelectedEnquiry(enquiry)}
                      />

                      <ActionButton
                        icon={Phone}
                        label="কল"
                        href={`tel:${enquiry.phone}`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEnquiries.length === 0 && <EmptyState />}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 lg:hidden">
        {filteredEnquiries.map((enquiry) => (
          <div
            key={enquiry.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar name={enquiry.name} />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#112233]">
                    {enquiry.name}
                  </p>

                  <a
                    href={`tel:${enquiry.phone}`}
                    className="mt-0.5 block text-xs text-gray-500"
                  >
                    {enquiry.phone}
                  </a>
                </div>
              </div>

              <StatusBadge status={enquiry.status} />
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[#112233]">
                  {enquiry.subject}
                </p>

                <span className="shrink-0 rounded-md bg-white px-2 py-1 text-[11px] font-medium text-gray-600">
                  রুম {enquiry.roomNumber}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                {enquiry.message}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(enquiry.date)}
              </div>

              {enquiry.followUpDate && (
                <span className="text-amber-600">
                  Follow-up: {formatDate(enquiry.followUpDate)}
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(enquiry)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700"
              >
                <Eye className="h-4 w-4" />
                বিস্তারিত
              </button>

              <a
                href={`tel:${enquiry.phone}`}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#00875A] text-xs font-medium text-white"
              >
                <Phone className="h-4 w-4" />
                কল করুন
              </a>
            </div>
          </div>
        ))}

        {filteredEnquiries.length === 0 && <EmptyState />}
      </div>

      {/* Details Modal */}
      <EnquiryDetailsModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onStatusChange={updateStatus}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <MessageSquare className="h-5 w-5 text-gray-400" />
      </div>

      <p className="mt-3 text-sm font-medium text-gray-700">
        কোনো অনুরোধ পাওয়া যায়নি
      </p>

      <p className="mt-1 text-xs text-gray-400">
        Search বা filter পরিবর্তন করে আবার চেষ্টা করুন।
      </p>
    </div>
  );
}

function EnquiryDetailsModal({
  enquiry,
  onClose,
  onStatusChange,
}: {
  enquiry: TEnquiry | null;
  onClose: () => void;
  onStatusChange: (id: number, status: TEnquiryStatus) => void;
}) {
  if (!enquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-xl sm:rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={enquiry.name} />

            <div>
              <h2 className="text-base font-semibold text-[#112233]">
                {enquiry.name}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                রুম {enquiry.roomNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Contact */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={`tel:${enquiry.phone}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-[#00875A]/30 hover:bg-[#F7FBF9]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
                <Phone className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[11px] text-gray-400">ফোন</p>
                <p className="mt-0.5 text-sm font-medium text-[#112233]">
                  {enquiry.phone}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <CalendarDays className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[11px] text-gray-400">অনুরোধের তারিখ</p>
                <p className="mt-0.5 text-sm font-medium text-[#112233]">
                  {formatDate(enquiry.date)}
                </p>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <p className="text-xs font-medium text-gray-400">বিষয়</p>

            <p className="mt-1 text-sm font-semibold text-[#112233]">
              {enquiry.subject}
            </p>
          </div>

          {/* Message */}
          <div>
            <p className="text-xs font-medium text-gray-400">বার্তা</p>

            <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600">
              {enquiry.message}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-400">
              স্ট্যাটাস পরিবর্তন
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(
                ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as TEnquiryStatus[]
              ).map((status) => {
                const active = enquiry.status === status;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => onStatusChange(enquiry.id, status)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                      active
                        ? "border-[#00875A] bg-[#EAF4EF] text-[#00875A]"
                        : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {statusConfig[status].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Follow Up */}
          {enquiry.followUpDate && (
            <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-3">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-amber-600" />

                <div>
                  <p className="text-xs font-medium text-amber-800">
                    Follow-up নির্ধারিত
                  </p>

                  <p className="mt-0.5 text-xs text-amber-600">
                    {formatDate(enquiry.followUpDate)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
