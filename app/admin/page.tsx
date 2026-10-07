"use client";

import { StatusBadge } from "@/components/status-bagde";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  Building2,
  CreditCard,
  DoorOpen,
  Users,
} from "lucide-react";
import { siteConfig } from "../config";
import AdminStatsCard from "./components/admin-stats";

const stats = [
  {
    title: "মোট রুম / ফ্ল্যাট",
    value: "১২",
    subtitle: "বিল্ডিংয়ের মোট ইউনিট",
    icon: Building2,
    trend: "+1",
    trendText: "গত মাসের তুলনায়",
  },
  {
    title: "বর্তমানে ভাড়া দেওয়া",
    value: "৯",
    subtitle: "৭৫% ইউনিট occupied",
    icon: Users,
    trend: "+8%",
    trendText: "Occupancy বৃদ্ধি",
  },
  {
    title: "খালি রুম",
    value: "৩",
    subtitle: "ভাড়ার জন্য available",
    icon: DoorOpen,
    trend: "-1",
    trendText: "গত মাসের তুলনায়",
  },
  {
    title: "এই মাসের ভাড়া",
    value: "৳৩২,৫০০",
    subtitle: "মোট প্রত্যাশিত ৳৩৬,০০০",
    icon: CreditCard,
    trend: "৯০%",
    trendText: "সংগ্রহ সম্পন্ন",
  },
];

const rooms = [
  {
    room: "রুম ১০১",
    tenant: "মোঃ রাকিব হাসান",
    rent: "৳৪,৫০০",
    status: "পরিশোধিত",
    variant: "success" as const,
  },
  {
    room: "রুম ১০২",
    tenant: "সুমাইয়া আক্তার",
    rent: "৳৩,৫০০",
    status: "বকেয়া",
    variant: "destructive" as const,
  },
  {
    room: "রুম ১০৩",
    tenant: "মোঃ হাসান মাহমুদ",
    rent: "৳৪,০০০",
    status: "পরিশোধিত",
    variant: "success" as const,
  },
  {
    room: "রুম ২০১",
    tenant: "তানভীর আহমেদ",
    rent: "৳৪,৫০০",
    status: "অপেক্ষমাণ",
    variant: "warning" as const,
  },
];

const enquiries = [
  {
    name: "মোঃ সাকিব",
    room: "রুম ৩০২",
    time: "১০ মিনিট আগে",
    status: "নতুন",
    variant: "info" as const,
  },
  {
    name: "নুসরাত জাহান",
    room: "রুম ২০৩",
    time: "১ ঘণ্টা আগে",
    status: "যোগাযোগ করা হয়েছে",
    variant: "neutral" as const,
  },
  {
    name: "রিফাত হোসেন",
    room: "রুম ১০৫",
    time: "আজ, ১১:৩০ AM",
    status: "নতুন",
    variant: "info" as const,
  },
];

