"use client";

import Input from "@/app/components/ui/input";
import Select from "@/app/components/ui/select";
import { TTenant, TTenantFormData } from "@/app/type/tenant";
import { CalendarDays, Home, Phone, UserPlus, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface AddTenantModalProps {
  open: boolean;
  mode?: "add" | "edit";
  tenant?: TTenant | null;
  onClose: () => void;
  onSubmit?: (data: TTenantFormData) => void;
}

const initialForm: TTenantFormData = {
  name: "",
  phone: "",
  email: "",
  roomNumber: "",
  rent: "",
  floor: "",
  moveInDate: "",
  emergencyContact: "",
  emergencyPhone: "",
  occupation: "",
  familyMembers: "1",
  status: "ACTIVE",
};

const roomOptions = [
  { label: "১০১", value: "১০১" },
  { label: "১০২", value: "১০২" },
  { label: "১০৫", value: "১০৫" },
  { label: "২০৩", value: "২০৩" },
  { label: "৩০২", value: "৩০২" },
];

const statusOptions = [
  { label: "বর্তমান", value: "ACTIVE" },
  { label: "পূর্ববর্তী", value: "PREVIOUS" },
];

function getInitialForm(
  mode: "add" | "edit",
  tenant?: TTenant | null,
): TTenantFormData {
  if (mode === "edit" && tenant) {
    return {
      name: tenant.name,
      phone: tenant.phone,
      email: "",
      roomNumber: tenant.roomNumber,
      floor: tenant?.floor,
      rent: String(tenant.rent),
      moveInDate: tenant.moveInDate,
      emergencyContact: "",
      emergencyPhone: "",
      occupation: "",
      familyMembers: "1",
      status: tenant.status,
    };
  }

  return initialForm;
}

export default function AddTenantModal({
  open,
  mode = "add",
  tenant,
  onClose,
  onSubmit,
}: AddTenantModalProps) {
  const [form, setForm] = useState<TTenantFormData>(() =>
    getInitialForm(mode, tenant),
  );

  if (!open) return null;

  const isEdit = mode === "edit";

  const updateField = <K extends keyof TTenantFormData>(
    field: K,
    value: TTenantFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.(form);

    setForm(initialForm);
    onClose();
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 p-0 sm:flex sm:items-center sm:justify-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="flex h-full w-full flex-col bg-white sm:h-auto sm:max-h-[92vh] sm:max-w-xl sm:rounded-2xl sm:shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
              <UserPlus className="h-4.5 w-4.5" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#112233] sm:text-base">
                {isEdit ? "ভাড়াটিয়ার তথ্য সম্পাদনা" : "নতুন ভাড়াটিয়া"}
              </h2>

              <p className="text-[11px] text-gray-500">
                {isEdit
                  ? "ভাড়াটিয়ার তথ্য পরিবর্তন করুন"
                  : "প্রয়োজনীয় তথ্য পূরণ করুন"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="বন্ধ করুন"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5"
        >
          <div className="space-y-5">
            {/* Personal */}
            <section>
              <SectionTitle title="ব্যক্তিগত তথ্য" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  id="tenant-name"
                  label="পূর্ণ নাম"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="রাকিব হাসান"
                />

                <Input
                  id="tenant-phone"
                  label="মোবাইল নম্বর"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="01712-345678"
                  icon={<Phone className="h-4 w-4" />}
                />

                <Input
                  id="tenant-email"
                  label="ইমেইল"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="example@email.com"
                />

                <Input
                  id="tenant-occupation"
                  label="পেশা"
                  value={form.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                  placeholder="চাকরি / ব্যবসা"
                />
              </div>
            </section>

            {/* Room */}
            <section>
              <SectionTitle title="রুম ও ভাড়া" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Select
                  id="tenant-room"
                  label="রুম / ফ্ল্যাট"
                  required
                  value={form.roomNumber}
                  onChange={(e) => updateField("roomNumber", e.target.value)}
                  placeholder="রুম নির্বাচন"
                  options={roomOptions}
                  icon={<Home className="h-4 w-4" />}
                />

                <Input
                  id="tenant-rent"
                  label="মাসিক ভাড়া"
                  required
                  type="number"
                  min="0"
                  value={form.rent}
                  onChange={(e) => updateField("rent", e.target.value)}
                  placeholder="3500"
                />

                <Input
                  id="tenant-move-in-date"
                  label="যোগদানের তারিখ"
                  required
                  type="date"
                  value={form.moveInDate}
                  onChange={(e) => updateField("moveInDate", e.target.value)}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
              </div>
            </section>

            {/* Family */}
            <section>
              <SectionTitle title="পরিবার ও জরুরি যোগাযোগ" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  id="tenant-family-members"
                  label="পরিবারের সদস্য"
                  type="number"
                  min="1"
                  value={form.familyMembers}
                  onChange={(e) => updateField("familyMembers", e.target.value)}
                  placeholder="1"
                />

                <Input
                  id="tenant-emergency-contact"
                  label="জরুরি যোগাযোগের নাম"
                  value={form.emergencyContact}
                  onChange={(e) =>
                    updateField("emergencyContact", e.target.value)
                  }
                  placeholder="নাম"
                />

                <Input
                  id="tenant-emergency-phone"
                  label="জরুরি যোগাযোগের নম্বর"
                  type="tel"
                  value={form.emergencyPhone}
                  onChange={(e) =>
                    updateField("emergencyPhone", e.target.value)
                  }
                  placeholder="017..."
                />

                <Select
                  id="tenant-status"
                  label="স্ট্যাটাস"
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value as TTenantFormData["status"],
                    )
                  }
                  options={statusOptions}
                />
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 -mx-4 mt-5 flex gap-2 border-t border-gray-100 bg-white px-4 py-3 sm:-mx-5 sm:px-5">
            <button
              type="button"
              onClick={handleClose}
              className="h-10 flex-1 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none"
            >
              বাতিল
            </button>

            <button
              type="submit"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-[#00875A] px-4 text-sm font-medium text-white transition hover:bg-[#007A50] sm:flex-none"
            >
              <UserPlus className="h-4 w-4" />
              {isEdit ? "তথ্য আপডেট করুন" : "যোগ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#00875A]">
      {title}
    </h3>
  );
}
