"use client";

import Input from "@/app/components/ui/input";
import Select from "@/app/components/ui/select";

import {
  Bath,
  BedDouble,
  Building2,
  Car,
  ImagePlus,
  Pencil,
  Plus,
  Ruler,
  Sofa,
  SquareStack,
  X,
} from "lucide-react";

import { ChangeEvent, FormEvent, useState } from "react";

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
};

export type RoomFormData = {
  roomNumber: string;
  floor: string;
  title: string;
  rent: string;
  size: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  furnishing: string;
  parking: boolean;
  utility: string;
  status: RoomStatus;
  image: File | null;
};

interface AddRoomModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: RoomFormData) => void;
  room?: Room | null;
  mode?: "add" | "edit";
}

const defaultForm: RoomFormData = {
  roomNumber: "",
  floor: "",
  title: "",
  rent: "",
  size: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  furnishing: "NON_FURNISHED",
  parking: false,
  utility: "",
  status: "AVAILABLE",
  image: null,
};

/* ---------------------------------- */
/* Room -> Form Data */
/* ---------------------------------- */

function getRoomForm(room?: Room | null): RoomFormData {
  if (!room) {
    return {
      ...defaultForm,
    };
  }

  return {
    roomNumber: room.roomNumber,
    floor: room.floor,
    title: room.title,
    rent: String(room.rent),
    size: String(room.size),
    bedrooms: String(room.bedrooms),
    bathrooms: String(room.bathrooms),
    balconies: String(room.balconies),
    furnishing: room.furnishing,
    parking: room.parking,
    utility: room.utility,
    status: room.status,
    image: null,
  };
}

/* ---------------------------------- */
/* Modal */
/* ---------------------------------- */

