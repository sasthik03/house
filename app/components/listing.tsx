"use client";

import {
  Bath,
  Bed,
  CheckCircle,
  ChevronDown,
  Eye,
  FileText,
  Home,
  Phone,
  Send,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { siteConfig } from "../config";
import { TRoom } from "../type/list";
import { rooms } from "./data";

interface FormData {
  name: string;
  phone: string;
  date: string;
}

const filterOptions = ["সবগুলো", "খালি আছে", "বুকড"];

export default function RoomGridSection() {
  const [selectedStatus, setSelectedStatus] = useState("সবগুলো");
  const [selectedRoom, setSelectedRoom] = useState<TRoom | null>(null);
  const [activeImage, setActiveImage] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
  });

  const filteredRooms = useMemo(() => {
    if (selectedStatus === "সবগুলো") {
      return rooms;
    }

    return rooms.filter((room) => room.status === selectedStatus);
  }, [selectedStatus]);

  const displayedRooms = filteredRooms.slice(0, visibleCount);

  const availableCount = rooms.filter(
    (room) => room.status === "খালি আছে",
  ).length;

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setVisibleCount(3);
  };

  const handleOpenRoom = (room: TRoom) => {
    setSelectedRoom(room);
    setActiveImage(room.image);

    // Previous form data clear
    setFormData({
      name: "",
      phone: "",
      date: "",
    });
  };

  const handleCloseRoom = () => {
    setSelectedRoom(null);
    setActiveImage("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("আপনার আবেদন সফলভাবে গ্রহণ করা হয়েছে।");

    setFormData({
      name: "",
      phone: "",
      date: "",
    });
  };

  return (
    <section
      id="available-flats"
      className="bg-[#F8FAFC] px-4 py-12  font-sans "
    >
      <div className="container ">
        {/* ================= HEADER ================= */}
        <div className="mb-7 flex flex-col gap-5 sm:mb-9 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center rounded-full bg-[#EAF4EF] px-3 py-1.5 text-xs font-semibold text-[#00875A]">
              রুম ও ফ্ল্যাট
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#112233] sm:text-3xl lg:text-4xl">
              আপনার পছন্দের বাসস্থান খুঁজুন
            </h2>

            <p className="mt-2.5 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              বর্তমান খালি ও বুকড ফ্ল্যাটের তথ্য দেখুন এবং আপনার পছন্দের ফ্ল্যাট
              সম্পর্কে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          {/* Available Summary */}
          <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4EF]">
              <CheckCircle className="h-4 w-4 text-[#00875A]" />
            </span>

            <div>
              <p className="text-[11px] text-gray-500">বর্তমানে খালি</p>
              <p className="text-sm font-bold text-[#112233]">
                {availableCount}টি ফ্ল্যাট
              </p>
            </div>
          </div>
        </div>

        {/* ================= FILTER ================= */}
        <div className="mb-7 overflow-x-auto pb-1 scrollbar-hide">
          <div className="flex w-max items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
            {filterOptions.map((status) => {
              const active = selectedStatus === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(status)}
                  className={`min-h-9 whitespace-nowrap rounded-lg px-4 text-xs font-semibold transition-all sm:text-sm ${
                    active
                      ? "bg-[#00875A] text-white shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-[#112233]"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= ROOM GRID ================= */}
        {displayedRooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedRooms.map((room) => (
              <article
                key={room.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-48">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Status */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm ${
                        room.status === "খালি আছে"
                          ? "bg-[#00875A]"
                          : "bg-[#64748B]"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      {room.status}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3">
                    <p className="text-base font-bold text-white">
                      {room.price}
                      <span className="ml-1 text-[10px] font-normal text-white/80">
                        / মাস
                      </span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="line-clamp-1 text-sm font-bold text-[#112233] sm:text-base">
                      {room.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {siteConfig.name} • {siteConfig.location.city}
                    </p>
                  </div>

                  {/* Amenities */}
                  <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    <div className="flex min-h-14 flex-col items-center justify-center gap-1">
                      <Bed className="h-4 w-4 text-gray-400" />
                      <span className="text-[10px] text-gray-600">
                        {room.beds}
                      </span>
                    </div>

                    <div className="flex min-h-14 flex-col items-center justify-center gap-1 border-x border-gray-200">
                      <Bath className="h-4 w-4 text-gray-400" />
                      <span className="text-[10px] text-gray-600">
                        {room.baths}
                      </span>
                    </div>

                    <div className="flex min-h-14 flex-col items-center justify-center gap-1">
                      <Home className="h-4 w-4 text-gray-400" />
                      <span className="text-[10px] text-gray-600">
                        {room.balcony}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenRoom(room)}
                      className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      বিস্তারিত
                    </button>

                    <a
                      href="tel:+8801700000000"
                      className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-[#00875A] text-xs font-semibold text-white transition hover:bg-[#006E48] active:scale-[0.98]"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      কল করুন
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center">
            <Home className="mx-auto h-8 w-8 text-gray-300" />

            <h3 className="mt-3 text-sm font-bold text-[#112233]">
              এই মুহূর্তে কোনো রুম পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              অন্য একটি ক্যাটাগরি নির্বাচন করে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

        {/* ================= LOAD MORE ================= */}
        {visibleCount < filteredRooms.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 text-xs font-semibold text-[#1E3A5F] shadow-sm transition hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98] sm:text-sm"
            >
              আরও রুম দেখুন
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* ===================================================== */}
      {/* ROOM DETAILS MODAL */}
      {/* ===================================================== */}

      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-0 backdrop-blur-sm sm:p-4"
          onClick={handleCloseRoom}
        >
          <div
            className="mx-auto min-h-screen w-full bg-white sm:my-6 sm:min-h-0   sm:overflow-hidden sm:rounded-2xl sm:shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3.5 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  ফ্ল্যাটের বিস্তারিত
                </p>

                <h2 className="mt-0.5 line-clamp-1 pr-4 text-sm font-bold text-[#112233] sm:text-base">
                  {selectedRoom.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseRoom}
                aria-label="বন্ধ করুন"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 lg:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
                {/* ================= GALLERY ================= */}
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={activeImage}
                      alt={selectedRoom.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />

                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full px-2.5 py-1.5 text-[10px] font-bold text-white ${
                          selectedRoom.status === "খালি আছে"
                            ? "bg-[#00875A]"
                            : "bg-[#64748B]"
                        }`}
                      >
                        {selectedRoom.status}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-12">
                      <p className="text-lg font-bold text-white">
                        {selectedRoom.price}
                        <span className="ml-1 text-xs font-normal text-white/80">
                          / মাস
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Gallery thumbnails */}
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {selectedRoom.gallery.map((img, index) => {
                      const isActive = activeImage === img;

                      return (
                        <button
                          key={`${img}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(img)}
                          aria-label={`ছবি ${index + 1} দেখুন`}
                          className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                            isActive
                              ? "border-[#00875A]"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <p className="text-xs text-gray-500">
                      {siteConfig.name} • {siteConfig.location.city} শহর
                    </p>

                    <h3 className="mt-1 text-xl font-bold tracking-tight text-[#112233] sm:text-2xl">
                      {selectedRoom.title}
                    </h3>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:grid-cols-4">
                    <InfoItem
                      icon={<Bed />}
                      label="বেডরুম"
                      value={selectedRoom.beds}
                    />

                    <InfoItem
                      icon={<Bath />}
                      label="বাথরুম"
                      value={selectedRoom.baths}
                      border
                    />

                    <InfoItem
                      icon={<Home />}
                      label="বারান্দা"
                      value={selectedRoom.balcony}
                    />

                    <InfoItem
                      icon={<Zap />}
                      label="বিদ্যুৎ"
                      value={selectedRoom.electricity}
                      border
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4EF]">
                        <FileText className="h-3.5 w-3.5 text-[#00875A]" />
                      </span>

                      <h4 className="text-sm font-bold text-[#112233]">
                        বিস্তারিত তথ্য
                      </h4>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <DetailRow label="রুম সাইজ" value={selectedRoom.size} />
                      <DetailRow label="রুমের ধরন" value={selectedRoom.type} />
                      <DetailRow
                        label="ভাড়া ধরন"
                        value={selectedRoom.rentType}
                      />
                      <DetailRow
                        label="পার্কিং"
                        value={selectedRoom.parking}
                        last
                      />
                    </div>
                  </div>

                  {/* House Rules */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <h4 className="text-sm font-bold text-[#112233]">
                      হাউস রুলস
                    </h4>

                    <ul className="mt-3 space-y-2.5">
                      {[
                        "শান্তিপূর্ণ পরিবেশ বজায় রাখতে হবে",
                        "রাতে ১০টার পর বেশি শব্দ করা যাবে না",
                        "ধূমপান সম্পূর্ণ নিষেধ",
                      ].map((rule) => (
                        <li
                          key={rule}
                          className="flex items-start gap-2 text-xs leading-5 text-gray-600"
                        >
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00875A]" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ================= CONTACT FORM ================= */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="rounded-xl border border-[#DDEBE4] bg-[#F7FBF9] p-4 sm:p-5">
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-[#112233] sm:text-base">
                      এই ফ্ল্যাট সম্পর্কে জানতে চান?
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      আপনার তথ্য দিন, আমরা আপনার সাথে যোগাযোগ করব।
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <input
                        type="text"
                        required
                        placeholder="আপনার নাম"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/10"
                      />

                      <input
                        type="tel"
                        required
                        placeholder="মোবাইল নম্বর"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/10"
                      />

                      <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/10"
                      />
                    </div>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
                      <a
                        href="tel:+8801700000000"
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        সরাসরি কল
                      </a>

                      <button
                        type="submit"
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-[#00875A] px-5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#006E48] active:scale-[0.98]"
                      >
                        <Send className="h-3.5 w-3.5" />
                        তথ্যের জন্য আবেদন
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

function InfoItem({
  icon,
  label,
  value,
  border = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[72px] flex-col items-center justify-center gap-1.5 px-2 ${
        border ? "border-t border-gray-200 sm:border-l sm:border-t-0" : ""
      }`}
    >
      <span className="text-gray-400 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>

      <span className="text-[10px] font-medium text-gray-400">{label}</span>

      <span className="text-[11px] font-semibold text-[#112233]">{value}</span>
    </div>
  );
}

function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-3.5 py-3 text-xs sm:px-4 ${
        !last ? "border-b border-gray-100" : ""
      }`}
    >
      <span className="text-gray-500">{label}</span>

      <span className="text-right font-semibold text-[#112233]">{value}</span>
    </div>
  );
}