export default function AdminPage() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  if (!authLoaded || !userLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-[#00875A]" />
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  const role = user?.publicMetadata?.role;

  if (role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-[#112233]">
            Access Denied
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার এই পেজে প্রবেশের অনুমতি নেই।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#112233] sm:text-2xl">
              ড্যাশবোর্ড
            </h1>

            <span className="rounded-full bg-[#EAF4EF] px-2.5 py-1 text-[10px] font-semibold text-[#00875A]">
              আজ
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {`  ${siteConfig.name} বর্তমান অবস্থা এক নজরে দেখুন।`}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <AdminStatsCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Occupancy + Rent */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Occupancy */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#112233]">
                রুমের বর্তমান অবস্থা
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">মোট ১২টি ইউনিট</p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
              <Building2 className="h-4 w-4" />
            </div>
          </div>

          {/* Main */}
          <div className="mt-6 flex items-center gap-6">
            {/* Occupancy */}
            <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[10px] border-[#EAF4EF]">
              <div className="absolute inset-[-10px] rotate-[-25deg] rounded-full border-[10px] border-transparent border-r-[#00875A] border-t-[#00875A]" />

              <div className="text-center">
                <p className="text-2xl font-bold leading-none text-[#112233]">
                  ৭৫%
                </p>

                <p className="mt-1 text-xs text-gray-500">Occupied</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#112233]" />
                  <span className="text-sm text-gray-600">ভাড়া দেওয়া</span>
                </div>

                <span className="text-sm font-semibold text-[#112233]">৯</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#F7FBF9] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00875A]" />
                  <span className="text-sm text-gray-600">খালি</span>
                </div>

                <span className="text-sm font-semibold text-[#00875A]">৩</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-400" />
                  <span className="text-sm text-gray-600">মেরামত</span>
                </div>

                <span className="text-sm font-semibold text-[#112233]">০</span>
              </div>
            </div>
          </div>
        </div>
        {/* Rent Collection */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#112233]">
                এই মাসের ভাড়া
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">অক্টোবর ২০২৬</p>
            </div>

            <span className="rounded-full bg-[#EAF4EF] px-2.5 py-1 text-xs font-semibold text-[#00875A]">
              ৯০% সংগ্রহ
            </span>
          </div>

          {/* Amount */}
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-bold tracking-tight text-[#112233]">
                ৳৩২,৫০০
              </p>

              <p className="mt-1 text-xs text-gray-500">মোট ৳৩৬,০০০</p>
            </div>

            <p className="text-xs font-medium text-gray-400">৳৩,৫০০ বাকি</p>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[90%] rounded-full bg-[#00875A]" />
            </div>
          </div>

          {/* Summary */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-gray-100 rounded-lg border border-gray-100 bg-gray-50">
            <div className="px-3 py-2.5">
              <p className="text-xs text-gray-500">পরিশোধিত</p>

              <p className="mt-0.5 text-sm font-bold text-[#112233]">৯ জন</p>
            </div>

            <div className="px-3 py-2.5">
              <p className="text-xs text-gray-500">বকেয়া</p>

              <p className="mt-0.5 text-sm font-bold text-red-600">১ জন</p>
            </div>

            <div className="px-3 py-2.5">
              <p className="text-xs text-gray-500">অপেক্ষমাণ</p>

              <p className="mt-0.5 text-sm font-bold text-amber-600">১ জন</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rent Table + Enquiries */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Rent List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-[#112233]">সাম্প্রতিক ভাড়া</h2>

              <p className="mt-1 text-xs text-gray-500">
                সর্বশেষ পেমেন্টের তালিকা
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-semibold text-[#00875A]"
            >
              সব দেখুন
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">রুম</th>
                  <th className="px-5 py-3 font-medium">ভাড়াটিয়া</th>
                  <th className="px-5 py-3 font-medium">ভাড়া</th>
                  <th className="px-5 py-3 font-medium">স্ট্যাটাস</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {rooms.map((room) => (
                  <tr key={room.room} className="hover:bg-gray-50/70">
                    <td className="px-5 py-3.5 font-semibold text-[#112233]">
                      {room.room}
                    </td>

                    <td className="px-5 py-3.5 text-gray-600">{room.tenant}</td>

                    <td className="px-5 py-3.5 font-medium text-[#112233]">
                      {room.rent}
                    </td>

                    <td className="px-5 py-3.5">
                      <StatusBadge
                        status={room.status}
                        variant={room.variant}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="divide-y divide-gray-100 sm:hidden">
            {rooms.map((room) => (
              <div
                key={room.room}
                className="flex items-center justify-between gap-3 px-4 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#112233]">
                    {room.room}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {room.tenant}
                  </p>

                  <p className="mt-1 text-xs font-medium text-gray-700">
                    {room.rent}
                  </p>
                </div>

                <StatusBadge status={room.status} variant="info" />
              </div>
            ))}
          </div>
        </div>

        {/* Enquiries */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-[#112233]">নতুন অনুরোধ</h2>

              <p className="mt-1 text-xs text-gray-500">রুম নেওয়ার আগ্রহ</p>
            </div>

            <span className="rounded-full bg-[#EAF4EF] px-2.5 py-1 text-[10px] font-semibold text-[#00875A]">
              ৩টি নতুন
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {enquiries.map((item) => (
              <div key={item.name} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#112233]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.room} • {item.time}
                    </p>
                  </div>

                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              সব অনুরোধ দেখুন
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
