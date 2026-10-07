"use client";

import {
  BedDouble,
  Building2,
  ChevronDown,
  DoorOpen,
  Edit,
  Filter,
  Plus,
  Search,
  Settings2,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import AddRoomModal, {
  Room as ModalRoom,
  RoomFormData,
} from "./components/modal";

import { ActionButton } from "@/components/action-button";
import { FilterSelect } from "@/components/filter-select";
import { StatusBadge } from "@/components/status-bagde";
import { SummaryCard } from "@/components/summary-card";

type RoomStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";

type Room = ModalRoom;

const initialRooms: Room[] = [
  {
    id: 1,
    roomNumber: "১০১",
    floor: "1ST",
    title: "ফ্ল্যাট ১-এ",
    rent: 4500,
    size: 120,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    furnishing: "FULLY_FURNISHED",
    parking: true,
    utility: "SUB_METER",
    tenant: "মোঃ রাকিব হাসান",
    status: "RENTED",
  },
  {
    id: 2,
    roomNumber: "১০২",
    floor: "1ST",
    title: "ফ্ল্যাট ৩-এ",
    rent: 3500,
    size: 100,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    furnishing: "SEMI_FURNISHED",
    parking: false,
    utility: "SUB_METER",
    status: "AVAILABLE",
  },
  {
    id: 3,
    roomNumber: "১০৩",
    floor: "1ST",
    title: "ফ্ল্যাট ২-সি",
    rent: 3800,
    size: 110,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    furnishing: "SEMI_FURNISHED",
    parking: false,
    utility: "SUB_METER",
    tenant: "সুমাইয়া আক্তার",
    status: "RENTED",
  },
  {
    id: 4,
    roomNumber: "২০১",
    floor: "2ND",
    title: "ফ্ল্যাট ৫-ডি",
    rent: 4200,
    size: 130,
    bedrooms: 2,
    bathrooms: 1,
    balconies: 2,
    furnishing: "FULLY_FURNISHED",
    parking: true,
    utility: "SUB_METER",
    tenant: "তানভীর আহমেদ",
    status: "RENTED",
  },
  {
    id: 5,
    roomNumber: "২০২",
    floor: "2ND",
    title: "ফ্ল্যাট ৪-বি",
    rent: 3000,
    size: 90,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    furnishing: "NON_FURNISHED",
    parking: false,
    utility: "SUB_METER",
    status: "AVAILABLE",
  },
  {
    id: 6,
    roomNumber: "২০৩",
    floor: "2ND",
    title: "ফ্ল্যাট ৬-এ",
    rent: 4000,
    size: 115,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    furnishing: "SEMI_FURNISHED",
    parking: false,
    utility: "SUB_METER",
    status: "MAINTENANCE",
  },
];

const floorOptions = [
  { value: "ALL", label: "সব তলা" },
  { value: "GROUND", label: "গ্রাউন্ড ফ্লোর" },
  { value: "1ST", label: "১ম ফ্লোর" },
  { value: "2ND", label: "২য় ফ্লোর" },
  { value: "3RD", label: "৩য় ফ্লোর" },
  { value: "4TH", label: "৪র্থ ফ্লোর" },
  { value: "5TH", label: "৫ম ফ্লোর" },
];

const statusOptions = [
  { value: "ALL", label: "সব স্ট্যাটাস" },
  { value: "AVAILABLE", label: "খালি" },
  { value: "RENTED", label: "ভাড়া দেওয়া" },
  { value: "MAINTENANCE", label: "মেরামত" },
];

function formatFloor(floor: string) {
  const map: Record<string, string> = {
    GROUND: "গ্রাউন্ড ফ্লোর",
    "1ST": "১ম ফ্লোর",
    "2ND": "২য় ফ্লোর",
    "3RD": "৩য় ফ্লোর",
    "4TH": "৪র্থ ফ্লোর",
    "5TH": "৫ম ফ্লোর",
  };

  return map[floor] ?? floor;
}

function formatFurnishing(value: string) {
  const map: Record<string, string> = {
    NON_FURNISHED: "নন-ফার্নিশড",
    SEMI_FURNISHED: "সেমি-ফার্নিশড",
    FULLY_FURNISHED: "ফুল-ফার্নিশড",
  };

  return map[value] ?? value;
}

export default function RoomsPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<"ALL" | RoomStatus>("ALL");

  const [floor, setFloor] = useState("ALL");

  const [showFilters, setShowFilters] = useState(false);

  const [rooms, setRooms] = useState<Room[]>(() =>
    [...initialRooms].sort((a, b) =>
      a.roomNumber.localeCompare(b.roomNumber, "bn", { numeric: true }),
    ),
  );

  const [addRoomOpen, setAddRoomOpen] = useState(false);

  const [editRoomOpen, setEditRoomOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  /* --------------------------------
   * Search + Filter
   * -------------------------------- */

  const filteredRooms = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return rooms.filter((room) => {
      const matchesSearch =
        !searchValue ||
        room.roomNumber.includes(searchValue) ||
        room.title.toLowerCase().includes(searchValue) ||
        room.tenant?.toLowerCase().includes(searchValue);

      const matchesStatus = status === "ALL" || room.status === status;

      const matchesFloor = floor === "ALL" || room.floor === floor;

      return matchesSearch && matchesStatus && matchesFloor;
    });
  }, [rooms, search, status, floor]);

  /* --------------------------------
   * Summary
   * -------------------------------- */

  const available = rooms.filter((room) => room.status === "AVAILABLE").length;

  const rented = rooms.filter((room) => room.status === "RENTED").length;

  const maintenance = rooms.filter(
    (room) => room.status === "MAINTENANCE",
  ).length;

  /* --------------------------------
   * Add Room
   * -------------------------------- */

  const handleAddClick = () => {
    setSelectedRoom(null);
    setEditRoomOpen(false);
    setAddRoomOpen(true);
  };

  const handleAddRoom = (data: RoomFormData) => {
    const newRoom: Room = {
      id: Date.now(),
      roomNumber: data.roomNumber,
      floor: data.floor,
      title: data.title,
      rent: Number(data.rent) || 0,
      size: Number(data.size) || 0,
      bedrooms: Number(data.bedrooms) || 0,
      bathrooms: Number(data.bathrooms) || 0,
      balconies: Number(data.balconies) || 0,
      furnishing: data.furnishing,
      parking: data.parking,
      utility: data.utility,
      status: data.status,
      image: undefined,
    };

    setRooms((prev) =>
      [...prev, newRoom].sort((a, b) =>
        a.roomNumber.localeCompare(b.roomNumber, "bn", { numeric: true }),
      ),
    );

    setAddRoomOpen(false);
  };

  /* --------------------------------
   * Edit Room
   * -------------------------------- */

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);

    setEditRoomOpen(true);
  };

  const handleUpdateRoom = (data: RoomFormData) => {
    if (!selectedRoom) return;

    const updatedRoom: Room = {
      ...selectedRoom,
      roomNumber: data.roomNumber,
      floor: data.floor,
      title: data.title,
      rent: Number(data.rent) || 0,
      size: Number(data.size) || 0,
      bedrooms: Number(data.bedrooms) || 0,
      bathrooms: Number(data.bathrooms) || 0,
      balconies: Number(data.balconies) || 0,
      furnishing: data.furnishing,
      parking: data.parking,
      utility: data.utility,
      status: data.status,
      image: data.image ? URL.createObjectURL(data.image) : selectedRoom.image,
    };

    setRooms((prev) =>
      prev
        .map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
        .sort((a, b) =>
          a.roomNumber.localeCompare(b.roomNumber, "bn", { numeric: true }),
        ),
    );

    setSelectedRoom(updatedRoom);
    setEditRoomOpen(false);
  };

  /* --------------------------------
   * View Room
   * -------------------------------- */

  /* --------------------------------
   * Save from Details Modal
   * -------------------------------- */

  /* --------------------------------
   * Close Modal
   * -------------------------------- */

  const closeAllModals = () => {
    setAddRoomOpen(false);
    setEditRoomOpen(false);

    setSelectedRoom(null);
  };

  return (
    <div className="space-y-6">
      {/* ================================
          Header
      ================================= */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#112233] sm:text-2xl">
              রুম ও ফ্ল্যাট
            </h1>

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-600">
              {rooms.length} ইউনিট
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            বিল্ডিংয়ের সকল রুম ও ফ্ল্যাটের তথ্য পরিচালনা করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#00875A] px-4 text-sm font-medium text-white transition hover:bg-[#007A50]"
        >
          <Plus className="h-4 w-4" />
          নতুন রুম যোগ করুন
        </button>
      </div>

      {/* ================================
          Summary
      ================================= */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard icon={Building2} label="মোট ইউনিট" value={rooms.length} />

        <SummaryCard
          icon={DoorOpen}
          label="খালি"
          value={available}
          variant="success"
        />

        <SummaryCard
          icon={Users}
          label="ভাড়া দেওয়া"
          value={rented}
          variant="info"
        />

        <SummaryCard
          icon={Wrench}
          label="মেরামত"
          value={maintenance}
          variant="warning"
        />
      </div>

      {/* ================================
          Search & Filters
      ================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="রুম নম্বর, নাম বা ভাড়াটিয়া দিয়ে খুঁজুন..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-9 text-sm text-[#112233] outline-none transition placeholder:text-gray-400 focus:border-[#00875A] focus:bg-white focus:ring-2 focus:ring-[#00875A]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Desktop filters */}

          <div className="hidden gap-2 sm:flex">
            <FilterSelect
              value={status}
              onChange={(value) => setStatus(value as "ALL" | RoomStatus)}
              options={statusOptions}
            />

            <FilterSelect
              value={floor}
              onChange={setFloor}
              options={floorOptions}
            />
          </div>

          {/* Mobile filter */}

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-600 sm:hidden"
          >
            <Filter className="h-4 w-4" />
            ফিল্টার
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 grid grid-cols-1 gap-3 border-t border-gray-100 pt-3 sm:hidden">
            <FilterSelect
              value={status}
              onChange={(value) => setStatus(value as "ALL" | RoomStatus)}
              options={statusOptions}
            />

            <FilterSelect
              value={floor}
              onChange={setFloor}
              options={floorOptions}
            />
          </div>
        )}
      </div>

      {/* ================================
          Result Count
      ================================= */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-[#112233]">
            {filteredRooms.length}
          </span>{" "}
          টি রুম পাওয়া গেছে
        </p>

        <button
          type="button"
          className="hidden items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#00875A] sm:flex"
        >
          <Settings2 className="h-4 w-4" />
          View options
        </button>
      </div>

      {/* ================================
          Desktop Table
      ================================= */}

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr className="text-xs text-gray-500">
                <th className="px-5 py-3.5 font-medium">রুম</th>

                <th className="px-5 py-3.5 font-medium">ভাড়া</th>

                <th className="px-5 py-3.5 font-medium">আয়তন</th>

                <th className="px-5 py-3.5 font-medium">সুবিধা</th>

                <th className="px-5 py-3.5 font-medium">ভাড়াটিয়া</th>

                <th className="px-5 py-3.5 font-medium">স্ট্যাটাস</th>

                <th className="px-5 py-3.5 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRooms.map((room) => (
                <tr
                  key={room.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
                        <BedDouble className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#112233]">
                          রুম {room.roomNumber}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {room.title} • {formatFloor(room.floor)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#112233]">
                      ৳{room.rent.toLocaleString("bn-BD")}
                    </p>

                    <p className="text-[11px] text-gray-400">/ মাস</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-600">{room.size} sqft</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-xs text-gray-500">
                      {room.bedrooms} বেড • {room.bathrooms} বাথ
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {formatFurnishing(room.furnishing)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {room.tenant ? (
                      <p className="text-sm text-gray-600">{room.tenant}</p>
                    ) : (
                      <span className="text-xs text-gray-400">
                        এখনও বরাদ্দ হয়নি
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={room.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <ActionButton
                        icon={Edit}
                        label="Edit"
                        onClick={() => handleEditRoom(room)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRooms.length === 0 && <EmptyState />}
      </div>

      {/* ================================
          Mobile Cards
      ================================= */}

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
                  <BedDouble className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#112233]">
                    রুম {room.roomNumber}
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {room.title} • {formatFloor(room.floor)}
                  </p>
                </div>
              </div>

              <StatusBadge status={room.status} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-y border-gray-100 py-3">
              <Info
                label="ভাড়া"
                value={`৳${room.rent.toLocaleString("bn-BD")}`}
              />

              <Info label="আয়তন" value={`${room.size} sqft`} />

              <Info
                label="ফার্নিশিং"
                value={formatFurnishing(room.furnishing)}
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex min-w-0 items-center gap-2 text-xs text-gray-500">
                <Users className="h-3.5 w-3.5 shrink-0" />

                <span className="truncate">
                  {room.tenant || "ভাড়াটিয়া নেই"}
                </span>
              </div>

              <div className="flex gap-1">
                <ActionButton
                  icon={Edit}
                  label="Edit"
                  onClick={() => handleEditRoom(room)}
                />
              </div>
            </div>
          </div>
        ))}

        {filteredRooms.length === 0 && <EmptyState />}
      </div>

      {/* ================================
          Add / Edit Modal
      ================================= */}

      <AddRoomModal
        key={editRoomOpen ? `edit-${selectedRoom?.id}` : "add-room"}
        open={addRoomOpen || editRoomOpen}
        mode={editRoomOpen ? "edit" : "add"}
        room={selectedRoom}
        onClose={closeAllModals}
        onSubmit={editRoomOpen ? handleUpdateRoom : handleAddRoom}
      />
    </div>
  );
}

/* ======================================
   Info
====================================== */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] text-gray-400">{label}</p>

      <p className="mt-1 truncate text-xs font-semibold text-[#112233]">
        {value}
      </p>
    </div>
  );
}

/* ======================================
   Empty State
====================================== */

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
      <Building2 className="mx-auto h-8 w-8 text-gray-300" />

      <h3 className="mt-3 text-sm font-semibold text-[#112233]">
        কোনো রুম পাওয়া যায়নি
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        Search বা filter পরিবর্তন করে আবার চেষ্টা করুন।
      </p>
    </div>
  );
}