export default function AddRoomModal({
  open,
  onClose,
  onSubmit,
  room,
  mode = "add",
}: AddRoomModalProps) {
  const isEdit = mode === "edit";

  /*
   * IMPORTANT:
   * Parent থেকে key change করলে component নতুন করে
   * mount হবে এবং এখানে room অনুযায়ী initial state তৈরি হবে।
   */
  const [form, setForm] = useState<RoomFormData>(() => getRoomForm(room));

  const [imagePreview, setImagePreview] = useState<string | null>(
    room?.image ?? null,
  );

  if (!open) {
    return null;
  }

  /* ---------------------------------- */
  /* Update Field */
  /* ---------------------------------- */

  const updateField = <K extends keyof RoomFormData>(
    field: K,
    value: RoomFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ---------------------------------- */
  /* Image Change */
  /* ---------------------------------- */

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ 5MB হতে হবে।");

      event.target.value = "";
      return;
    }

    updateField("image", file);

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);
  };

  /* ---------------------------------- */
  /* Remove Image */
  /* ---------------------------------- */

  const removeImage = () => {
    updateField("image", null);
    setImagePreview(null);
  };

  /* ---------------------------------- */
  /* Submit */
  /* ---------------------------------- */

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.(form);

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-xl sm:rounded-2xl">
        {/* ================= Header ================= */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
              {isEdit ? (
                <Pencil className="h-4 w-4" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-[#112233] sm:text-base">
                {isEdit ? "রুম / ফ্ল্যাট সম্পাদনা" : "নতুন রুম / ফ্ল্যাট"}
              </h2>

              <p className="mt-0.5 text-[11px] text-gray-400">
                প্রয়োজনীয় তথ্যগুলো পূরণ করুন
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ================= Form ================= */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
        >
          <div className="space-y-5">
            {/* ================= Basic Info ================= */}
            <section>
              <SectionTitle title="মৌলিক তথ্য" description="রুমের পরিচয়" />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="roomNumber"
                  label="রুম নম্বর"
                  placeholder="১০২"
                  value={form.roomNumber}
                  onChange={(e) => updateField("roomNumber", e.target.value)}
                  required
                />

                <Select
                  id="floor"
                  label="ফ্লোর"
                  placeholder="ফ্লোর"
                  value={form.floor}
                  onChange={(e) => updateField("floor", e.target.value)}
                  required
                  options={[
                    {
                      label: "গ্রাউন্ড",
                      value: "GROUND",
                    },
                    {
                      label: "১ম ফ্লোর",
                      value: "1ST",
                    },
                    {
                      label: "২য় ফ্লোর",
                      value: "2ND",
                    },
                    {
                      label: "৩য় ফ্লোর",
                      value: "3RD",
                    },
                    {
                      label: "৪র্থ ফ্লোর",
                      value: "4TH",
                    },
                    {
                      label: "৫ম ফ্লোর",
                      value: "5TH",
                    },
                  ]}
                />

                <div className="col-span-2">
                  <Input
                    id="title"
                    label="রুম / ফ্ল্যাটের নাম"
                    placeholder="যেমন: ফ্ল্যাট ৩-এ"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* ================= Rent ================= */}
            <section>
              <SectionTitle
                title="ভাড়া ও আয়তন"
                description="মাসিক ভাড়া এবং জায়গা"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="rent"
                  label="মাসিক ভাড়া"
                  type="number"
                  min="0"
                  placeholder="৩৫০০"
                  value={form.rent}
                  onChange={(e) => updateField("rent", e.target.value)}
                  icon={<span className="text-xs font-semibold">৳</span>}
                  required
                />

                <Input
                  id="size"
                  label="আয়তন (sqft)"
                  type="number"
                  min="0"
                  placeholder="১০০"
                  value={form.size}
                  onChange={(e) => updateField("size", e.target.value)}
                  icon={<Ruler className="h-4 w-4" />}
                  required
                />
              </div>
            </section>

            {/* ================= Room Details ================= */}
            <section>
              <SectionTitle
                title="রুমের বিবরণ"
                description="রুম ও সুবিধার সংখ্যা"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="bedrooms"
                  label="Bedroom"
                  type="number"
                  min="0"
                  placeholder="১"
                  value={form.bedrooms}
                  onChange={(e) => updateField("bedrooms", e.target.value)}
                  icon={<BedDouble className="h-4 w-4" />}
                  required
                />

                <Input
                  id="bathrooms"
                  label="Bathroom"
                  type="number"
                  min="0"
                  placeholder="১"
                  value={form.bathrooms}
                  onChange={(e) => updateField("bathrooms", e.target.value)}
                  icon={<Bath className="h-4 w-4" />}
                  required
                />

                <Input
                  id="balconies"
                  label="Balcony"
                  type="number"
                  min="0"
                  placeholder="১"
                  value={form.balconies}
                  onChange={(e) => updateField("balconies", e.target.value)}
                  icon={<SquareStack className="h-4 w-4" />}
                  required
                />

                <Input
                  id="parking"
                  label="Parking"
                  type="number"
                  min="0"
                  max="1"
                  placeholder="০"
                  value={form.parking ? "1" : "0"}
                  onChange={(e) =>
                    updateField("parking", Number(e.target.value) > 0)
                  }
                  icon={<Car className="h-4 w-4" />}
                />
              </div>
            </section>

            {/* ================= Facilities ================= */}
            <section>
              <SectionTitle
                title="অতিরিক্ত তথ্য"
                description="ফার্নিশিং ও ইউটিলিটি"
              />

              <div className="grid grid-cols-2 gap-3">
                <Select
                  id="furnishing"
                  label="ফার্নিশিং"
                  value={form.furnishing}
                  onChange={(e) => updateField("furnishing", e.target.value)}
                  icon={<Sofa className="h-4 w-4" />}
                  options={[
                    {
                      label: "নন-ফার্নিশড",
                      value: "NON_FURNISHED",
                    },
                    {
                      label: "সেমি-ফার্নিশড",
                      value: "SEMI_FURNISHED",
                    },
                    {
                      label: "ফুল-ফার্নিশড",
                      value: "FULLY_FURNISHED",
                    },
                  ]}
                />

                <Select
                  id="utility"
                  label="ইউটিলিটি"
                  value={form.utility}
                  onChange={(e) => updateField("utility", e.target.value)}
                  options={[
                    {
                      label: "সাব-মিটার",
                      value: "SUB_METER",
                    },
                    {
                      label: "আলাদা মিটার",
                      value: "SEPARATE_METER",
                    },
                    {
                      label: "ভাড়ার মধ্যে",
                      value: "INCLUDED",
                    },
                  ]}
                />
              </div>

              {/* Parking */}
              <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={form.parking}
                  onChange={(e) => updateField("parking", e.target.checked)}
                  className="h-4 w-4 shrink-0 accent-[#00875A]"
                />

                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#112233]">
                    পার্কিং সুবিধা আছে
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    রুমের সাথে পার্কিং দেখানো হবে
                  </p>
                </div>
              </label>
            </section>

            {/* ================= Status ================= */}
            <section>
              <SectionTitle
                title="বর্তমান অবস্থা"
                description="রুমের বর্তমান স্ট্যাটাস"
              />

              <div className="grid grid-cols-3 gap-2">
                <StatusOption
                  active={form.status === "AVAILABLE"}
                  title="খালি"
                  description="ভাড়ার জন্য প্রস্তুত"
                  onClick={() => updateField("status", "AVAILABLE")}
                />

                <StatusOption
                  active={form.status === "RENTED"}
                  title="ভাড়া দেওয়া"
                  description="ভাড়াটিয়া আছে"
                  onClick={() => updateField("status", "RENTED")}
                />

                <StatusOption
                  active={form.status === "MAINTENANCE"}
                  title="মেরামত"
                  description="ব্যবহারযোগ্য নয়"
                  onClick={() => updateField("status", "MAINTENANCE")}
                />
              </div>
            </section>

            {/* ================= Image ================= */}
            <section>
              <SectionTitle title="রুমের ছবি" description="ঐচ্ছিক" />

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-xl border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Room preview"
                    className="h-36 w-full object-cover sm:h-44"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-gray-600 shadow-sm hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 px-3.5 py-3.5 transition hover:border-[#00875A]/40 hover:bg-[#F7FBF9]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
                    <ImagePlus className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#112233]">
                      রুমের ছবি যোগ করুন
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      JPG, PNG বা WEBP • সর্বোচ্চ 5MB
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </section>
          </div>

          {/* ================= Footer ================= */}
          <div className="sticky bottom-0 mt-5 flex gap-2 border-t border-gray-100 bg-white px-4 pb-1 pt-3 sm:px-5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 flex-1 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              বাতিল
            </button>

            <button
              type="submit"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#00875A] px-4 text-sm font-medium text-white transition hover:bg-[#007A50]"
            >
              {isEdit ? (
                <Pencil className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}

              {isEdit ? "সংরক্ষণ করুন" : "রুম যোগ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Section Title */
/* ---------------------------------- */

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-[#112233]">{title}</h3>

      <p className="mt-0.5 text-xs text-gray-400">{description}</p>
    </div>
  );
}

/* ---------------------------------- */
/* Status Option */
/* ---------------------------------- */

function StatusOption({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3.5 py-3 text-left transition ${
        active
          ? "border-[#00875A] bg-[#F7FBF9]"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            active ? "bg-[#00875A]" : "bg-gray-300"
          }`}
        />

        <p
          className={`text-sm font-medium ${
            active ? "text-[#00875A]" : "text-[#112233]"
          }`}
        >
          {title}
        </p>
      </div>

      <p className="mt-1 pl-4 text-[11px] text-gray-400">{description}</p>
    </button>
  );
}
